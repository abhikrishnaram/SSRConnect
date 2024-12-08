'use client';
import React from 'react';
import { CheckCircle2Icon } from 'lucide-react';
import { toast } from 'react-toastify';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const AcceptButton = ({ team }) => {
  
  const [isOpen, setIsOpen] = React.useState(false);
  const handleApproval = () => {
    fetch(`/api/approve/${team.code}`).then((res) => {
      if(res.ok) toast('Project Approved');
      else {
        console.error(res.json());
        toast('Something went wrong');
      }
    });
    setIsOpen(false);
  };
  
  return (
      <>
          <Button onClick={() => setIsOpen(true)} variant="default" className="h-full bg-primary rounded-lg p-4 flex items-center justify-center gap-4 max-w-[240px] w-full">
              <div className="text-white font-bold text-center text-2xl flex gap-2 items-center">
                  Approve
                  <CheckCircle2Icon />
              </div>
          </Button>
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Confirm Project Approval</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                      <p>Are you sure you want to approve the submission of this project?</p>
                      <p className="text-sm text-gray-500 mt-2">
                          This action cannot be undone. Please verify all your information before confirming.
                      </p>
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
                          onClick={() => setIsOpen(false)}
                      >
                          Cancel
                      </Button>
                      <Button
                          onClick={() => handleApproval()}
                      >
                          Approve Submission
                      </Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
      </>
  );
};

export default AcceptButton;