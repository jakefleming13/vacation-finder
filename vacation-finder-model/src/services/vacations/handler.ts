import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { PostVacations } from "./PostVacations";
import { GetVacations } from "./GetVacations";
import { updateVacations } from "./UpdateVacations ";
import { deleteVacations } from "./DeleteVacations";
import { JSONError, MissingFieldError } from "../shared/DataValidator";

const ddbClient = new DynamoDBClient({});

//Needs to return an APIGatewayProxyResult
async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    //Different excecution based on the events http method being used
    switch (event.httpMethod) {
      case "GET":
        message = "Get method in handler";
        const getResponse = await GetVacations(event, ddbClient);
        console.log(getResponse);
        return getResponse;
      case "POST":
        message = "Post method in handler";
        const postResponse = await PostVacations(event, ddbClient);
        console.log(postResponse);
        return postResponse;
      case "PUT":
        const putReponse = await updateVacations(event, ddbClient);
        console.log(putReponse);
        return putReponse;
      case "DELETE":
        const deleteReponse = await deleteVacations(event, ddbClient);
        console.log(deleteReponse);
        return deleteReponse;
      default:
        message = "Invalid HTTP method";
        break;
    }
  } catch (error) {
    //Add custom validation check to ensure correct error message and status code
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    } else if (error instanceof JSONError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
