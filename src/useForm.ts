import { useState } from 'react';
import { validateForm, ValidationResult, Validator } from './formValidator';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string[]>>;
  isValid: boolean;
}

type FormValidators<T> = Partial<Record<keyof T, Validator[]>>;

export function useForm<T>(initialValues: T, validators: FormValidators<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    isValid: true,
  });

  const handleChange = (name: keyof T) => (value: any) => {
    const newValues = { ...formState.values, [name]: value };
    const validationResults = validateForm<T>(newValues, validators);

    setFormState({
      values: newValues,
      errors: Object.keys(validationResults).reduce((acc, key) => {
        acc[key as keyof T] = validationResults[key as keyof T].errors;
        return acc;
      }, {} as Partial<Record<keyof T, string[]>>),
      isValid: Object.values(validationResults).every((result: any) => result.valid), // Adjusted type here
    });
  };

  return {
    formState,
    handleChange,
  };
}
