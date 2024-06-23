# React Type Utils

A TypeScript library for common type safety utilities in React applications.

## Installation

You can install `react-type-utils` via npm:

```bash
npm install react-type-utils


## Usage

```bash
import { requireProp, requireArrayProp, requireReactNodeProp } from 'react-type-utils';

// Example usage
const myRequiredProp = requireProp('Hello');
const myArrayProp = requireArrayProp([1, 2, 3]);
const myReactNodeProp = requireReactNodeProp(<div>Hello</div>);


## License
This project is licensed under the MIT License