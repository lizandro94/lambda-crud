import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    await client.send(new DeleteCommand({ TableName: 'books', Key: { id } }));

    const response = {
      statusCode: 200,
      body: JSON.stringify(`Deleted Item: ${id}`),
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
