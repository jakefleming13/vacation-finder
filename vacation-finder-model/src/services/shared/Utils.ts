import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
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

//function to determine if a user belongs to an admin group
export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims["cognito:groups"];
  if (groups) {
    return (groups as string).includes("admins");
  }
  return false;
}

//Add to our HTTP response header to allow for CORS
export function addCORSHeader(arg: APIGatewayProxyResult) {
  if (!arg.headers) {
    arg.headers = {};
  }
  //add new fields in the header -> make our server available from any website (not exactly a best practice)
  arg.headers["Access-Control-Allow-Origin"] = "*";
  arg.headers["Access-Control-Allow-Methods"] = "*";
}
