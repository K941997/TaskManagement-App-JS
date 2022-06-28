import request from 'supertest';
import { addBearerTokenToHeader } from '../../test/utils/auth.util';
import {
  createDefaultLevelAndTopics,
  createDefaultLevel_Topics_VideoTypes,
} from '../../test/utils/helper.util';
import {} from '../../user/__test__/utils/helper.utils';
import { VideoTypeKey } from '../enums/video-type-key.enum';
import { getVideoYoutubeId } from '../utils/helper.util';
import { createTestVideo } from './utils/videos-admin.util';

describe('Videos Admin Module', () => {
  describe('feature get and search videos list', () => {
    it.each`
      page         | limit        | search       | status | boolean
      ${undefined} | ${undefined} | ${undefined} | ${400} | ${false}
      ${1}         | ${10}        | ${'search'}  | ${400} | ${false}
      ${-1}        | ${10}        | ${'search'}  | ${400} | ${true}
      ${1}         | ${-10}       | ${'search'}  | ${400} | ${true}
    `(
      'get videos list with page: $page, limit: $limit, search: $search, expect: $boolean $status',
      async ({ page, limit, search, status, boolean }) => {
        const res = await addBearerTokenToHeader(
          request(app.getHttpServer()).get('/admin/videos'),
        )
          .query({ page, limit, search })
          .send();

        if (boolean) expect(res.status).toBe(status);
        else expect(res.status).not.toBe(status);
      },
    );
  });

  describe('feature transcript', () => {
    it('should return 200 and get transcript success if provide valid youtube url', async () => {
      const { body } = await addBearerTokenToHeader(
        request(app.getHttpServer()).get(`/admin/videos/transcript`),
      )
        .query({ url: youtubeUrl, videoType: VideoTypeKey.YOUTUBE })
        .send()
        .expect(200);
      expect(body?.length).toBeGreaterThan(0);
    });

    it('should return 400 if not provide youtube url', async () => {
      return addBearerTokenToHeader(
        request(app.getHttpServer()).get(`/admin/videos/transcript`),
      )
        .send()
        .expect(400);
    });

    it('should return 422 if provide invalid youtube url', async () => {
      return addBearerTokenToHeader(
        request(app.getHttpServer()).get(`/admin/videos/transcript`),
      )
        .query({
          url: `${wrongYoutubeUrl}`,
          videoType: VideoTypeKey.YOUTUBE,
        })
        .send()
        .expect(422);
    });
  });

  describe('feature create video', () => {
    it.each`
      videoUrl      | name         | desc         | levelKey        | topicKeys        | transcripts     | status | boolean
      ${youtubeUrl} | ${'test'}    | ${'test'}    | ${testLevelKey} | ${testTopicKeys} | ${[transcript]} | ${400} | ${false}
      ${undefined}  | ${'test'}    | ${'test'}    | ${testLevelKey} | ${testTopicKeys} | ${[transcript]} | ${400} | ${true}
      ${youtubeUrl} | ${undefined} | ${'test'}    | ${testLevelKey} | ${testTopicKeys} | ${[transcript]} | ${400} | ${true}
      ${youtubeUrl} | ${'test'}    | ${undefined} | ${testLevelKey} | ${testTopicKeys} | ${[transcript]} | ${400} | ${true}
      ${youtubeUrl} | ${'test'}    | ${'test'}    | ${undefined}    | ${testTopicKeys} | ${[transcript]} | ${400} | ${true}
      ${youtubeUrl} | ${'test'}    | ${'test'}    | ${testLevelKey} | ${undefined}     | ${[transcript]} | ${400} | ${true}
      ${youtubeUrl} | ${'test'}    | ${'test'}    | ${testLevelKey} | ${testTopicKeys} | ${undefined}    | ${400} | ${true}
    `(
      'create video with videoUrl: $videoUrl, name: $name, desc: $desc, levelKey: $levelKey, topicKeys: $topicKeys, transcripts: $transcripts, status: $status, boolean: $boolean',
      async ({
        videoUrl,
        name,
        desc,
        levelKey,
        topicKeys,
        transcripts,
        status,
        boolean,
      }) => {
        await createDefaultLevelAndTopics(app);
        const res = await addBearerTokenToHeader(
          request(app.getHttpServer()).post('/admin/videos'),
        ).send({
          videoUrl,
          name,
          desc,
          levelKey,
          topicKeys,
          transcripts,
          status,
          boolean,
        });
        if (boolean) return expect(res.status).toBe(status);
        return expect(res.status).not.toBe(status);
      },
    );

    it('should create video success if provide valid input ', async () => {
      await createDefaultLevel_Topics_VideoTypes(app);
      const video = await createTestVideo(
        app,
        youtubeUrl,
        testLevelKey,
        testTopicKeys,
      );
      expect(video.videoCode).toBe(getVideoYoutubeId(youtubeUrl));
    });
  });
});
