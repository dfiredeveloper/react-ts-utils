import React from 'react';

export function requireProp(value: any): any {
  if (value === undefined || value === null) {
    throw new Error('Required prop is missing!');
  }
  return value;
}

export function requireArrayProp(value: any): any[] {
  if (!Array.isArray(value)) {
    throw new Error('Required prop must be an array!');
  }
  return value;
}

export function requireReactNodeProp(value: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(value)) {
    throw new Error('Required prop must be a ReactNode!');
  }
  return value;
}

// New function
export function isString(value: any): value is string {
  return typeof value === 'string';
}
