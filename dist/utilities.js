"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireReactNodeProp = exports.requireArrayProp = exports.requireProp = void 0;
// Function to ensure a prop is required
function requireProp(prop) {
    if (prop === undefined || prop === null) {
        throw new Error('Required prop is missing!');
    }
    return prop;
}
exports.requireProp = requireProp;
// Function to ensure a prop is an array
function requireArrayProp(prop) {
    if (!Array.isArray(prop)) {
        throw new Error('Required prop must be an array!');
    }
    return prop;
}
exports.requireArrayProp = requireArrayProp;
// Function to ensure a prop is a ReactNode
function requireReactNodeProp(prop) {
    if (typeof prop !== 'number' && typeof prop !== 'string' && typeof prop !== 'boolean' && typeof prop !== 'object') {
        throw new Error('Required prop must be a ReactNode!');
    }
    return prop;
}
exports.requireReactNodeProp = requireReactNodeProp;
