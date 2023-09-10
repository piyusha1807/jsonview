import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);

    try {
      if (!session) {
        res
          .status(403)
          .json({ error: "You do not have permission to view the data" });
      }

      const client = await connectToDatabase;
      const filesCollection = client.db("jsonView").collection("files");

      const resultCursor = await filesCollection.find({
        createdBy: session?.user?.email,
      });

      const result = await resultCursor.toArray();

      if (!result) {
        res.status(404).json({ error: "Data not found" });
      }

      const modifiedResult = result.map((item) => {
        return {
          id: item._id,
          fileName: item.fileName,
          comments: item.comments,
          createdAt: item.createdAt,
          lastModifiedAt: item.lastModifiedAt,
          globalView: item?.globalAccess?.view,
          globalEdit: item?.globalAccess?.edit,
        };
      });

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
