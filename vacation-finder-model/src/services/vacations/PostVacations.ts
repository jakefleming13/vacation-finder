import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function PostVacations(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  const randomId = v4();

  //May throw errors related to the body not being properly configured
  const item = JSON.parse(event.body);
  item.id = randomId;

  const result = await ddbClient.send(
    new PutItemCommand({
      TableName: process.env.TABLE_NAME,

      Item: marshall(item), //add attribute types to the item
    })
  );
  console.log("Start of result: \n" + result);
  return {
    statusCode: 201,
    body: JSON.stringify({ id: item.id }),
  };
}
