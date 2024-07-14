import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../src/useForm';
import { formValidators } from '../src/formValidator'; 

interface FormData {
  name: string;
  email: string;
}

describe('useForm hook', () => {
  const initialValues: FormData = { name: '', email: '' };
  const validators = {
    name: [formValidators.required],
    email: [formValidators.required, formValidators.email],
  };

  it('should initialize form state correctly', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    expect(result.current.formState.values).toEqual(initialValues);
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isValid).toBe(true);
  });

  it('should update form state on change', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      result.current.handleChange('name')('John');
    });

    expect(result.current.formState.values.name).toBe('John');
    expect(result.current.formState.errors.name).toBeUndefined();
    expect(result.current.formState.isValid).toBe(false); // because email is still invalid
  });

  it('should validate form correctly', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      result.current.handleChange('name')('John');
      result.current.handleChange('email')('john@example.com');
    });

    expect(result.current.formState.values.name).toBe('John');
    expect(result.current.formState.values.email).toBe('john@example.com');
    expect(result.current.formState.errors).toEqual({});
    expect(result.current.formState.isValid).toBe(true);
  });

  it('should handle validation errors', () => {
    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      result.current.handleChange('name')('John');
      result.current.handleChange('email')('invalid-email');
    });

    expect(result.current.formState.values.name).toBe('John');
    expect(result.current.formState.values.email).toBe('invalid-email');
    expect(result.current.formState.errors.email).toContain('Invalid email format.');
    expect(result.current.formState.isValid).toBe(false);
  });
});
