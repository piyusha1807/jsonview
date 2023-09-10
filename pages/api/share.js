import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const { json } = req.body;

    console.log("session121", session);
    try {
      const client = await connectToDatabase;
      const jsonCollection = client.db("test").collection("json_data");

      const result = await jsonCollection.insertOne({
        _id: uuidv4(),
        user_email: session.user.email ?? null,
        json: json,
      });
      res.status(201).json({
        message: "Data saved successfully",
        data: { id: result.insertedId },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while saving data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
