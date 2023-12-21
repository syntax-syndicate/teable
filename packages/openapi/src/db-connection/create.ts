import { axios } from '../axios';
import { registerRoute, urlBuilder } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const CREATE_DB_CONNECTION = '/base/{baseId}/connection';

export const createDbConnectionRoSchema = z.object({
  baseId: z.string(),
});

export const dbConnectionVoSchema = z.object({
  dsn: z.object({
    driver: z.string(),
    host: z.string(),
    port: z.number().optional(),
    db: z.string().optional(),
    user: z.string().optional(),
    pass: z.string().optional(),
    params: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  }),
  url: z.string().describe('The URL that can be used to connect to the database'),
});

export type IDbConnectionVo = z.infer<typeof dbConnectionVoSchema>;

export const CreateDbConnectionRoute: RouteConfig = registerRoute({
  method: 'post',
  path: CREATE_DB_CONNECTION,
  description: 'Create a db connection url that directly access to all tables in the base',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createDbConnectionRoSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Connection created successfully',
      content: {
        'application/json': {
          schema: dbConnectionVoSchema,
        },
      },
    },
  },
  tags: ['db-connection'],
});

export const createDbConnection = async (baseId: string) => {
  return axios.post<IDbConnectionVo>(urlBuilder(CREATE_DB_CONNECTION, { baseId }));
};
