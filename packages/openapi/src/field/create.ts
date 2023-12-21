import type { IFieldRo, IFieldVo } from '@teable-group/core';
import { fieldRoSchema, fieldVoSchema } from '@teable-group/core';
import { axios } from '../axios';
import { registerRoute, urlBuilder } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const CREATE_FIELD = '/table/{tableId}/field';

export const CreateFieldRoute: RouteConfig = registerRoute({
  method: 'post',
  path: CREATE_FIELD,
  description: 'Create a field',
  request: {
    params: z.object({
      tableId: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: fieldRoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Returns data about a field.',
      content: {
        'application/json': {
          schema: fieldVoSchema,
        },
      },
    },
  },
  tags: ['field'],
});

export const createField = async (tableId: string, fieldRo: IFieldRo) => {
  return axios.post<IFieldVo>(urlBuilder(CREATE_FIELD, { tableId }), fieldRo);
};
