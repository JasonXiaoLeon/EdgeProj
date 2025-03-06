import { NextResponse } from 'next/server';
import Data from '@/models/Data';
import connectDB from '@/lib/database';

export async function POST(request: Request) {
  try {
    // 确保连接到 MongoDB
    await connectDB();

    const { fixture_mid, season, fixture_datetime, fixture_round, home_team, away_team } = await request.json();

    const queryConditions: any = {};

    if (fixture_mid) queryConditions.fixture_mid = fixture_mid;
    if (season && !isNaN(Number(season))) queryConditions.season = Number(season);
    if (fixture_datetime && !isNaN(Date.parse(fixture_datetime))) {
      queryConditions.fixture_datetime = new Date(fixture_datetime);
    }
    if (fixture_round && !isNaN(Number(fixture_round))) queryConditions.fixture_round = Number(fixture_round);
    if (home_team) queryConditions.home_team = home_team;
    if (away_team) queryConditions.away_team = away_team;

    const fixtures = await Data.find(queryConditions);
    
    return NextResponse.json({ data: fixtures });
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return NextResponse.json({ error: 'Failed to fetch fixtures' }, { status: 500 });
  }
}
