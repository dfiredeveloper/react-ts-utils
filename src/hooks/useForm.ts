import { useState } from 'react';

const useForm = (initialValues: any, validators: any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldName: string, value: any) => {
    setValues({ ...values, [fieldName]: value });
  };

  const validateForm = () => {
    // Validation logic here
    return true; // Placeholder logic
  };

  return {
    values,
    errors,
    handleInputChange,
    validateForm,
  };
};

export default useForm;
