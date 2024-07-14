import { act, renderHook } from '@testing-library/react-hooks';
import useForm from '../src/hooks/useForm';

const initialValues = { username: '', password: '' };
const validators = {
  username: (value: string) => (value ? undefined : 'Username is required'),
  // other validators
};

describe('useForm hook', () => {
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
    const newValue = 'test';
    act(() => {
      result = renderHook(() => useForm(initialValues, validators));
    });
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
    expect(result.current.validateForm()).toBe(false); // Adjust this based on your useForm implementation
    act(() => {
      result.current.handleInputChange('username', 'testUser');
    });
    // Adjust validations based on your useForm implementation
    expect(result.current.errors.username).toEqual(['Username is required']);
  });
});
