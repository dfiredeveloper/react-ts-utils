import { act } from 'react-dom/test-utils'; // Import act from react-dom/test-utils
import { renderHook } from '@testing-library/react-hooks';
import useForm from '../src/useForm'; 


type Validator<T> = (value: T) => string | undefined;

describe('useForm hook', () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validators: Partial<Record<"username" | "password", Validator<{ username: string; password: string; }>[]>> = {
    username: [(value: { username: string; password: string; }) => (value.username ? undefined : 'Username is required')],
    password: [(value: { username: string; password: string; }) => (value.password ? undefined : 'Password is required')],
  };

  it('should initialize form state correctly', () => {
    let result: any;
    act(() => {
      result = renderHook(() => useForm(initialValues, validators));
    });
    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  it('should update form state on change', () => {
    let result: any;
    act(() => {
      result = renderHook(() => useForm(initialValues, validators));
    });
    const newValue = 'test';
    act(() => {
      result.current.handleInputChange('username', newValue);
    });
    expect(result.current.values.username).toEqual(newValue);
  });

  it('should validate form correctly', () => {
    let result: any;
    act(() => {
      result = renderHook(() => useForm(initialValues, validators));
    });
    expect(result.current.validateForm()).toBe(false); 
    act(() => {
      result.current.handleInputChange('username', 'testUser');
    });
    expect(result.current.validateForm()).toBe(true);
  });

  it('should handle validation errors', () => {
    let result: any;
    act(() => {
      result = renderHook(() => useForm(initialValues, validators));
    });
    expect(result.current.errors.username).toBeUndefined();
    expect(result.current.validateForm()).toBe(false); 
    expect(result.current.errors.username).toEqual(['Username is required']);
  });

  // Add more test cases as needed

});
