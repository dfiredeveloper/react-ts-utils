import { useState } from 'react';
import { validateForm, Validator, ValidationResult } from './formValidator';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string[]>>;
  isValid: boolean;
}

const useForm = <T>(initialValues: T, validators: Partial<Record<keyof T, Validator[]>>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (fieldName: keyof T) => (value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const validate = () => {
    const validationResults = validateForm(values, validators as { [key: string]: Validator[] });
    const newErrors: Partial<Record<keyof T, string[]>> = {};

    Object.keys(validationResults).forEach(fieldName => {
      const result = validationResults[fieldName];
      if (!result.valid) {
        newErrors[fieldName] = result.errors || [];
      }
    });

    setErrors(newErrors);
    setIsValid(Object.values(validationResults).every(result => result.valid));
  };

  return {
    formState: { values, errors, isValid },
    handleChange,
    validate,
  };
};

export default useForm;
