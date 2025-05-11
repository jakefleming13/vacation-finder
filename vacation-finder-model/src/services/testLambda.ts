import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

//Important to init the client outside of the handler (allows for re-use of the client)
const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  //Command setup to display all s3 buckets
  const command = new ListBucketsCommand({});
  const listBucketResult = (await s3Client.send(command)).Buckets;

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      "Here are your current s3 Buckets: " + JSON.stringify(listBucketResult)
    ),
  };

  console.log(event);

  return response;
}

export { handler };
