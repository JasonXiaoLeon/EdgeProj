'use client'

import React, { useState } from 'react'
import Papa from 'papaparse'

const FileUploadToDatabase = () => {
  const [csvFile, setCsvFile] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setCsvFile(null)
      parseCSV(file)
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvData = e.target?.result;
      if (csvData) {
        try {
          Papa.parse(csvData as string, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (result) => {
              const parsedData = result.data as any[];
              setCsvFile(parsedData);
            },
          });
        } catch (error) {
          console.error('Error parsing CSV:', error);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleFileParse = async () => {
    if (csvFile && csvFile.length > 0) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: csvFile }),
        });

        if (response.ok) {
          alert('File uploaded successfully');
        } else {
          alert('Failed to upload file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept='.csv'
        onChange={handleFileUpload}
      />
      <button onClick={handleFileParse} disabled={isLoading}>
        {isLoading ? '上传中...' : 'Upload file to DB'}
      </button>
    </div>
  );
}

export default FileUploadToDatabase;
