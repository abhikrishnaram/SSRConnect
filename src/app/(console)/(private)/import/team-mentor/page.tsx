'use client';
import React, { useState } from 'react';

import TeamBulkImport from '@/app/(console)/(private)/import/team/import-team';
import SuccessCard from '@/app/(console)/(private)/import/team/success-card';
import { TeamImportResponse } from '@/types/response';


const ImportTeamMentor = () => {

  const [completionDetails, setCompletionDetails] = useState<TeamImportResponse | null>(null);

  return (
      <div className="my-5 p-4 bg-white rounded-lg shadow-xl shadow-gray-200 min-h-[36rem] w-full mx-auto container">
          <div className="border border-dashed border-gray-400 h-full rounded-lg flex items-center justify-center">
              <div className="text-center flex flex-col items-center justify-center my-12">
                  <div className="text-primary text-2xl font-bold mb-4">
                      Import Mentors to Teams
                  </div>
                  <div>
                      {!completionDetails ? (
                          <TeamBulkImport
                              onComplete={(res) => setCompletionDetails(res)}
                          />
                      ) : (
                          <SuccessCard
                              completionDetails={completionDetails}
                          />
                      )}
                  </div>
                  <div className="text-sm mt-6 max-w-[340px]">
                      <div className="mt-4 text-sm text-gray-600 text-left mb-6">
                          <h3 className="font-semibold">File Format Requirements:</h3>
                          <ul className="list-disc list-inside">
                              <li>Must be a CSV file</li>
                              <li>Columns: TeamID, MentorEmail</li>
                              <li>First row will be treated as header</li>
                          </ul>
                      </div>

                      <div className="mt-2 text-sm text-gray-500 text-left">
                          CSV File Example:
                          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                              {`TeamID,MentorEmail
SSR24001,john@am.amrita.edu
SSR24002,jane@am.amrita.edu`}
                          </pre>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ImportTeamMentor;