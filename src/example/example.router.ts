import { Router } from 'express';
// import { isAuthenticated } from '../../middlewares/auth.middleware';
import { Serialize } from '../../middlewares/serializer.middleware';
import { Validate } from '../../middlewares/validations.middleware';
import { idValidator } from '../../validations';
import { FeedbackController } from './example.controller';
import {
  createExampleSerializer,
  listExampleSerializer,
} from './example.serializer';
import {
  createExampleValidation,
  updateExampleValidation,
} from './example.validation';

const ExampleRouter = Router();
const Controller = new FeedbackController();

ExampleRouter.post(
  '/',
  Validate({ b: createExampleValidation }),
  Serialize(createExampleSerializer),
  Controller.create
);

ExampleRouter.patch(
  '/',
  Validate({ b: updateExampleValidation }),
  Controller.update
);

ExampleRouter.get('/', Serialize(listExampleSerializer), Controller.find);

ExampleRouter.delete(
  '/:id',
  // isAuthenticated,
  Validate({ p: idValidator }),
  Controller.delete
);

export { ExampleRouter };
