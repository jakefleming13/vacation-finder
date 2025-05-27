import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { join } from "path";
import { existsSync } from "fs";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

interface UiDeploymentStackProps extends StackProps {
  deploymentBucket: IBucket;
}

export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: UiDeploymentStackProps) {
    super(scope, id, props);

    const uiDir = join(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "vacation-finder-frontend",
      "dist"
    );

    if (existsSync(uiDir)) {
      new BucketDeployment(this, "vacation-finder-ui-deployment", {
        destinationBucket: props.deploymentBucket,
        sources: [Source.asset(uiDir)],
      });

      new CfnOutput(this, "vacation-finder-ui-deploymentS3Url", {
        value: props.deploymentBucket.bucketWebsiteUrl,
      });
    } else {
      console.warn("Ui directory not found: " + uiDir);
    }
  }
}
