export interface ValidationResult {
  valid: boolean;
  errors?: string[]; // Ensure errors property is defined here
}

export type Validator = (value: any) => ValidationResult;

// Example validators
export const validators = {
  name: [(value: any) => ({ valid: value.length > 0, errors: ['Name is required'] })],
  email: [(value: any) => ({ valid: /\S+@\S+\.\S+/.test(value), errors: ['Invalid email address'] })],
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