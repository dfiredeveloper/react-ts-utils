"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateField = void 0;
const formValidators = {
    minLength: (length) => (value) => ({
        valid: value.length >= length,
        errors: value.length >= length ? [] : [`Minimum length is ${length}.`],
    }),
    maxLength: (length) => (value) => ({
        valid: value.length <= length,
        errors: value.length <= length ? [] : [`Maximum length is ${length}.`],
    }),
    pattern: (regex) => (value) => ({
        valid: regex.test(value),
        errors: regex.test(value) ? [] : ['Invalid format.'],
    }),
    custom: (validator, errorMessage) => (value) => ({
        valid: validator(value),
        errors: validator(value) ? [] : [errorMessage],
    }),
};
const validateField = (value, validators) => {
    const errors = [];
    validators.forEach(validator => {
        const result = validator(value);
        if (!result.valid) {
            errors.push(...result.errors);
        }
    });
    return {
        valid: errors.length === 0,
        errors,
    };
};
exports.validateField = validateField;
exports.default = formValidators;
