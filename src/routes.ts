import { Router, Request, Response } from 'express';
import { ExampleRouter } from './modules/example/example.router';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.json({ success: true });
});

router.use('/example', ExampleRouter);

export default router;
