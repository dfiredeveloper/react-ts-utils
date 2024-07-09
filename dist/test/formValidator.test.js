"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const formValidator_1 = __importStar(require("../src/formValidator"));
describe('Form Validators', () => {
    describe('minLengthValidator', () => {
        const minLengthValidator = formValidator_1.default.minLength(3);
        it('should return true for a string with minimum length', () => {
            expect(minLengthValidator('Hello').valid).toBe(true);
        });
        it('should return false for a string shorter than minimum length', () => {
            expect(minLengthValidator('Hi').valid).toBe(false);
        });
    });
    describe('maxLengthValidator', () => {
        const maxLengthValidator = formValidator_1.default.maxLength(5);
        it('should return true for a string within maximum length', () => {
            expect(maxLengthValidator('Hello').valid).toBe(true);
        });
        it('should return false for a string longer than maximum length', () => {
            expect(maxLengthValidator('Hello World').valid).toBe(false);
        });
    });
    describe('patternValidator', () => {
        const patternValidator = formValidator_1.default.pattern(/Hello/);
        it('should return true for a string matching the pattern', () => {
            expect(patternValidator('Hello').valid).toBe(true);
        });
        it('should return false for a string not matching the pattern', () => {
            expect(patternValidator('Hi').valid).toBe(false);
        });
    });
    describe('customValidator', () => {
        const customValidator = formValidator_1.default.custom(value => value === 'valid', 'Invalid value');
        it('should return true for a value passing the custom validation', () => {
            expect(customValidator('valid').valid).toBe(true);
        });
        it('should return false for a value failing the custom validation', () => {
            expect(customValidator('invalid').valid).toBe(false);
        });
    });
    describe('validateField', () => {
        const validators = [
            formValidator_1.default.minLength(3),
            formValidator_1.default.maxLength(5),
            formValidator_1.default.pattern(/Hello/),
        ];
        it('should return true if all validators pass', () => {
            expect((0, formValidator_1.validateField)('Hello', validators).valid).toBe(true);
        });
        it('should return false if any validator fails', () => {
            expect((0, formValidator_1.validateField)('Hi', validators).valid).toBe(false);
        });
    });
});
