import { getServerSession } from "next-auth/next";
import { v4 as uuidv4 } from "uuid";
import connectToDatabase from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const { json, share, shareType, id } = req.body;

    try {
      const client = await connectToDatabase;
      const filesCollection = client.db("jsonView").collection("files");

      let globalAccess = {};
      if (!session) {
        globalAccess = {
          view: true,
          edit: true,
        };
      } else {
        if (share === "public") {
          globalAccess = {
            view: shareType === "view",
            edit: shareType === "edit",
          };
        } else {
          globalAccess = {
            view: false,
            edit: false,
          };
        }
      }

      const existingRecord = await filesCollection.findOne({ _id: id });

      if (!existingRecord) {
        const result = await filesCollection.insertOne({
          _id: uuidv4(),
          fileName: fileName ?? "",
          comments: comments ?? "",
          json: json,
          createdBy: session?.user?.email ?? null,
          createdAt: new Date(),
          globalAccess: globalAccess,
        });
        return res.status(201).json({
          message: "Data saved successfully and file permission updated",
          data: { id: result.insertedId },
        });
      } else {
        if (session?.user?.email !== existingRecord.createdBy) {
          res.status(403).json({
            error:
              "You do not have permission to change permission for this file",
          });
        }

        await filesCollection.updateOne(
          { _id: id },
          {
            $set: {
              json: json,
              lastModifiedBy: session?.user?.email ?? null,
              lastModifiedAt: new Date(),
              globalAccess: globalAccess,
            },
          }
        );
        return res.status(200).json({
          message: "Data updated successfully and file permission updated",
          data: { id: id },
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating file permissions" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
