import 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { init } from '../../utils';
import {
  connection,
  disconnect,
  getInMemoryDBUri,
} from '../../database/database.connection';
import { Example } from './example.entity';

chai.use(chaiHttp);
const app = init();

describe('Example API request', () => {
  let newlyCreatedRecord: any = null;
  before('before', async () => {
    const connectUri = await getInMemoryDBUri();
    await connection(`${connectUri}`);
    newlyCreatedRecord = await Example.create({
      name: 'Avinash',
      text: 'Some text',
    });
  });

  after('after', async () => {
    await Example.db.dropDatabase();
    await disconnect();
  });

  it('health api call', async () => {
    const res = await chai.request(app).get('/api/v1/health');
    expect(res.status).to.eql(200);
  });

  it('create new record', async () => {
    const res = await chai.request(app).post('/api/v1/example').send({
      name: 'Another',
      text: 'some-example',
    });
    expect(res.status).to.eql(200);
  });

  it('updates existing record', async () => {
    const res = await chai
      .request(app)
      .patch('/api/v1/example')
      .send({
        query: {
          _id: newlyCreatedRecord._id,
        },
        payload: {
          text: 'record-updated',
        },
      });
    expect(res.status).to.eql(200);
  });
  it('deletes existing record', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/example/${newlyCreatedRecord._id}`);
    expect(res.status).to.eql(204);
  });
});
