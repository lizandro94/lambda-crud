import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBDocumentClient(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const book = await client.send(new GetCommand({ TableName: "books", Key: { id } }));

    const response = {
      statusCode: 200,
      body: JSON.stringify(book),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
    return response;
  }
};
