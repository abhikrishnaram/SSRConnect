import React from 'react';

import SuccessLottie from '@/lottie/success';
import { TeamImportResponse } from '@/types/response';
import Button from '@/components/button';

const SuccessCard = ({ completionDetails }: { completionDetails: TeamImportResponse }) => {
  return (
      <>
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg border shadow-md">
              <div className="flex flex-col items-center">
                  <SuccessLottie className="!w-56 !h-56 mb-4" />
                  <div className="text-green-500 font-bold text-xl">Import Completed Successfully!</div>
                  <div className="text-gray-600 text-center mt-2">
                      <p>Your team import process is complete. Here are the details:</p>
                  </div>
              </div>
              <div className="mt-4 border-t pt-4 max-h-[200px] overflow-auto">
                  <div className="text-gray-700 font-semibold">Response Stats</div>
                  <ul className="mt-2 space-y-2">
                      <li>
                          <span className="font-medium text-gray-600">New Teams Imported: </span>
                          <span className="text-green-600">{completionDetails?.imported}</span>
                      </li>
                      <li>
                          <span className="font-medium text-gray-600">Existing Teams Skipped: </span>
                          <span className="text-yellow-500">{completionDetails?.existing}</span>
                      </li>
                      {completionDetails?.importedTeams?.length > 0 && (
                      <li>
                          <span className="font-medium text-gray-600">Imported Teams: </span>
                          <ul className="list-disc list-inside text-gray-500">
                              {completionDetails.importedTeams.map((team, index) => (
                                  <li key={index}>{team?.code}</li>
                              ))}
                          </ul>
                      </li>
                      )}
                      {completionDetails?.existingTeams?.length > 0 && (
                      <li>
                          <span className="font-medium text-gray-600">Existing Teams: </span>
                          <ul className="list-disc list-inside text-gray-500">
                              {completionDetails.existingTeams.map((team, index) => (
                                  <li key={index}>{team?.code}</li>
                              ))}
                          </ul>
                      </li>
                      )}
                  </ul>
              </div>
          </div>
          <div className="mt-4">
              <Button link="/dashboard" variant="primary">
                  Go to Dashboard
              </Button>
          </div>
      </>
  );
};

export default SuccessCard;
