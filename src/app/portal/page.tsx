import Link from 'next/link';

import Logo from '@/components/Logo';
import { Card } from '@/components/ui/card';


const PortalPage = () => {
  // Mocked data for demonstration
  const data = {
    isLoggedIn: false,
    showProposalSubmission: false,
    showProjectSubmission: true,
  };

  return (
      <div className="min-h-screen w-screen bg-gray-50">
          <header className="fixed top-4 left-4 flex items-center gap-2 w-max">
              <Logo />
          </header>

          <main className="grid md:grid-cols-2 gap-8 px-8 py-16 h-full min-h-screen">
              <div className="space-y-6 flex items-center justify-center border-r">
                  <section>
                      <h2 className="text-2xl text-center text-gray-800 opacity-60 mb-6">Students Corner</h2>
                      <div className="flex gap-4">
                          {data.showProposalSubmission && (
                              <Link href="/proposal-submission" prefetch={false}>
                                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer rounded">
                                      <h3 className="text-xl font-semibold text-primary">Proposal Submission</h3>
                                      <p className="text-gray-500">Submit your project proposal for approval.</p>
                                  </Card>
                              </Link>
                          )}
                          {data.showProjectSubmission && (
                              <Link href="/project-submission" prefetch={false}>
                                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer rounded">
                                      <h3 className="text-xl font-semibold text-primary">Project Submission</h3>
                                      <p className="text-gray-500">Upload and share your completed project.</p>
                                  </Card>
                              </Link>
                          )}
                          {!data.showProposalSubmission && !data.showProjectSubmission && (
                              <Card className="p-6 bg-red-50">
                                  <h3 className="text-lg font-semibold text-red-600">Submissions Closed</h3>
                                  <p className="text-gray-500">Submissions are currently not available. Please contact your mentor for further assistance.</p>
                              </Card>
                          )}
                      </div>
                  </section>
              </div>

              {/* Right Section */}
              <div className="space-y-6 justify-center items-center flex">
                  <section>
                      <h2 className="text-2xl text-center text-gray-800 opacity-60 mb-6">Mentors Corner</h2>
                      <div className="flex gap-4">
                          {data.isLoggedIn ? (
                              <Link href="/dashboard" prefetch={false}>
                                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer rounded">
                                      <h3 className="text-xl font-semibold text-primary">Dashboard</h3>
                                      <p className="text-gray-500">View and manage project submissions by students.</p>
                                  </Card>
                              </Link>
                          ) : (
                              <Link href="/auth/signin" prefetch={false}>
                                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer rounded">
                                      <h3 className="text-lg font-semibold text-primary">Login</h3>
                                      <p className="text-gray-500">Please login to access the mentor's corner.</p>
                                  </Card>
                              </Link>
                          )}
                      </div>
                  </section>
              </div>
          </main>

          <footer className="fixed bottom-4 w-full text-center text-sm text-gray-500">
              © 
              {' '}
              {new Date().getFullYear()}
              {' '}
              SSRConnect. All Rights Reserved.
          </footer>
      </div>
  );
};

export default PortalPage;
