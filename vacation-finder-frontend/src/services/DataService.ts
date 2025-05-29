import type { AuthService } from "./AuthService";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  DataStack,
  ApiStack,
} from "../../../vacation-finder-model/outputs.json";
import type { VacationEntry } from "../components/model/model";

const vacationsUrl = ApiStack.VacationsApiEndpoint405A4BD9 + "vacations";

export class DataService {
  private authService: AuthService;
  private s3Client: S3Client | undefined;
  private awsRegion = "us-east-2";

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public reserveVacation(vacationId: string) {
    return "123";
  }

  //function to get vacations
  public async getVacations(): Promise<VacationEntry[]> {
    const getVacationsResult = await fetch(vacationsUrl, {
      method: "GET",
      headers: {
        authorization: this.authService.jwtToken!,
      },
    });

    const getResultJSON = await getVacationsResult.json();
    return getResultJSON;
  }

  public async createVacation(name: string, location: string, photo?: File) {
    const vacation = {} as any;
    vacation.name = name;
    vacation.location = location;

    if (photo) {
      const uploadUrl = await this.uploadPublicFile(photo);
      vacation.photoUrl = uploadUrl;
    }

    //will return the id of our newly created vacation
    const postResult = await fetch(vacationsUrl, {
      method: "POST",
      body: JSON.stringify(vacation),
      headers: {
        Authorization: this.authService.jwtToken!,
      },
    });

    const postResultJSON = await postResult.json();

    return postResultJSON.id;
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
    return this.authService.isAuthorized();
  }
}
