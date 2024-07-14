import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './useForm';

describe('useForm hook', () => {
  const initialValues = {
    name: '',
    email: '',
  };

  const validators = {
    name: [(value: any) => ({ valid: value.length > 0, errors: ['Name is required'] })],
    email: [(value: any) => ({ valid: /\S+@\S+\.\S+/.test(value), errors: ['Invalid email address'] })],
  };

  it('should initialize form state correctly', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));
    expect(result.current.formState.values).toEqual(initialValues);
    expect(result.current.formState.errors).toEqual({});
  });

  it('should update form state on change', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));
    act(() => {
      result.current.handleChange('name')('John');
    });
    expect(result.current.formState.values.name).toBe('John');
  });

  it('should validate form correctly', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));
    act(() => {
      result.current.handleChange('name')('John');
      result.current.handleChange('email')('john@example.com');
      result.current.validate();
    });
    expect(result.current.formState.errors.name).toBeUndefined();
    expect(result.current.formState.errors.email).toBeUndefined();
    expect(result.current.formState.isValid).toBe(true);
  });

  it('should handle validation errors', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));
    act(() => {
      result.current.handleChange('name')('');
      result.current.validate();
    });
    expect(result.current.formState.errors.name).toEqual(['Name is required']);
    expect(result.current.formState.isValid).toBe(false);
  });
});
