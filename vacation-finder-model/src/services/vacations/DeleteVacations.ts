import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteVacations(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  //handle if there are quesry string parameters
  if (event.queryStringParameters && "id" in event.queryStringParameters) {
    const spaceId = event.queryStringParameters["id"];

    await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        //get the item you want to delete
        Key: {
          id: { S: spaceId },
        },
      })
    );

    return {
      statusCode: 200, //"No content" success status code
      body: JSON.stringify("Item deleted"),
    };
  } else {
    return {
      statusCode: 400, //bad request status code
      body: JSON.stringify("Requires query string parameters"),
    };
  }
}
