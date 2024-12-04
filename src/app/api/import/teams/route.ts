import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Prisma client instance
const prisma = new PrismaClient();

// Validation schema for team import
const TeamImportSchema = z.object({
  code: z.string().min(1, 'Team code is required'),
  mentorId: z.string().optional(),
  members: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).min(1, 'At least one member is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const teams = z.array(TeamImportSchema).parse(body);

    // Start a transaction to ensure data integrity
    const importResult = await prisma.$transaction(async (tx) => {
      const importedTeams = [];
      const existingTeams = [];

      for(const teamData of teams) {
        // Check if team already exists
        const existingTeam = await tx.team.findUnique({
          where: { code: teamData.code },
        });

        if(existingTeam) {
          existingTeams.push({
            code: teamData.code,
            reason: 'Team already exists',
          });
        } else {
          // Create team only if it doesn't exist
          const newTeam = await tx.team.create({
            data: {
              code: teamData.code,
              members: teamData.members as any, // Using JSON type
            },
          });

          importedTeams.push(newTeam);
        }
      }

      return { importedTeams, existingTeams };
    });

    return new Response(JSON.stringify({
      message: 'Team import process completed',
      imported: importResult.importedTeams.length,
      existing: importResult.existingTeams.length,
      importedTeams: importResult.importedTeams,
      existingTeams: importResult.existingTeams,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Team import error:', error);

    // Handle different types of errors
    if(error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        message: 'Validation Error',
        errors: error.errors,
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if(error instanceof Error) {
      return new Response(JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      message: 'Unknown Error',
      error: String(error),
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}