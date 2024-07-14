export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export type Validator = (value: any) => ValidationResult;

export const formValidators = {
  required: (value: any): ValidationResult => ({
    valid: value !== undefined && value !== null && value !== '',
    errors: value !== undefined && value !== null && value !== '' ? [] : ['This field is required.']
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
  })
};

export const validateForm = <T>(formData: T, formRules: { [K in keyof T]?: Validator[] }): { [K in keyof T]: ValidationResult } => {
  const validationResults = {} as { [K in keyof T]: ValidationResult };

  for (const key in formRules) {
    if (formRules.hasOwnProperty(key)) {
      const validators = formRules[key] || [];
      const value = formData[key];
      const result = validators.reduce(
        (acc, validator) => {
          const validation = validator(value);
          return {
            valid: acc.valid && validation.valid,
            errors: [...acc.errors, ...validation.errors]
          };
        },
        { valid: true, errors: [] } as ValidationResult
      );
      validationResults[key] = result;
    }
  }

  return validationResults;
};
