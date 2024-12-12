import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { DownloadIcon, ExternalLinkIcon, Share2Icon } from 'lucide-react';
import React from 'react';

import TeamSidebar from './team';

// import PDFViewer from '@/components/pdf-viewer';
import Button from '@/components/button';

const ProposalPage = ({ params }) => {

  const role = 'ADMIN';

  const proposal = {
    id: params.id,
    title: 'Food Waste Reduction Initiative',
    description: 'This proposal outlines a social initiative aimed at reducing food waste in our community by connecting food providers with food banks and shelters.',
    content: '# Food Waste Reduction Initiative\n This proposal aims to address the issue of food waste in our community. By creating a platform that connects restaurants, grocery stores, and households with excess food to food banks and shelters, we can significantly reduce the amount of food that goes to waste while also helping to alleviate hunger.',
    attachment: 'proposal/attachment/proposal.pdf',
    link: 'https://www.example.com/proposal',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    state: 'IN_PROGRESS',
    remarks: null,
    remark_updated_at: null,
    team: {
      id: 1,
      teamID: '21AM2021',
      mentor: {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com',
        uid: 'M123',
        avatarURL: 'https://i.pravatar.cc/300',
        avatarID: null,
      },
      members: [
        {
          id: 1,
          name: 'Member 1',
          email: 'member1@example.com',
          uid: 'M1234567A',
          avatarURL: 'https://i.pravatar.cc/300',
          avatarID: null,
        },
        {
          id: 2,
          name: 'Member 2',
          email: 'member2@example.com',
          uid: 'M2345678B',
          avatarURL: 'https://i.pravatar.cc/300',
          avatarID: null,
        },
      ],

    },
  };

  return (
      <div className="p-5 flex-grow flex flex-col gap-4">
          <div className="bg-white rounded-lg pt-16 pb-4 px-4">
              <div className="relative">
                  <div className="flex gap-2 justify-center items-center mb-4">
                      <div className="text-center text-gray-400 text-xs">
                          Submitted 
                          {' '}
                          {format(new Date(proposal.created_at), 'do LLLL, Y')}
                      </div>
                      <div
                          className="border-r border-gray-200 h-3"
                      />
                      <div className="flex justify-center items-center text-xs text-gray-400">
                          Proposal #
                          {proposal.id}
                      </div>
                  </div>
                  <div className="text-center text-3xl font-bold mb-2">{proposal.title}</div>
                  <div className="text-center text-sm max-w-[600px] mx-auto mb-8">{proposal.description}</div>
                  {['MENTOR', 'ADMIN'].includes(role) && proposal.state === 'IN_PROGRESS' && (
                  <div className="flex gap-2 absolute right-4 top-0 bottom-0 flex-col">
                      <Button className="w-36 h-12 text-white font-semibold bg-success/80 hover:bg-success">Accept</Button>
                      <Button className="w-36 h-12 text-white font-semibold  bg-danger hover:bg-red-600">Reject</Button>
                  </div>
                  )}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-8">
                  <div className="col-span-3">
                      <div className="mb-4 flex justify-between items-center">
                          <Link
                              download
                              href={proposal.attachment}
                              className="bg-slate-100 hover:bg-slate-200 font-bold p-4 text-primary rounded-lg inline-flex items-center gap-4"
                          >
                              <Image src="/assets/PDF_file.svg" alt="PDF icon" width={30} height={30} />
                              <div className="flex gap-2">
                                  Download PDF
                                  <DownloadIcon size={20} />
                              </div>
                          </Link>
                          <div className="flex gap-2">
                              <button className="text-primary bg-slate-100 hover:bg-slate-200 h-12 w-12 flex items-center justify-center rounded-lg">
                                  <Share2Icon />
                              </button>
                              <Link
                                  target="_blank"
                                  href={proposal.link}
                                  className="text-primary bg-slate-100 hover:bg-slate-200 h-12 w-12 flex items-center justify-center rounded-lg mr-4"
                              >
                                  <ExternalLinkIcon />
                              </Link>
                          </div>
                      </div>
                      {/*<PDFViewer />*/}
                  </div>
                  <div className="col-span-1 h-auto">
                      <div className="flex">
                          {/*<Link*/}
                          {/*    target="_blank"*/}
                          {/*    href={proposal.attachment}*/}
                          {/*    className="bg-slate-50 hover:bg-blue-100 font-bold p-4 text-primary rounded inline-flex items-center gap-4"*/}
                          {/*>*/}
                          {/*    <Image src="/assets/PDF_file.svg" alt="PDF icon" width={30} height={30} />*/}
                          {/*    <div className="flex gap-2">*/}
                          {/*        Open PDF*/}
                          {/*        <ExternalLinkIcon size={20} />*/}
                          {/*    </div>*/}
                          {/*</Link>*/}
                      </div>
                      {/* @ts-ignore */}
                      <TeamSidebar team={proposal.team} />
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ProposalPage;