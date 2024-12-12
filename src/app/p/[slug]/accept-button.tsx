'use client';
import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { toast } from 'react-toastify';
import {CloseFilledIcon} from '@nextui-org/shared-icons';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AcceptButton = ({ team }) => {
  
  const [isOpen, setIsOpen] = React.useState<0|1|2>(0);
  const handleApproval = () => {
    fetch(`/api/approve/${team.code}`).then((res) => {
      if(res.ok) toast('Project Approved');
      else {
        console.error(res.json());
        toast('Something went wrong');
      }
    });
    setIsOpen(0);
  };
  
  const handleDecline = () => {
    fetch(`/api/reject/${team.code}`).then((res) => {
      if(res.ok) toast('Project Rejected');
      else {
        console.error(res.json());
        toast('Something went wrong');
      }
    });
    setIsOpen(0);
  };
  
  return (
      <>
          <div className="flex gap-2">
              <Button onClick={() => setIsOpen(1)} variant="default" className="h-full bg-red-200 hover:bg-red-500 text-red-400 hover:text-white rounded-lg p-4 flex items-center justify-center gap-4 max-w-[240px] w-full">
                  <div className="font-bold text-center text-2xl flex gap-2 items-center">
                      Decline
                      <CloseFilledIcon />
                  </div>
              </Button>
              <Button onClick={() => setIsOpen(2)} variant="default" className="h-full bg-primary rounded-lg p-4 flex items-center justify-center gap-4 max-w-[240px] w-full">
                  <div className="text-white font-bold text-center text-2xl flex gap-2 items-center">
                      Approve
                      <CheckCircle2Icon />
                  </div>
              </Button>
          </div>
          <Dialog open={isOpen !== 0} onOpenChange={() => setIsOpen(0)}>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle className={isOpen === 1 ? 'text-red-500' : 'text-primary'}>
                          {isOpen === 2 ? 'Confirm Project Approval' : 'Confirm Project Rejection'}
                      </DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                      <p>
                          Are you sure you want to
                          {isOpen === 2 ? ' approve ' : ' reject '}
                          the submission of this project?
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                          This action cannot be undone. Please verify all your information before confirming.
                      </p>
                      {isOpen === 1 && (
                      <p className="text-sm text-red-500 mt-2 font-semibold opacity-60">
                          This action will delete the project from the system. 
                          {' '}
                          <br />
                          {' '}
                          The team will have to resubmit their project.
                      </p>
                      )}
                  </div>
                  <div>
                      <div className="text-lg font-bold">Team ID:</div>
                      <div className="text-gray-700">{team?.code}</div>
                  </div>
                  {team?.members && (
                  <div>
                      <div className="text-lg font-bold">Members:</div>
                      <div className="text-gray-700">
                          {team?.members.map((member, index) => (
                              <div key={index}>{member.name}</div>
                          ))}
                      </div>
                  </div>
                  )}
                  <DialogFooter>
                      <Button
                          variant="outline"
                          onClick={() => setIsOpen(0)}
                      >
                          Cancel
                      </Button>
                      {isOpen === 1 ? (
                          <Button
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => handleDecline()}
                          >
                              Reject Submission
                          </Button>
                        ) : (
                            <Button onClick={() => handleApproval()}>
                                Approve Submission
                            </Button>
                        )}
                  </DialogFooter>
              </DialogContent>
          </Dialog>
      </>
  );
};

export default AcceptButton;