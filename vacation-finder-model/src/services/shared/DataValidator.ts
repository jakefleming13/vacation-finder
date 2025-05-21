import { VacationEntry } from "../model/model";

export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`);
  }
}

export function validateAsVacationEntry(arg: any) {
  if ((arg as VacationEntry).location === undefined) {
    throw new MissingFieldError("location");
  } else if ((arg as VacationEntry).name === undefined) {
    throw new MissingFieldError("name");
  } else if ((arg as VacationEntry).id === undefined) {
    throw new MissingFieldError("id");
  }
}
