import request from 'supertest';
import { addBearerTokenToHeader } from '../../test/utils/auth.util';

describe('File Module', () => {
  describe('feature create presigned url', () => {
    it('should return 500 if provide invalid file type', async () => {
      return addBearerTokenToHeader(
        request(app.getHttpServer()).post(`/file/presigned-url`),
      )
        .send({ type: 'invalid' })
        .expect(500);
    });
  });
});
