import type { IFilterSet } from '@teable-group/core';
import { filterSchema } from '@teable-group/core';
import { axios } from '../axios';
import { registerRoute, urlBuilder } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const VIEW_FILTER = '/table/{tableId}/view/{viewId}/filter';

export const SetViewFilterRoute: RouteConfig = registerRoute({
  method: 'put',
  path: VIEW_FILTER,
  description: 'Update view filter',
  request: {
    params: z.object({
      tableId: z.string(),
      viewId: z.string(),
    }),
    body: {
      content: {
        // TODO zod-to-openapi does not support z.lazy which use in filterSchema
        'application/json': {
          schema: filterSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successfully update.',
    },
  },
  tags: ['view'],
});

export const setViewFilter = async (tableId: string, viewId: string, filterRo: IFilterSet) => {
  return axios.put<void>(
    urlBuilder(VIEW_FILTER, {
      tableId,
      viewId,
    }),
    filterRo
  );
};
