import connectToDatabase from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Connect to the MongoDB database
      const client = await connectToDatabase;
      const db = client.db("jsonviewer");

      // Insert the user data into the "users" collection
      const result = await db
        .collection("users")
        .insertOne({ name, email, password });

      res
        .status(201)
        .json({ message: "User registered successfully", data: result });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while registering the user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
