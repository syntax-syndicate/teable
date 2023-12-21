import { registerRoute } from '../utils';
import { z } from '../zod';
import type { RouteConfig } from '../zod-to-openapi';

export const UPLOAD_FILE_URL = '/attachments/upload/{token}';

export const uploadFileRoSchema = z.object({
  file: z.string().openapi({ format: 'binary' }),
});

export type UploadFileRo = z.infer<typeof uploadFileRoSchema>;

export const UploadFileRoute: RouteConfig = registerRoute({
  method: 'post',
  path: UPLOAD_FILE_URL,
  description: 'Upload attachment',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: uploadFileRoSchema,
        },
      },
      description: 'upload attachment',
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Upload successful',
    },
  },
  schemaProps: {
    file: {
      example: 'file',
      format: 'binary',
    },
  },
  tags: ['attachments'],
});
