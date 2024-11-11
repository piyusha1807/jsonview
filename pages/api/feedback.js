import { getServerSession } from 'next-auth/next';
import { v4 as uuidv4 } from 'uuid';
import connectToDatabase from '../../lib/mongodb';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const { rating, comments } = req.body;

    try {
      const client = await connectToDatabase;
      const filesCollection = client.db('jsonViewer').collection('feedback');

      await filesCollection.insertOne({
        _id: uuidv4(),
        rating: rating ?? 0,
        comments: comments ?? '',
        createdBy: session?.user?.email ?? null,
        createdAt: new Date()
      });
      return res.status(201).json({
        message: 'Thank You for Your Feedback!'
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while saving feedback' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
