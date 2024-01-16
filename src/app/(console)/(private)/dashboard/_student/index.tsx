'use client';

import NoTeam from './no-team';
import TeamDetails from './team-details';
import ProposalSubmission from './proposal-submission';
import ProposalAccepted from './proposal-accepted';

import { TEAM_STATUS } from '@/app/(console)/types';

const StudentDashboard = () => {
  
  const team:any = null;
  // const [proposals, setProposals] = useState([]);
  //
  // useEffect(() => {
  //   const fetchedProposals = [
  //
  //   ];
  //   setProposals(fetchedProposals);
  // }, []);

  const renderState = () => {
    switch (team?.stats?.status) {
      case TEAM_STATUS.PROPOSAL_SUBMISSION:
        return <ProposalSubmission team={team} />;
      case TEAM_STATUS.PROPOSAL_ACCEPTED:
        return <ProposalAccepted team={team} />;
      default:
        return (
            <div>
                Team Status:
                {team?.stats?.status}
            </div>
        );
    }
  };
  
  return (
      <div className="p-5 flex-grow flex flex-col gap-4">
          {team ?
              <div className="grid grid-cols-3 gap-4 flex-grow">
                  <div className="col-span-2 w-full h-full bg-white rounded-xl">
                      {renderState()}
                  </div>
                  <TeamDetails team={team} />
              </div>
            : <NoTeam />}
      </div>
  );
};

export default StudentDashboard;