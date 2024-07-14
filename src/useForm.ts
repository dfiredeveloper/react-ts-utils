import { useState } from 'react';

type Validator<T> = (value: T) => string | undefined;

const useForm = <T extends { [key: string]: any }>(
  initialValues: T,
  validators: Partial<Record<keyof T, Validator<T>[]>> = {}
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string[]>>(undefined as any);

  const handleInputChange = (fieldName: keyof T, value: T[keyof T]) => {
    setValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<keyof T, string[]> = undefined as any;

    Object.keys(validators).forEach(field => {
      const fieldName = field as keyof T;
      const fieldValidators = validators[fieldName];

      if (fieldValidators) {
        const fieldErrors = fieldValidators.map(validator => validator(values[fieldName])).filter(Boolean) as string[];
        if (fieldErrors.length > 0) {
          newErrors[fieldName] = fieldErrors;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    setValues,
    handleInputChange,
    validateForm,
  };
};

export default useForm;
