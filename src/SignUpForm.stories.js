import { SignUpForm } from './SignUpForm';
import {userEvent} from "@storybook/testing-library";
import {within} from "@testing-library/react";

export default {
    title: 'SignUpForm',
    component: SignUpForm,
};

const handleOnSubmit = (data, errors) => {
    if (errors.length !== 0) {
        console.error(errors, data);
    } else {
        console.log(data)
    }
}

const testSubmitEvent = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
}

export const BlankForm = {
    args: {
        initialData: {},
        onSubmit: handleOnSubmit,
    }
};

export const ValidExample = {
    args: {
        initialData: {
            firstName: 'Steve',
            lastName: 'Jobs',
            state: 'California',
            city: 'Cupertino',
            email:  'steve@apple.com',
            password: 'iPhone4Life',
        },
        onSubmit: handleOnSubmit,
    },
    play: testSubmitEvent,
};


export const AllFieldsRequired = {
    args: {
        initialData: {
            firstName: '',
            lastName: '',
            state: '',
            city: '',
            email:  '',
            password: '',
        },
        onSubmit: handleOnSubmit,
    },
    play: testSubmitEvent,
};

export const InvalidEmail = {
    args: {
        initialData: {
            firstName: 'Foo',
            lastName: 'Bar',
            state: 'California',
            city: 'Cupertino',
            email:  'not a valid email',
            password: 'fooBar',
        },
        onSubmit: handleOnSubmit,
    },
    play: testSubmitEvent,
};
