import { JSONError } from "./DataValidator";
import { randomUUID } from "crypto";

//Custom function for creating random ID's
export function createRandomID() {
  return randomUUID();
}

//Function that handles JSON parsing errors: gives more specific error messages
//parse() function does not provide specific error messages, hence this functions
export function parseJSON(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (error) {
    throw new JSONError(error.message);
  }
}
