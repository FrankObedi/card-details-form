export function isValidNumber(inputString) {
  const regex = /^[0-9]+$/;
  return regex.test(inputString);
}
