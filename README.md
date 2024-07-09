# React Type Utils

A TypeScript library for common type safety utilities in React applications.

This is a comprehensive TypeScript library designed to streamline type safety in React projects. It provides essential utilities like requireProp, requireArrayProp, and requireReactNodeProp to enforce robust type checks, ensuring more reliable and maintainable React applications.

## Installation

You can install `react-type-utils` via npm:

```bash
npm install react-type-utils
```


## Usage

```bash
import { requireProp, requireArrayProp, requireReactNodeProp, isValidEmail, validateField, validateForm, formValidators } from 'react-type-utils';

// Example usage for type safety utilities
const myRequiredProp = requireProp('Hello');
const myArrayProp = requireArrayProp([1, 2, 3]);
const myReactNodeProp = requireReactNodeProp(<div>Hello</div>);

// Example usage for form validation utilities
const formData = {
  name: 'John',
  email: 'test@example.com',
};

const formRules = {
  name: [formValidators.required],
  email: [formValidators.required, formValidators.email],
};

const result = validateForm(formData, formRules);
console.log(result);
```

## License
This project is licensed under the MIT License