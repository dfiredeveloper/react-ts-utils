import { useState } from 'react';
import { validateForm, formValidators, ValidationResult, Validator } from './formValidator';

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
    const validationResults = validateForm(newValues, validators);

    setFormState({
      values: newValues,
      errors: validationResults.errors,
      isValid: validationResults.isValid,
    });
  };

  return {
    formState,
    handleChange,
  };
}
