export interface ValidationResult {
    valid: boolean;
    errors: string[];
  }
  
  export interface Validator {
    (value: string): ValidationResult;
  }
  
  const formValidators = {
    minLength: (length: number): Validator => (value: string): ValidationResult => ({
      valid: value.length >= length,
      errors: value.length >= length ? [] : [`Minimum length is ${length}.`],
    }),
  
    maxLength: (length: number): Validator => (value: string): ValidationResult => ({
      valid: value.length <= length,
      errors: value.length <= length ? [] : [`Maximum length is ${length}.`],
    }),
  
    pattern: (regex: RegExp): Validator => (value: string): ValidationResult => ({
      valid: regex.test(value),
      errors: regex.test(value) ? [] : ['Invalid format.'],
    }),
  
    custom: (validator: (value: any) => boolean, errorMessage: string): Validator => (value: any): ValidationResult => ({
      valid: validator(value),
      errors: validator(value) ? [] : [errorMessage],
    }),
  };
  
  export const validateField = (value: string, validators: Validator[]): ValidationResult => {
    const errors: string[] = [];
  
    validators.forEach(validator => {
      const result = validator(value);
      if (!result.valid) {
        errors.push(...result.errors);
      }
    });
  
    return {
      valid: errors.length === 0,
      errors,
    };
  };
  
  export default formValidators;
  