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

    const insertedData = await Data.insertMany(data);

    return new Response(JSON.stringify({ message: 'Data successfully uploaded', insertedData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error uploading data:', error);
    return new Response(JSON.stringify({ message: 'Error uploading data', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
