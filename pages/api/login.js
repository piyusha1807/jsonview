import connectToDatabase from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Connect to the MongoDB database
      const client = await connectToDatabase;
      const db = client.db("jsonviewer");

      // Insert the user data into the "users" collection
      const result = await db.collection("users").findOne({ email });

      res
        .status(201)
        .json({ message: "User login successfully", data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while login" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
