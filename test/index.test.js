import { requireProp, requireArrayProp, requireReactNodeProp } from '../src/utilities';

// Test requireProp function
test('requireProp should return input if not undefined or null', () => {
  expect(requireProp('Test')).toEqual('Test');
});

test('requireProp should throw error if input is undefined', () => {
  expect(() => requireProp(undefined)).toThrowError('Required prop is missing!');
});

// Test requireArrayProp function
test('requireArrayProp should return input if it is an array', () => {
  expect(requireArrayProp([1, 2, 3])).toEqual([1, 2, 3]);
});

test('requireArrayProp should throw error if input is not an array', () => {
  expect(() => requireArrayProp('not an array')).toThrowError('Required prop must be an array!');
});

// Test requireReactNodeProp function
test('requireReactNodeProp should return input if it is a valid ReactNode', () => {
  const validReactNode = <div>Hello</div>;
  expect(requireReactNodeProp(validReactNode)).toEqual(validReactNode);
});

test('requireReactNodeProp should throw error if input is not a valid ReactNode', () => {
  expect(() => requireReactNodeProp(123)).toThrowError('Required prop must be a ReactNode!');
});
