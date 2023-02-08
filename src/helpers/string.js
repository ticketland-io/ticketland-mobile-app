import {qrCodeKeys} from "./constants";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function qrCodeKeysCompare(qrKeys) {
  const result = JSON.stringify(qrCodeKeys) === JSON.stringify(qrKeys);

  if (!result) {
    throw new Error("Wrong Object format")
  }

  return result
}
