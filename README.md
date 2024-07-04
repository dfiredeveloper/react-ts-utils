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
import { requireProp, requireArrayProp, requireReactNodeProp, isString, isValidEmail } from 'react-type-utils';

// Example usage
const myRequiredProp = requireProp('Hello');
const myArrayProp = requireArrayProp([1, 2, 3]);
const myReactNodeProp = requireReactNodeProp(<div>Hello</div>);
const myString = isString('Hello');
const myValidEmail = isValidEmail('test@example.com');
```

## License
This project is licensed under the MIT License