import { getProject } from '@/lib/actions/projectActions';
import ProjectPage from '@/components/must-have/ProjectPage';
import AppView from '@/app/(landing)/_appview';

const ProjectSlugPage = async ({ params }: { params: { slug: string } }) => {

  const project = await getProject(params.slug);

  return <AppView scrollEffect={false} variant="line"><ProjectPage project={project} /></AppView>;
};

export default ProjectSlugPage;