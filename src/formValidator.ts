export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const formValidators = {
  required: (value: string): ValidationResult => ({
    valid: !!value,
    errors: !!value ? [] : ['This field is required.']
  }),
  minLength: (length: number) => (value: string): ValidationResult => ({
    valid: value.length >= length,
    errors: value.length >= length ? [] : [`Minimum length is ${length}.`]
  }),
  maxLength: (length: number) => (value: string): ValidationResult => ({
    valid: value.length <= length,
    errors: value.length <= length ? [] : [`Maximum length is ${length}.`]
  }),
  pattern: (regex: RegExp) => (value: string): ValidationResult => ({
    valid: regex.test(value),
    errors: regex.test(value) ? [] : ['Invalid format.']
  }),
  custom: (validator: (value: any) => boolean, errorMessage: string) => (value: any): ValidationResult => ({
    valid: validator(value),
    errors: validator(value) ? [] : [errorMessage]
  }),
  email: (value: string): ValidationResult => ({
    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errors: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? [] : ['Invalid email format.']
  })
};

export const validateField = (value: any, validators: ((value: any) => ValidationResult)[]): ValidationResult => {
  const errors: string[] = [];
  let valid = true;

  validators.forEach(validator => {
    const result = validator(value);
    if (!result.valid) {
      valid = false;
      errors.push(...result.errors);
    }
  });

  return { valid, errors };
};

export const validateForm = (formData: { [key: string]: any }, formRules: { [key: string]: ((value: any) => ValidationResult)[] }): { [key: string]: ValidationResult } => {
  const results: { [key: string]: ValidationResult } = {};

  for (const field in formRules) {
    results[field] = validateField(formData[field], formRules[field]);
  }

  return results;
};

export { formValidators };
export * from './formValidator';
