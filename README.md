## Storybook Sign Up Form

Using [create-react-app](https://github.com/facebook/create-react-app) as a starting point.
* `npx create-react-app .`

Adding [storybook](https://storybook.js.org/docs/react/get-started/install/) for developing components in isolation.
* `npx storybook@next init`
* `npm run storybook`

Most of the code is in:
* `src/SignUpForm.jsx`

Storybook stories, for demonstrating form validation and onSubmit behavior, are defined in:
* `src/SignUpForm.stories.js`


To demonstrate the SignUpForm component
* `npm run storybook`
* open storybook ui: http://localhost:6006/

Example screenshot

![storybook ui](https://i.imgur.com/Met2ITB.png)
