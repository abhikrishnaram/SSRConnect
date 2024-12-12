import prisma from '@/lib/db/prisma';
import auth from '@auth';

export async function GET(req: Request) {
    const code = req?.url?.split('/').pop();

    if(!code)
        return new Response(JSON.stringify({ error: 'Team code is required' }), { status: 400 });

    const project = await prisma.project.findUnique({
        where: { code },
        include: { Team: { select: { mentor: true } } },
    }).then(r => r);

    const session = await auth();
    const user = session?.user;

    if(project && !project.isAccepted && user && (user?.isAdmin || user?.id === project?.Team?.mentor?.id)) {
        return prisma.project.delete({
            where: { code },
        }).then(r => {
            if(!r) return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 400 });
            else return new Response(JSON.stringify({ success: 'Project Deleted Successfully' }), { status: 200 });
        }).catch(e => {
            // console.error(e);
            return new Response(JSON.stringify({ error: 'Something went wrong', details: e }), { status: 400 });
        });
    }

    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
}