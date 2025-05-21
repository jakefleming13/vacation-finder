import { JSONError } from "./DataValidator";

//Function that handles JSON parsing errors: gives more specific error messages
//parse() function does not provide specific error messages, hence this functions
export function parseJSON(arg: string) {
  try {
    return JSON.parse(arg);
  } catch (error) {
    throw new JSONError(error.message);
  }
}
