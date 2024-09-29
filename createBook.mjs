import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event, context) => {
    try {
        const book = JSON.parse(event.body);

        const newBook = {
            ...book,
            id: randomUUID(),
        };
        await ddbDocClient.send(new PutCommand({
            TableName: "books",
            Item: newBook,
        }));

        return {
            statusCode: 201,
            body: JSON.stringify(newBook)
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
