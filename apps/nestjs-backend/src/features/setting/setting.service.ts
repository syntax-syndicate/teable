import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@teable/db-main-prisma';
import type { ISettingVo, IUpdateSettingRo } from '@teable/openapi';

@Injectable()
export class SettingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSetting(): Promise<ISettingVo> {
    return await this.prismaService.setting
      .findFirstOrThrow({
        select: {
          instanceId: true,
          disallowSignUp: true,
          disallowSpaceCreation: true,
          disallowSpaceInvitation: true,
          aiConfig: true,
        },
      })
      .then((setting) => ({
        ...setting,
        aiConfig: setting.aiConfig ? JSON.parse(setting.aiConfig as string) : null,
      }))
      .catch(() => {
        throw new NotFoundException('Setting not found');
      });
  }

  async updateSetting(updateSettingRo: IUpdateSettingRo) {
    const setting = await this.getSetting();
    return await this.prismaService.setting.update({
      where: { instanceId: setting.instanceId },
      data: {
        ...updateSettingRo,
        aiConfig: updateSettingRo.aiConfig ? JSON.stringify(updateSettingRo.aiConfig) : null,
      },
    });
  }
}
