import { Response, Request } from 'express';
import { NOT_FOUND } from '../contants/error';
import { customError, ErrorResponse, SuccessResponse } from '../utils';

export interface SerializerRequest extends Request {
  file?: any;
  populate?: string[];
  select?: string[];
  transform?: any;
  payloadTransform?: any;
  queryTransform?: any;
  user?: any;
}
export abstract class BaseController {
  processor: any;
  constructor() {
    this.processor = this.getProcessor();
  }

  abstract getProcessor(): any;

  create = async (req: SerializerRequest, res: Response) => {
    let { body: payload } = req;
    try {
      const {
        payloadTransform = null,
        populate = null,
        select = null,
        transform = null,
      } = req;
      if (payloadTransform) {
        payload = payloadTransform(payload, req.user);
      }
      let record = await this.processor.create(payload);
      if (populate || select || transform) {
        record = await this.processor.find(
          { _id: record._id },
          populate,
          select
        );
        if (transform) {
          record = transform(record);
        }
      }
      SuccessResponse(res, record);
    } catch (error) {
      ErrorResponse(res, error);
    }
  };

  find = async (req: SerializerRequest, res: Response) => {
    let { query = {} } = req;
    const {
      populate = null,
      select = null,
      transform = null,
      queryTransform = null,
    } = req;
    try {
      if (queryTransform) {
        query = queryTransform(query, req.user);
      }
      let record = await this.processor.find(query, populate, select);
      if (transform) {
        record = transform(record);
      }
      SuccessResponse(res, record);
    } catch (error) {
      ErrorResponse(res, error);
    }
  };

  findOne = async (req: SerializerRequest, res: Response) => {
    const { id } = req.params;
    try {
      const { populate = null, select = null, transform = null } = req;
      let record = await this.processor.findOne({ _id: id }, populate, select);
      if (transform) {
        record = transform(record);
      }
      SuccessResponse(res, record);
    } catch (error) {
      ErrorResponse(res, error);
    }
  };

  update = async (req: SerializerRequest, res: Response) => {
    const { query } = req.body;
    let { payload } = req.body;
    try {
      const { payloadTransform = null } = req;
      if (payloadTransform) {
        payload = payloadTransform(payload, req.user);
      }
      await this.processor.update(query, payload);
      SuccessResponse(res);
    } catch (error) {
      ErrorResponse(res, error);
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const response = await this.processor.delete({ _id: id });
      if (!response.deletedCount) throw customError(NOT_FOUND);
      SuccessResponse(res, null, 204);
    } catch (error) {
      ErrorResponse(res, error);
    }
  };
}
