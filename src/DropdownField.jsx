import PropTypes from "prop-types";
import {useMemo, useState} from "react";

/**
 * Dropdown (select) input field with dynamic options
 */
export const DropdownField = ({ value, name, options, onChange, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(value);
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        onChange(event);
    };
    const selectedValueNotInOptions = useMemo(() => () => {
        return selectedValue !== '' && options.find((o)=> o.value === selectedValue) === undefined
    }, [selectedValue, options]);
    return (
        <select value={selectedValue} onChange={handleSelectChange} name={name}>
            <option value=''>Select an option</option>
            {selectedValueNotInOptions() ? (
                <option key={selectedValue}>{selectedValue}</option>
            ) : ''}
            {options.map((option)=>(
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

DropdownField.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    })),
    onChange: PropTypes.func,
}
