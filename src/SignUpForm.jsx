import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DropdownField} from "./DropdownField";

// NOTE: In any other circumstances I would NOT commit this token in code.
// Tokens should be stored securely in a session
const APIToken = '-NSPhPlg3ke3T1yqQKs9CpMGzZbZppEMTgn-WJVWedzOwv1zhz_YNOJBT2d18hJYqt8';
const APIUserEmail = 'jklewa@gmail.com'

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Basic signup form for a new user
 */
export const SignUpForm = ({ initialData, onSubmit, ...props }) => {
    const defaults = {
        firstName: '',
        lastName: '',
        state: '',
        city: '',
        email: '',
        password: '',
        ...initialData,
    }
    const [formValues, setFormValues] = useState(defaults);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const [accessToken, setAccessToken] = useState('');
    useEffect(() => {
        const fetchAccessToken = async () => {
            if (accessToken) return;
            try {
                const response = await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
                    headers: {
                        'Accept': 'application/json',
                        'api-token': APIToken,
                        'user-email': APIUserEmail,
                    },
                });
                const data = await response.json();
                setAccessToken(data['auth_token'])
            } catch (error) {
                console.error(error);
            }
        }
        fetchAccessToken()
    }, []);

    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptionsMap, setCityOptionsMap] = useState({});

    // init async
    useEffect(() => {
        const fetchStateOptions = async () => {
            try {
                if (!accessToken) return;
                const response = await fetch('https://www.universal-tutorial.com/api/states/United States', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                const newVal = data.map((state)=> ({
                    label: state['state_name'], value: state['state_name'],
                }));
                setStateOptions(newVal);
            } catch (error) {
                console.error(error);
            }
        };
        if (stateOptions.length === 0) {
            fetchStateOptions()
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchCityOptionsForState = async (state) => {
            try {
                if (!accessToken) return;
                const response = await fetch(`https://www.universal-tutorial.com/api/cities/${encodeURI(state)}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                const data = await response.json();
                const newVal = data.map((city)=> ({
                    label: city['city_name'], value: city['city_name'],
                }));
                setCityOptionsMap((prevMap) => ({...prevMap, [state]: newVal}));
            } catch (error) {
                console.error(error);
            }
        };

        if (formValues.state !== '' && !(formValues.state in cityOptionsMap)) {
            fetchCityOptionsForState(formValues.state)
        }
    }, [accessToken, formValues.state, cityOptionsMap])
    
    const [formErrors, setFormErrors] = useState([]);
    const validateForm = () => {
        let errors = [];

        if (!formValues.firstName) errors.push('First Name is required');
        if (!formValues.lastName) errors.push('Last Name is required');
        if (!formValues.state) errors.push('State is required');
        if (!formValues.city) errors.push('City is required');
        if (!formValues.password) errors.push('Password is required');

        if (!formValues.email){
            errors.push('Email is required');
        } else if (!isValidEmail(formValues.email)) {
            errors.push('Please enter a valid Email');
        }

        setFormErrors(errors);
        return errors.length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors([]);
        validateForm();
        onSubmit(formValues, formErrors);
    };

    return (
        <form>
            {formErrors.length > 0 && (
                <div className={"errors"}>
                    The form has errors:
                    <ul>
                        {formErrors.map((error) => (
                            <li>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <label htmlFor="firstName">First Name </label>
            <input type="text" name="firstName" value={formValues.firstName} onChange={handleInputChange}></input>
            <br/>
            <label htmlFor="lastName">Last Name </label>
            <input type="text" name="lastName" value={formValues.lastName} onChange={handleInputChange}></input>
            <br/>
            <label htmlFor="state">State </label>
            <DropdownField options={stateOptions} name="state" value={formValues.state} onChange={handleInputChange}></DropdownField>
            <br/>
            <label htmlFor="city">City </label>
            <DropdownField options={cityOptionsMap[formValues.state] || []} name="city" value={formValues.city} onChange={handleInputChange}></DropdownField>
            <br/>
            <label htmlFor="email">Email </label>
            <input type="email" name="email" value={formValues.email} onChange={handleInputChange}></input>
            <br/>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" value={formValues.password} onChange={handleInputChange}></input>
            <br/>
            <button type="button" onClick={handleSubmit}>Submit</button>

            <pre>DEBUG Form Values: {JSON.stringify(formValues, null,2)}</pre>
            <pre>DEBUG Form Errors: {JSON.stringify(formErrors, null,2)}</pre>
        </form>
    );
};

SignUpForm.propTypes = {
    initialData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        state: PropTypes.string,
        city: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default SignUpForm;
