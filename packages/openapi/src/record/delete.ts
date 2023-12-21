import { axios } from '../axios';
import { registerRoute, urlBuilder } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const DELETE_RECORD_URL = '/table/{tableId}/record/{recordId}';

export const DeleteRecordRoute: RouteConfig = registerRoute({
  method: 'delete',
  path: DELETE_RECORD_URL,
  description: 'Delete a single record by id',
  request: {
    params: z.object({
      tableId: z.string(),
      recordId: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Deleted successfully',
    },
  },
  tags: ['record'],
});

export const deleteRecord = async (tableId: string, recordId: string) => {
  return axios.delete<null>(
    urlBuilder(DELETE_RECORD_URL, {
      tableId,
      recordId,
    })
  );
};
