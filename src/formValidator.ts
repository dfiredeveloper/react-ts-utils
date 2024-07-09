type ValidationResult = {
    valid: boolean;
    errors: string[];
  };
  
  type Validator = (value: any) => ValidationResult;
  
  type Validators = {
    [key: string]: Validator;
  };
  
  export const formValidators: Validators = {
    required: (value: any): ValidationResult => ({
      valid: value !== undefined && value !== null && value !== '',
      errors: value !== undefined && value !== null && value !== '' ? [] : ['This field is required.']
    }),
    email: (value: string): ValidationResult => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return {
        valid: emailRegex.test(value),
        errors: emailRegex.test(value) ? [] : ['Invalid email address.']
      };
    },
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
  
  export const validateField = (value: any, rules: Validator[]): ValidationResult => {
    const errors: string[] = [];
    let valid = true;
  
    rules.forEach((rule) => {
      const result = rule(value);
      if (!result.valid) {
        valid = false;
        errors.push(...result.errors);
      }
    });
  
    return { valid, errors };
  };
  
  export const validateForm = (formData: { [key: string]: any }, formRules: { [key: string]: Validator[] }): { [key: string]: ValidationResult } => {
    const validationResults: { [key: string]: ValidationResult } = {};
  
    Object.keys(formRules).forEach((field) => {
      validationResults[field] = validateField(formData[field], formRules[field]);
    });
  
    return validationResults;
  };
  