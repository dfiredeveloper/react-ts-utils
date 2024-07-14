import { validateForm, ValidationResult, Validator } from '../src/formValidator';

describe('validateForm function', () => {
  const initialValues = {
    name: '',
    email: '',
  };

  const validators = {
    name: [(value: any) => ({ valid: value.length > 0, errors: ['Name is required'] })],
    email: [(value: any) => ({ valid: /\S+@\S+\.\S+/.test(value), errors: ['Invalid email address'] })],
  };

  it('should validate form correctly', () => {
    const validationResults = validateForm(initialValues, validators);
    expect(validationResults.name.valid).toBe(false);
    expect(validationResults.name.errors).toEqual(['Name is required']);
    expect(validationResults.email.valid).toBe(false);
    expect(validationResults.email.errors).toEqual(['Invalid email address']);
  });
});
