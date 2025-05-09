//Strucuture of cdk lambda example
exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(`Table Name: ${process.env.TABLE_NAME}`),
  };
};
