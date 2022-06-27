import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { addBearerTokenToHeader } from '../../../test/utils/auth.util';
import { VideoTypes } from '../../entities/video-types.entity';
import { Videos } from '../../entities/videos.entity';
import { VideoTypeKey } from '../../enums/video-type-key.enum';

export const createVideosType = async (con: Connection) => {
  if (!con.isConnected) throw new Error('Connection is not connected');

  await Promise.all(
    Object.values(VideoTypeKey).map((item) =>
      con.getRepository(VideoTypes).save({
        key: item,
        desc: 'description',
      }),
    ),
  );
};

export const createTestVideo = async (
  app: INestApplication,
  youtubeUrl: string,
  levelKey: string,
  topicKeys: string[],
) => {
  const { body } = await addBearerTokenToHeader(
    request(app.getHttpServer()).post('/admin/videos'),
  )
    .send({
      videoUrl: youtubeUrl,
      name: 'test',
      desc: 'test',
      levelKey,
      topicKeys,
      transcripts: [
        {
          highlightWords: ['1-byte character code'],
          duration: 2000,
          offset: 2000,
          text: 'word 1 2 3 4',
        },
        {
          highlightWords: ['A-D'],
          duration: 2000,
          offset: 2000,
          text: '5 6 7 8 olala loa loa',
        },
      ],
    })
    .expect(201);

  return body as Videos;
};
