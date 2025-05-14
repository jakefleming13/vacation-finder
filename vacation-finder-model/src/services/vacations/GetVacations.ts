import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function GetVacations(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  //handle if there are quesry string parameters
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      const vacationId = event.queryStringParameters["id"];
      const getItemResponse = await ddbClient.send(
        new GetItemCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            id: {
              S: vacationId,
            },
          },
        })
      );
      if (getItemResponse.Item) {
        return {
          statusCode: 200,
          body: JSON.stringify(getItemResponse.Item),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify("Vacation not found"),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify("Id required"),
      };
    }
  }

  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  console.log("Start of result: \n" + result.Items);
  return {
    statusCode: 201,
    body: JSON.stringify(result.Items),
  };
}
