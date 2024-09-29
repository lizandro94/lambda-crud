import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const book = JSON.parse(event.body);

    await client.send(new PutCommand({ TableName: "books", Item: book }))

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
