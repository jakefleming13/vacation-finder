import { error } from "console";
import { VacationEntry } from "../model/model";

//Error for when HTTP methods are missing mandatory feilds
export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`);
  }
}

//Error to handle JSON parsing errors
export class JSONError extends Error {}

export function validateAsVacationEntry(arg: any) {
  if ((arg as VacationEntry).location === undefined) {
    throw new MissingFieldError("location");
  } else if ((arg as VacationEntry).name === undefined) {
    throw new MissingFieldError("name");
  } else if ((arg as VacationEntry).id === undefined) {
    throw new MissingFieldError("id");
  }
}
