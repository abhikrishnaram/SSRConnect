import MentorDashboardView from '@/app/(console)/(private)/dashboard/_mentor/view';
import prisma from '@/lib/db/prisma';
import auth from '@auth';

const getDashboardData = async () => {
    const session = await auth();
    const user = session?.user;
    if(!user?.isStaff) return { error: 'Unauthorized', status: 401 };


    // Check if team exists
    const data = await prisma.project.findMany({
        where: {
            isAccepted: false,
            Team: { mentorId: user?.id }
        },
        include: {
            Team: {
                include: {
                    mentor: true,
                }
            },
            theme: true,
        },
    });

    const totalProjects = await prisma.project.count();

    const totalMyProjects = await prisma.project.findMany({
        select: {
            code: true,
            isAccepted: true,
        },
        where: {
            Team: { mentorId: user?.id }
        },
    });

    const pendingProjects = totalMyProjects.filter((project) => !project.isAccepted);
    const completedProjects = totalMyProjects.filter((project) => project.isAccepted);

    return {
        projects: data,

        totalProjects: totalProjects,
        totalMyProjects: totalMyProjects.length,
        pendingMyProjects: pendingProjects.length,
        completedProjects: completedProjects.length,
    };
};

const MentorDashboard = async () => {

    const data = await getDashboardData();

    return (
        <div className="mx-auto container">
            <MentorDashboardView
                data={data?.projects}
                stats={{
                    totalProjects: data?.totalProjects,
                    totalMyProjects: data?.totalMyProjects,
                    pendingMyProjects: data?.pendingMyProjects,
                    completedMyProjects: data?.completedProjects,
                }}
            />
        </div>
    );
};

export default MentorDashboard;