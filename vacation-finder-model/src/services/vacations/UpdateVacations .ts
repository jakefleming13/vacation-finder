import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateVacations(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  //handle if there are quesry string parameters
  if (
    event.queryStringParameters &&
    "id" in event.queryStringParameters &&
    event.body
  ) {
    const spaceId = event.queryStringParameters["id"];
    //take the first thing in the event body to make things more simple
    const parsedBody = JSON.parse(event.body);
    const requestBodyKey = Object.keys(parsedBody)[0];
    const requestBodyValue = parsedBody[requestBodyKey];
    console.log(parsedBody, spaceId, requestBodyKey, requestBodyValue);

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        //get the item you want to update
        Key: {
          id: { S: spaceId },
        },
        //use update expression to update dynamobd item:
        UpdateExpression: "set #zzzNew = :new",
        ExpressionAttributeValues: {
          ":new": {
            S: requestBodyValue,
          },
        },
        ExpressionAttributeNames: {
          "#zzzNew": requestBodyKey,
        },
        ReturnValues: "UPDATED_NEW",
      })
    );

    return {
      statusCode: 204, //"No content" success status code
      body: JSON.stringify(updateResult.Attributes),
    };
  } else {
    return {
      statusCode: 400, //bad request status code
      body: JSON.stringify("Incorrect parameters"),
    };
  }
}
