'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IData {
  fixture_mid: string;
  season: number;
  fixture_datetime: string;
  fixture_round: number;
  home_team: string;
  away_team: string;
}

const SearchFixtures = () => {
  const [searchParams, setSearchParams] = useState({
    fixture_mid: '',
    season: '',
    fixture_datetime: '',
    fixture_round: '',
    home_team: '',
    away_team: ''
  });

  const [fixtures, setFixtures] = useState<IData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (Object.values(searchParams).some(param => param.length > 0)) {
      setIsLoading(true);
      const data = await fetchFixtures(searchParams);
      setFixtures(data);
      setIsLoading(false);
    } else {
      setFixtures([]);
    }
  };

  const fetchFixtures = async (params: Record<string, string>) => {
    try {
      const response = await axios.post<{ data: IData[] }>('/api/fixtures', params);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching fixtures:', error);
      return [];
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="flex gap-4">
        <input
          type="text"
          name="fixture_mid"
          value={searchParams.fixture_mid}
          onChange={handleInputChange}
          placeholder="Fixture ID"
          className="border p-2"
        />
        <input
          type="text"
          name="season"
          value={searchParams.season}
          onChange={handleInputChange}
          placeholder="Season"
          className="border p-2"
        />
        <input
          type="text"
          name="fixture_datetime"
          value={searchParams.fixture_datetime}
          onChange={handleInputChange}
          placeholder="Fixture DateTime"
          className="border p-2"
        />
        <input
          type="text"
          name="fixture_round"
          value={searchParams.fixture_round}
          onChange={handleInputChange}
          placeholder="Fixture Round"
          className="border p-2"
        />
        <input
          type="text"
          name="home_team"
          value={searchParams.home_team}
          onChange={handleInputChange}
          placeholder="Home Team"
          className="border p-2"
        />
        <input
          type="text"
          name="away_team"
          value={searchParams.away_team}
          onChange={handleInputChange}
          placeholder="Away Team"
          className="border p-2"
        />
      </div>

      <button onClick={handleSearch} className="mt-4 p-2 bg-blue-500 text-white">
        Search
      </button>

      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        <ul>
          {fixtures.length > 0 ? (
            fixtures.map((fixture) => (
              <li key={fixture.fixture_mid}>
                {fixture.home_team} vs {fixture.away_team} ({fixture.season})
              </li>
            ))
          ) : (
            <p>No matches found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchFixtures;
