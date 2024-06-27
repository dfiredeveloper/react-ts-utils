import { ReactNode } from 'react';

// Function to ensure a prop is required
export function requireProp<T>(prop: T): T {
  if (prop === undefined || prop === null) {
    throw new Error('Required prop is missing!');
  }
  return prop;
}

// Function to ensure a prop is an array
export function requireArrayProp<T>(prop: T[]): T[] {
  if (!Array.isArray(prop)) {
    throw new Error('Required prop must be an array!');
  }
  return prop;
}

// Function to ensure a prop is a ReactNode
export function requireReactNodeProp(prop: ReactNode): ReactNode {
  if (typeof prop !== 'number' && typeof prop !== 'string' && typeof prop !== 'boolean' && typeof prop !== 'object') {
    throw new Error('Required prop must be a ReactNode!');
  }
  return prop;
}

// New function
export function isString(value: any): value is string {
  return typeof value === 'string';
}
