import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { PostVacations } from "./PostVacations";
import { GetVacations } from "./GetVacations";

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
        const getResponse = GetVacations(event, ddbClient);
        return getResponse;
        break;
      case "POST":
        message = "Post method in handler";
        const postResponse = PostVacations(event, ddbClient);
        return postResponse;
      default:
        message = "Invalid HTTP method";
        break;
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
