import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../src/hooks/useForm';
import { validateEmail } from '../src/formValidator';

describe('useForm hook', () => {
  it('should initialize form state correctly', () => {
    const initialValues = {
      username: '',
      email: '',
    };
    const validators = {
      email: validateEmail,
    };

    const { result } = renderHook(() => useForm(initialValues, validators));

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  it('should update form state on change', () => {
    const initialValues = {
      username: '',
    };
    const validators = {};

    const { result } = renderHook(() => useForm(initialValues, validators));

    const newValue = 'newUsername';

    act(() => {
      result.current.handleInputChange('username', newValue);
    });

    expect(result.current.values.username).toEqual(newValue);
  });

  it('should validate form correctly', () => {
    const initialValues = {
      username: '',
      email: 'invalidemail',
    };
    const validators = {
      email: validateEmail,
    };

    const { result } = renderHook(() => useForm(initialValues, validators));

    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(false);
    });

    act(() => {
      result.current.handleInputChange('email', 'valid@example.com');
    });

    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(true);
    });
  });
});
