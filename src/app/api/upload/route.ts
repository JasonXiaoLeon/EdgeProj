import { NextRequest } from 'next/server';
import connectDB from '@/lib/database';
import Data from '@/models/Data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = body;

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ message: 'No data provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const newData = [];
    for (const item of data) {
      const existingItem = await Data.findOne({ uniqueId: item.uniqueId });
      if (!existingItem) {
        newData.push(item); 
      }
    }

    if (newData.length > 0) {
      const insertedData = await Data.insertMany(newData);
      return new Response(JSON.stringify({
        message: 'Data successfully uploaded',
        insertedData,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({
        message: 'No new data to insert. All data already exists.',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error uploading data:', error);
    return new Response(JSON.stringify({
      message: 'Error uploading data',
      error: error,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
