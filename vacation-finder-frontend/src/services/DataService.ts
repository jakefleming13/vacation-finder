import type { AuthService } from "./AuthService";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { DataStack } from "../../../vacation-finder-model/outputs.json";

export class DataService {
  private authService: AuthService;
  private s3Client: S3Client | undefined;
  private awsRegion = "us-east-2";

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public async createSpace(name: string, location: string, photo?: File) {
    console.log("calling create space!!");
    if (photo) {
      const uploadUrl = await this.uploadPublicFile(photo);
      console.log(uploadUrl);
    }
    return "123" + name + location;
  }

  private async uploadPublicFile(file: File) {
    const credentials = await this.authService.getTemporaryCredentials();
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        credentials: credentials as any,
        region: this.awsRegion,
      });
    }

    //fix to invalid type error when attempting to upload files to s3
    const arrayBuffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: DataStack.VacationFinderPhotosBucketName,
      Key: file.name,
      ACL: "public-read",
      Body: arrayBuffer,
    });

    await this.s3Client.send(command);

    //return the url of the newly uploaded file
    return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`;
  }

  public isAuthorized() {
    return true;
  }
}
