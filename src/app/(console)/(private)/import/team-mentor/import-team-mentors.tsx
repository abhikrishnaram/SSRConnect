import React, { useState } from 'react';
import Papa from 'papaparse';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TeamImportResponse } from '@/types/response';

export default function TeamBulkImport({ onComplete }: { onComplete: (_: TeamImportResponse) => void }) {

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

  const processTeams = (data: any[]): any[] => {
    const teamMap = new Map<string, any>();

    data.slice(1).forEach(row => {
      const [teamId, teamMembers, rollNumber] = row;

      if(!teamId) return; // Skip empty rows

      // Create or update team entry
      if(!teamMap.has(teamId)) {
        teamMap.set(teamId, {
          code: teamId.replace(/[\s\-_]/g, ''),
          members: [],
        });
      }

      const team = teamMap.get(teamId);
      team.members.push({
        id: rollNumber,
        name: teamMembers,
      });
    });

    return Array.from(teamMap.values());
  };

  const handleImport = async () => {
    if(!file) {
      alert('Please select a file');
      // toast.error('Please select a file');
      return;
    }

    try {
      setIsLoading(true);

      // Parse CSV file
      const csvData = await parseCSV(file);

      // Process teams
      const teams = processTeams(csvData);

      // Send to API
      const response = await fetch('/api/import/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teams),
      });

      const result = await response.json();

      if(response.ok) {
        // toast.success(`Successfully imported ${result.teams.length} teams`);
        onComplete(result);
        // Optional: reset file input
        setFile(null);
      } else {
        alert(result.message || 'Failed to import teams');
        // toast.error(result.message || 'Failed to import teams');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('An unexpected error occurred');
      // toast.error('An unexpected error occurred');
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