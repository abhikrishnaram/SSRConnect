import React, { useState } from 'react';
import Papa from 'papaparse';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TeamImportResponse } from '@/types/response';

export default function TeamMentorsBulkImport({ onComplete }: { onComplete: (_: TeamImportResponse) => void }) {

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if(selectedFile) {
      // Validate file type
      if(
        selectedFile.type !== 'text/csv' &&
                selectedFile.name.split('.').pop()?.toLowerCase() !== 'csv'
      ) {
        alert('Please upload a CSV file');
        // toast.error('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
    }
  };

  const parseCSV = (file: File) => {
    return new Promise<any[]>((resolve, _) => {
      Papa.parse(file, {
        complete: (results) => {
          resolve(results.data);
        },
        header: false,
        skipEmptyLines: true,
      });
    });
  };

  const processMentors = (data) => {
    const teamsWithMentors = [];
    data.forEach((row, index) => {
      // Skip the header row
      if (index === 0) {
          return;
      }

      // Ensure each team has only one mentor (teamID -> mentorEmail mapping)
      if (row.length === 2) {
        teamsWithMentors.push({
          teamID: row[0].replace(/[\s\-_]/g, ''),
          email: row[1]
        });
      }
    });
    console.log(teamsWithMentors, 'asjkdhgk');
    return teamsWithMentors;
  };

  const handleImport = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      setIsLoading(true);

      // Parse CSV file
      const csvData = await parseCSV(file);
      // Process the CSV data to map each teamID to a mentor
      const teamsWithMentors = processMentors(csvData);
      console.log(teamsWithMentors);
      // Send to API
      const response = await fetch('/api/import/teams-mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamsWithMentors),
      });

      const result = await response.json();

      if (response.ok) {
        // Successfully imported teams with mentors
        onComplete(result);
        // Optional: reset file input
        setFile(null);
      } else {
        alert(result.message || 'Failed to import mentors to teams');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  return (
      <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-md">
          <div className="mb-4">
              <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="mb-2"
              />
              {file && (
              <p className="text-sm text-gray-600">
                  Selected file: 
                  {' '}
                  {file.name}
              </p>
              )}
          </div>

          <Button
              onClick={handleImport}
              disabled={!file || isLoading}
              className="w-full"
          >
              {isLoading ? 'Importing...' : 'Import Teams'}
          </Button>
      </div>
  );
}