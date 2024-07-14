import { useState } from 'react';

type Validators<T> = {
  [K in keyof T]?: (value: T[K]) => string | undefined;
};

type Errors<T> = {
  [K in keyof T]?: string;
};

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validators: Validators<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const handleInputChange = (fieldName: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    if (validators[fieldName]) {
      const error = validators[fieldName]?.(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error,
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Errors<T> = {};

    Object.keys(values).forEach((key) => {
      const fieldName = key as keyof T;
      if (validators[fieldName]) {
        const error = validators[fieldName]?.(values[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    handleInputChange,
    validateForm,
  };
};
