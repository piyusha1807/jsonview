import { getServerSession } from 'next-auth/next';
import { v4 as uuidv4 } from 'uuid';
import connectToDatabase from '../../lib/mongodb';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const { fileName, comments, json, type, id } = req.body;

    try {
      const client = await connectToDatabase;
      const filesCollection = client.db('jsonViewer').collection('files');

      if (type == 'update') {
        const existingRecord = await filesCollection.findOne({ _id: id });

        if (!existingRecord) {
          return res.status(404).json({ error: 'Record not found' });
        }

        if (
          !existingRecord.globalAccess.edit &&
          session?.user?.email !== existingRecord.createdBy
        ) {
          res.status(403).json({ error: 'You do not have permission to edit this file' });
        }

        const { value } = await filesCollection.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              json: json,
              lastModifiedBy: session?.user?.email ?? null,
              lastModifiedAt: new Date()
            }
          },
          { returnOriginal: false }
        );

        (value.id = value._id), delete value._id;

        return res.status(200).json({
          message: 'Data updated successfully',
          data: value
        });
      }

      const insertObject = {
        fileName: fileName ?? '',
        comments: comments ?? '',
        json: json,
        createdBy: session?.user?.email ?? null,
        createdAt: new Date(),
        globalAccess: {
          view: session ? false : true,
          edit: session ? false : true
        }
      };
      const result = await filesCollection.insertOne({
        _id: uuidv4(),
        ...insertObject
      });
      return res.status(201).json({
        message: 'Data saved successfully',
        data: { id: result.insertedId, ...insertObject }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while saving data' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
