import { ErrorResponse } from '../utils';

export type SerializerType = {
  populate?: string[];
  select?: string[];
  transform?: (payload: any) => any;
  payloadTransform?: (payload: any, tokenPayload: any) => any;
  queryTransform?: (query: any, tokenPayload?: any | null) => any;
};

export const Serialize =
  (serializer: SerializerType) => async (req: any, res: any, next: any) => {
    try {
      const { populate, select, transform, payloadTransform, queryTransform } =
        serializer;
      req['populate'] = populate;
      req['select'] = select;
      req['transform'] = transform;
      req['payloadTransform'] = payloadTransform;
      req['queryTransform'] = queryTransform;
      await next();
    } catch (error) {
      ErrorResponse(res, error);
    }
  };
