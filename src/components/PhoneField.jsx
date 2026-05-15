import Input from "./ui/Input";
import {
  blockNonNumericKey,
  handleNumericPaste,
  sanitizeNumeric,
} from "../lib/numericInput";

const PHONE_MAX_LENGTH = 10;

export function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

export default function PhoneField({
  value,
  onChange,
  id = "phone",
  label = "Phone",
  placeholder = "9876543210",
  required = true,
}) {
  function updatePhone(nextValue) {
    onChange(sanitizeNumeric(nextValue, PHONE_MAX_LENGTH));
  }

  function handleChange(event) {
    updatePhone(event.target.value);
  }

  function handleKeyDown(event) {
    blockNonNumericKey(event);
  }

  function handlePaste(event) {
    handleNumericPaste(event, value, PHONE_MAX_LENGTH, onChange);
  }

  return (
    <Input
      id={id}
      name="phone"
      type="tel"
      inputMode="numeric"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      maxLength={PHONE_MAX_LENGTH}
      minLength={PHONE_MAX_LENGTH}
      pattern="[0-9]{10}"
      autoComplete="tel"
      required={required}
    />
  );
}
