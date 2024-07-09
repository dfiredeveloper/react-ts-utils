import formValidators, { validateField, ValidationResult } from '../src/formValidator';

describe('Form Validators', () => {
  describe('minLengthValidator', () => {
    const minLengthValidator = formValidators.minLength(3);

    it('should return true for a string with minimum length', () => {
      expect(minLengthValidator('Hello').valid).toBe(true);
    });

    it('should return false for a string shorter than minimum length', () => {
      expect(minLengthValidator('Hi').valid).toBe(false);
    });
  });

  describe('maxLengthValidator', () => {
    const maxLengthValidator = formValidators.maxLength(5);

    it('should return true for a string within maximum length', () => {
      expect(maxLengthValidator('Hello').valid).toBe(true);
    });

    it('should return false for a string longer than maximum length', () => {
      expect(maxLengthValidator('Hello World').valid).toBe(false);
    });
  });

  describe('patternValidator', () => {
    const patternValidator = formValidators.pattern(/Hello/);

    it('should return true for a string matching the pattern', () => {
      expect(patternValidator('Hello').valid).toBe(true);
    });

    it('should return false for a string not matching the pattern', () => {
      expect(patternValidator('Hi').valid).toBe(false);
    });
  });

  describe('customValidator', () => {
    const customValidator = formValidators.custom(value => value === 'valid', 'Invalid value');

    it('should return true for a value passing the custom validation', () => {
      expect(customValidator('valid').valid).toBe(true);
    });

    it('should return false for a value failing the custom validation', () => {
      expect(customValidator('invalid').valid).toBe(false);
    });
  });

  describe('validateField', () => {
    const validators = [
      formValidators.minLength(3),
      formValidators.maxLength(5),
      formValidators.pattern(/Hello/),
    ];

    it('should return true if all validators pass', () => {
      expect(validateField('Hello', validators).valid).toBe(true);
    });

    it('should return false if any validator fails', () => {
      expect(validateField('Hi', validators).valid).toBe(false);
    });
  });
});
