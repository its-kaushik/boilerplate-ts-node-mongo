import { SerializerType } from '../../middlewares/serializer.middleware';

export const createExampleSerializer: SerializerType = {
  select: ['-__v'],
  // populate: ['user|_id username phoneNumber'],
  // payloadTransform: (payload: any, tokenPayload: any) => {
  //   payload.user = tokenPayload.userId;
  //   return payload;
  // },
};

export const listExampleSerializer: SerializerType = {
  select: ['-__v'],
  // populate: ['user|_id username phoneNumber'],
};
