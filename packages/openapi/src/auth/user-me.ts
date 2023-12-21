import { axios } from '../axios';
import { registerRoute } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const USER_ME = '/auth/user/me';

export const userMeVoSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullable().optional(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
});

export type IUserMeVo = z.infer<typeof userMeVoSchema>;

export const userMeRoute: RouteConfig = registerRoute({
  method: 'get',
  path: USER_ME,
  description: 'Get user information',
  responses: {
    200: {
      description: 'Successfully retrieved user information',
      content: {
        'application/json': {
          schema: userMeVoSchema,
        },
      },
    },
  },
  tags: ['auth'],
});

export const userMe = async () => {
  return axios.get<IUserMeVo>(USER_ME);
};
