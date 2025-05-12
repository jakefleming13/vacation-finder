import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

//Needs to return an APIGatewayProxyResult
async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  //Different excecution based on the events http method being used
  switch (event.httpMethod) {
    case "GET":
      message = "Get method";
      break;
    case "POST":
      message = "Post method";
      break;
    default:
      message = "Invalid HTTP method";
      break;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
}

export { handler };
