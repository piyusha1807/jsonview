import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    const { id } = req.query;

    try {
      const client = await connectToDatabase;
      const filesCollection = client.db("jsonViewer").collection("files");

      const result = await filesCollection.findOne({
        _id: id,
      });

      if (!result) {
        res.status(404).json({ error: "Data not found" });
      }

      if (session?.user?.email !== result.createdBy) {
        res
          .status(403)
          .json({ error: "You do not have permission to delete this file" });
      }

      const deleteResult = await filesCollection.deleteOne({
        _id: id,
      });

      if (deleteResult.deletedCount === 1) {
        res.status(200).json({
          message: "Data deleted successfully",
        });
      } else {
        throw new Error("Deletion failed");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while deleting data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
