import { Fn, Stack } from "aws-cdk-lib";

//function that allows us to get a stacks suffix: used for naming purposes
export function getSuffixFromStack(stack: Stack) {
  const shortStackId = Fn.select(2, Fn.split("/", stack.stackId));
  const suffix = Fn.select(4, Fn.split("-", shortStackId));
  return suffix;
}
