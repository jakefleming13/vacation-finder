import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import {
  Bucket,
  BucketAccessControl,
  HttpMethods,
  IBucket,
  ObjectOwnership,
} from "aws-cdk-lib/aws-s3";

//Stack that will contain the Dynamodb database
export class DataStack extends Stack {
  public readonly vacationsTable: ITable;
  // public readonly deploymentBucket: IBucket;
  public readonly photosBucket: IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    // this.deploymentBucket = new Bucket(this, "VacationFinderFrontend", {
    //   bucketName: `vacation-finder-frontend-${suffix}`,
    //   //objectOwnership: ObjectOwnership.OBJECT_WRITER,
    //   blockPublicAccess: {
    //     blockPublicAcls: false,
    //     blockPublicPolicy: false,
    //     ignorePublicAcls: false,
    //     restrictPublicBuckets: false,
    //   },
    //   publicReadAccess: true,
    //   websiteIndexDocument: "index.html",
    // });

    this.photosBucket = new Bucket(this, "VacationFinderPhotos", {
      bucketName: `vacation-finder-photos-${suffix}`,
      cors: [
        {
          allowedMethods: [HttpMethods.HEAD, HttpMethods.PUT, HttpMethods.GET],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
      //accessControl: BucketAccessControl.PUBLIC_READ,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    });

    new CfnOutput(this, "VacationFinderPhotosBucketName", {
      value: this.photosBucket.bucketName,
    });

    this.vacationsTable = new Table(this, "VacationsTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      //To make tablename unique, use the stack suffix
      tableName: `VacationsTable-${suffix}`,
    });
  }
}
