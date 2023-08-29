export function isValidString(inputString) {
  const regex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
  return regex.test(inputString);
}
