export const NUMERIC_ALLOWED_KEYS = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
]);

export function sanitizeNumeric(value, maxLength) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

export function blockNonNumericKey(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  if (NUMERIC_ALLOWED_KEYS.has(event.key)) {
    return;
  }

  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}

export function handleNumericPaste(event, currentValue, maxLength, onChange) {
  event.preventDefault();
  const pasted = event.clipboardData.getData("text");
  const input = event.target;
  const start = input.selectionStart ?? currentValue.length;
  const end = input.selectionEnd ?? currentValue.length;
  const merged = currentValue.slice(0, start) + pasted + currentValue.slice(end);
  onChange(sanitizeNumeric(merged, maxLength));
}
