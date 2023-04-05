## Take Home Assignment:
Please create a sign-up form with React

Requirements:
- React with Hooks
- Do not use 3rd party npm libraries like React-Hook-Form, Material UI etc.
- Focus is on code structure/scalability and not on the design, but it should look clean and aesthetic
- Please follow the Don't Repeat Yourself (DRY) programming principle.
- Include flow for obtaining/storing access token within the application

Signup form should contain the current fields:
- First name
- Last Name
- State*
- City*
- Email
- Password


*State and City will be dropdowns. City will be the outcome of state selection.
  
Expected validations:
- All fields are required
- Email should be valid

We will be leveraging the universal tutorial website below to get the state and city response

Instruction for accessing this API are under:

    https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city

API Endpoint for getting states:

    https://www.universal-tutorial.com/api/states/United States

API Endpoint for getting cities:

    https://www.universal-tutorial.com/api/cities/[state name]

After all the validations are passed, perform the submit. (We are not making the API call) Submit should console log the body (POST request body - JSON)

    {
        firstName: ‘’,
        lastName: ‘’,
        state: ‘’,
        city: ‘’, 
        email: ‘’, 
        password: ‘’,
    }

Once complete, please compress and send it back to us for a review.

Good Luck!
