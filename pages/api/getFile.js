import { getServerSession } from "next-auth/next";
import connectToDatabase from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    const { id } = req.query;

    try {
      const client = await connectToDatabase;
      const filesCollection = client.db("jsonView").collection("files");

      const result = await filesCollection.findOne({
        _id: id,
      });

      if (!result) {
        res.status(404).json({ error: "Data not found" });
      }

      if (
        !result.globalAccess.view &&
        session?.user?.email !== result.createdBy
      ) {
        res
          .status(403)
          .json({ error: "You do not have permission to view this file" });
      }

      const modifiedResult = {
        id: result._id,
        fileName: result.fileName,
        comments: result.comments,
        json: result.json,
        createdAt: result.createdAt,
        lastModifiedAt: result.lastModifiedAt,
        globalView: result?.globalAccess?.view,
        globalEdit: result?.globalAccess?.edit,
      };

      res.status(201).json({
        message: "Data fetch successfully",
        data: modifiedResult,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
