'use client'

import React, { useState } from 'react'
import Papa from 'papaparse'
import { IData } from '../../models/Data'

const FileLoader = () => {
  const [csvData, setCsvData] = useState<IData[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>)=>{
    const file = event.target.files?.[0];
    if(file){
        Papa.parse(file, {
            complete:(result) => {
                setCsvData(result.data as IData[])
            },
            header:true,
        })
    }
  }

  return (
    <>
        <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <table>
            <thead>
            <tr>
                <th>Fixture MID</th>
                <th>Season</th>
                <th>Fixture Date</th>
                <th>Fixture Round</th>
                <th>Home Team</th>
                <th>Away Team</th>
            </tr>
            </thead>
            <tbody>
            {csvData.map((row, index) => (
                <tr key={index}>
                <td>{row.fixture_mid}</td>
                <td>{row.season}</td>
                <td>{new Date(row.fixture_datetime).toLocaleString()}</td>
                <td>{row.fixture_round}</td>
                <td>{row.home_team}</td>
                <td>{row.away_team}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>   
    </>
  )
}

export default FileLoader
