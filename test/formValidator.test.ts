import { formValidators, validateField, validateForm } from '../src/formValidator';

describe('formValidators', () => {
  it('required validator should return valid for non-empty value', () => {
    expect(formValidators.required('Hello').valid).toBe(true);
  });

  it('required validator should return invalid for empty value', () => {
    expect(formValidators.required('').valid).toBe(false);
  });

  it('email validator should return valid for valid email', () => {
    expect(formValidators.email('test@example.com').valid).toBe(true);
  });

  it('email validator should return invalid for invalid email', () => {
    expect(formValidators.email('invalid-email').valid).toBe(false);
  });

  it('minLength validator should return valid for long enough value', () => {
    const minLengthValidator = formValidators.minLength(5);
    expect(minLengthValidator('Hello').valid).toBe(true);
  });

  it('minLength validator should return invalid for too short value', () => {
    const minLengthValidator = formValidators.minLength(5);
    expect(minLengthValidator('Hi').valid).toBe(false);
  });

  it('maxLength validator should return valid for short enough value', () => {
    const maxLengthValidator = formValidators.maxLength(5);
    expect(maxLengthValidator('Hello').valid).toBe(true);
  });

  it('maxLength validator should return invalid for too long value', () => {
    const maxLengthValidator = formValidators.maxLength(5);
    expect(maxLengthValidator('Hello World').valid).toBe(false);
  });

  it('pattern validator should return valid for matching value', () => {
    const patternValidator = formValidators.pattern(/hello/i);
    expect(patternValidator('Hello').valid).toBe(true);
  });

  it('pattern validator should return invalid for non-matching value', () => {
    const patternValidator = formValidators.pattern(/hello/i);
    expect(patternValidator('Hi').valid).toBe(false);
  });

  it('custom validator should return valid for valid value', () => {
    const customValidator = formValidators.custom(value => value === 'valid', 'Invalid value');
    expect(customValidator('valid').valid).toBe(true);
  });

  it('custom validator should return invalid for invalid value', () => {
    const customValidator = formValidators.custom(value => value === 'valid', 'Invalid value');
    expect(customValidator('invalid').valid).toBe(false);
  });
});

describe('validateField', () => {
  it('should return valid if all validators pass', () => {
    const validators = [formValidators.required, formValidators.minLength(3)];
    expect(validateField('Hello', validators).valid).toBe(true);
  });

  it('should return invalid if any validator fails', () => {
    const validators = [formValidators.required, formValidators.minLength(10)];
    expect(validateField('Hello', validators).valid).toBe(false);
  });
});

describe('validateForm', () => {
  it('should validate all fields in the form', () => {
    const formData = {
      name: 'John',
      email: 'test@example.com',
    };

    const formRules = {
      name: [formValidators.required],
      email: [formValidators.required, formValidators.email],
    };

    const result = validateForm(formData, formRules);
    expect(result.name.valid).toBe(true);
    expect(result.email.valid).toBe(true);
  });

  it('should return errors for invalid fields', () => {
    const formData = {
      name: '',
      email: 'invalid-email',
    };

    const formRules = {
      name: [formValidators.required],
      email: [formValidators.required, formValidators.email],
    };

    const result = validateForm(formData, formRules);
    expect(result.name.valid).toBe(false);
    expect(result.email.valid).toBe(false);
  });
});
