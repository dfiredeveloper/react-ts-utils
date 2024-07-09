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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isString = exports.requireReactNodeProp = exports.requireArrayProp = exports.requireProp = void 0;
const react_1 = __importDefault(require("react"));
__exportStar(require("./formValidator"), exports);
function requireProp(value) {
    if (value === undefined || value === null) {
        throw new Error('Required prop is missing!');
    }
    return value;
}
exports.requireProp = requireProp;
function requireArrayProp(value) {
    if (!Array.isArray(value)) {
        throw new Error('Required prop must be an array!');
    }
    return value;
}
exports.requireArrayProp = requireArrayProp;
function requireReactNodeProp(value) {
    if (!react_1.default.isValidElement(value)) {
        throw new Error('Required prop must be a ReactNode!');
    }
    return value;
}
exports.requireReactNodeProp = requireReactNodeProp;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
exports.isValidEmail = isValidEmail;
