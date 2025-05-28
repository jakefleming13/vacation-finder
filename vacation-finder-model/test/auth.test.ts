import test from "node:test";
import { AuthService } from "./AuthService";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

//function to get a new token after each deploy
async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("firstuserjohn", "(John1205675");
  console.log(loginResult);
  const idToken = await service.getIdToken();
  //console.log(idToken);
  console.log();

  //const credentials = await service.generateTempCredentials();
  //console.log(credentials);

  //const bucketResults = await listBuckets(credentials);
  //console.log(bucketResults);
}

//function to test admin role
async function listBuckets(credentials: any) {
  //get reference to the S3 client
  const client = new S3Client({
    credentials,
  });

  //save reference to the command
  const command = new ListBucketsCommand({});

  //call the command
  const result = await client.send(command);
  return result;
}

testAuth();
