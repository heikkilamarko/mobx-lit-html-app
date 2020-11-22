import isInt from 'validator/es/lib/isInt';
import { sleep } from './utils';

export function validateRequired(value) {
  value = toTrimmedString(value);
  return value ? null : 'form.validation.required';
}

export function validateAge(value) {
  value = toTrimmedString(value);
  let error = validateRequired(value);
  if (error) return error;
  return isInt(value, { min: 0, max: 150 }) ? null : 'form.validation.age';
}

export async function validateUsername(value) {
  value = toTrimmedString(value);
  await sleep(500); // Simulate async work.
  return value === 'demo' ? 'form.validation.taken' : null;
}

export function validateTags(tags) {
  return tags?.length ? null : 'form.tags.validation.required';
}

function toTrimmedString(value) {
  return value != null ? value.trim() : '';
}
