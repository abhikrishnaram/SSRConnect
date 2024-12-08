import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TProject } from '@/types/project';
import Button from '@/components/button';

const ProjectDetails = ({ project }: { project: TProject | null }) => {

  if(!project) {
    return (
        <Card className="w-full p-6 flex items-center justify-center text-gray-500">
            <p className="text-center">No project selected. Please select a project to view its details.</p>
        </Card>
    );
  }

  const { code, name, theme, meta, isAccepted } = project;

  return (
      <Card className="w-full p-6">
          <CardHeader>
              <Button variant="primary" className="font-semibold" link={`/p/${code}`}>
                  View Project
              </Button>
              {/*<Button>*/}
              {/*    Edit Project*/}
              {/*</Button>*/}
              {/*<Button>*/}
              {/*    Start Review*/}
              {/*</Button>*/}
              <CardTitle className="text-primary text-xl font-semibold pt-6">Project Preview</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-4">
                  <p>
                      <strong>Title:</strong>
                      {' '}
                      {name}
                  </p>
                  <p>
                      <strong>Team Code:</strong>
                      {' '}
                      {code}
                  </p>
                  <div>
                      {isAccepted ? (
                          <span className="text-green-600">Project Published</span>
                      ) : (
                          <span className="text-red-600">Pending Review</span>
                      )}
                  </div>
                  <hr />
                  <p>
                      <strong>Category:</strong>
                      {' '}
                      {theme?.name || meta?.category || 'Nil'}
                  </p>
                  <div>
                      <strong>Location:</strong>
                      <ul className="list-disc pl-6">
                          <li>
                              <strong>Type:</strong>
                              {' '}
                              {meta?.location?.type}
                          </li>
                          <li>
                              <strong>Location:</strong>
                              {' '}
                              {meta?.location?.location}
                          </li>
                          <li>
                              <strong>City:</strong>
                              {' '}
                              {meta?.location?.city}
                          </li>
                          <li>
                              <strong>State:</strong>
                              {' '}
                              {meta?.location?.state}
                          </li>
                      </ul>
                  </div>
                  <div>
                      <strong>Files:</strong>
                      <ul className="list-disc pl-6 space-y-1">
                          {project?.report && (
                              <li>
                                  <a
                                      href={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + project?.report}
                                      target="_blank"
                                      className="text-blue-600 hover:underline"
                                  >
                                      Report
                                  </a>
                              </li>
                          )}
                          {project?.presentation && (
                              <li>
                                  <a
                                      href={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + project?.presentation}
                                      target="_blank"
                                      className="text-blue-600 hover:underline"
                                  >
                                      Presentation
                                  </a>
                              </li>
                          )}
                          {project?.poster && (
                              <li>
                                  <a
                                      href={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + project?.poster}
                                      target="_blank"
                                      className="text-blue-600 hover:underline"
                                  >
                                      Poster
                                  </a>
                              </li>
                          )}
                          {project?.video && (
                              <li>
                                  <a
                                      href={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + project?.video}
                                      target="_blank"
                                      className="text-blue-600 hover:underline"
                                  >
                                      Video
                                  </a>
                              </li>
                          )}
                      </ul>
                  </div>
                  {project?.gallery?.length ? (
                      <div>
                          <strong>Gallery:</strong>
                          <ul className="list-disc pl-6 space-y-1">
                              {project?.gallery.map((photo, index) => (
                                  <li key={index}>
                                      <a
                                          key={index}
                                          href={process.env.NEXT_PUBLIC_CF_R2_ENDPOINT + '/' + photo}
                                          target="_blank"
                                          className="text-blue-600 hover:underline"
                                      >
                                          {'photo-' + (index + 1)}
                                      </a>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ) : null}
              </div>
          </CardContent>
      </Card>
  )
  ;
};

export default ProjectDetails;