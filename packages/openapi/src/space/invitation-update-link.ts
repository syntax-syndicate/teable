import { spaceRolesSchema } from '@teable-group/core';
import { axios } from '../axios';
import { registerRoute, urlBuilder } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const UPDATE_SPACE_INVITATION_LINK = '/space/{spaceId}/invitation/link/{invitationId}';

export const updateSpaceInvitationLinkRoSchema = z.object({
  role: spaceRolesSchema,
});

export type UpdateSpaceInvitationLinkRo = z.infer<typeof updateSpaceInvitationLinkRoSchema>;

export const updateSpaceInvitationLinkVoSchema = z.object({
  invitationId: z.string(),
  role: spaceRolesSchema,
});

export type UpdateSpaceInvitationLinkVo = z.infer<typeof updateSpaceInvitationLinkVoSchema>;

export const UpdateSpaceInvitationLinkRoute: RouteConfig = registerRoute({
  method: 'patch',
  path: UPDATE_SPACE_INVITATION_LINK,
  description: 'Update a invitation link to your',
  request: {
    params: z.object({
      invitationId: z.string(),
      spaceId: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: updateSpaceInvitationLinkRoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Successful response.',
      content: {
        'application/json': {
          schema: updateSpaceInvitationLinkVoSchema,
        },
      },
    },
  },
  tags: ['space'],
});

export const updateSpaceInvitationLink = (params: {
  spaceId: string;
  invitationId: string;
  updateSpaceInvitationLinkRo: UpdateSpaceInvitationLinkRo;
}) => {
  const { spaceId, invitationId, updateSpaceInvitationLinkRo } = params;
  return axios.patch<UpdateSpaceInvitationLinkVo>(
    urlBuilder(UPDATE_SPACE_INVITATION_LINK, { spaceId, invitationId }),
    updateSpaceInvitationLinkRo
  );
};
