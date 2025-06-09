import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { join } from "path";
import { existsSync } from "fs";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { getSuffixFromStack } from "../Utils";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { AccessLevel, Distribution } from "aws-cdk-lib/aws-cloudfront";

export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    const deploymentBucket = new Bucket(this, "uiDeploymentBucket", {
      bucketName: `vacation-finder-frontend-${suffix}`,
    });

    const uiDir = join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "vacation-finder-frontend",
      "dist"
    );

    if (!existsSync(uiDir)) {
      console.warn("Ui dir not found: " + uiDir);
      return;
    }

    new BucketDeployment(this, "VacationsFinderDeployment", {
      destinationBucket: deploymentBucket,
      sources: [Source.asset(uiDir)],
    });

    const s3Origin = S3BucketOrigin.withOriginAccessControl(deploymentBucket, {
      originAccessLevels: [AccessLevel.READ],
    });

    const distribution = new Distribution(this, "VacationsFinderDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: s3Origin,
      },
    });

    new CfnOutput(this, "VacationFinderUrl", {
      value: distribution.distributionDomainName,
    });

    // if (existsSync(uiDir)) {
    //   new BucketDeployment(this, "vacation-finder-ui-deployment", {
    //     destinationBucket: props.deploymentBucket,
    //     sources: [Source.asset(uiDir)],
    //   });

    //   new CfnOutput(this, "vacation-finder-ui-deploymentS3Url", {
    //     value: props.deploymentBucket.bucketWebsiteUrl,
    //   });
    // } else {
    //   console.warn("Ui directory not found: " + uiDir);
    // }
  }
}
