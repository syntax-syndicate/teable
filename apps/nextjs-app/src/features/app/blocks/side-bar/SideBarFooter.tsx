import { Github, Settings, UserPlus } from '@teable-group/icons';
import { Button } from '@teable-group/ui-lib/shadcn';
import Image from 'next/image';

export const SideBarFooter: React.FC = () => {
  return (
    <div className="flex flex-col mx-2 mb-1 gap-1 items-center">
      <Button variant="ghost" size={'xs'} className="w-full justify-start text-sm font-normal">
        <Image
          width={20}
          height={20}
          loading={'eager'}
          src={`/shared-assets/example/Boy1.png`}
          alt={'tailwind-ui-logo'}
          className="object-cover object-center border border-slate-200 rounded-full"
        />
        Bieber
        <div className="grow basis-0"></div>
        <p className="text-xs text-slate-500">Invite Users</p>
        <UserPlus className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size={'xs'} className="w-full justify-start text-sm font-normal">
        <Settings className="w-5 h-5" />
        Settings
        <div className="grow basis-0"></div>
        <p className="text-xs text-slate-500">10.2k</p>
        <Github className="w-4 h-4" />
      </Button>
    </div>
  );
};