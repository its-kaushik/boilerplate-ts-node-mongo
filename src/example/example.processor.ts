import { BaseProcessor } from '../../common/base.processor';
import { Example } from './example.entity';

export class FeedbackProcessor extends BaseProcessor {
  getEntity() {
    return Example;
  }
}
