export interface ValidationResult {
  valid: boolean;
  errors?: string[]; 
}

export type Validator = (value: any) => ValidationResult;


export const validators = {
  name: [(value: any) => ({ valid: value.length > 0, errors: ['Name is required'] })],
  email: [(value: any) => ({ valid: /\S+@\S+\.\S+/.test(value), errors: ['Invalid email address'] })],
};

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

export const validateForm = (
  formData: { [key: string]: any },
  formRules: { [key: string]: ((value: any) => ValidationResult)[] }
): { [key: string]: ValidationResult } => {
  const validationResults: { [key: string]: ValidationResult } = {};

  Object.keys(formRules).forEach(fieldName => {
    const fieldValidators = formRules[fieldName];
    const results = fieldValidators.map(validator => validator(formData[fieldName]));
    const fieldValidationResult: ValidationResult = {
      valid: results.every(result => result.valid),
      errors: results.flatMap(result => result.errors || []),
    };
    validationResults[fieldName] = fieldValidationResult;
  });

  return validationResults;
};

export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
  return undefined;
};

// Add more validators as needed
