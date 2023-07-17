import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { audioFileValidationSchema } from 'validationSchema/audio-files';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAudioFiles();
    case 'POST':
      return createAudioFile();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAudioFiles() {
    const data = await prisma.audio_file
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'audio_file'));
    return res.status(200).json(data);
  }

  async function createAudioFile() {
    await audioFileValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.audio_file.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
