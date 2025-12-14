import type { Meta, StoryObj } from '@storybook/angular';
import { PfSidebar, PfNavItem } from 'pf';

const items: PfNavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects', label: 'Projects' },
  { id: 'settings', label: 'Settings' }
];

type SidebarArgs = Partial<{
  title: string;
  items: PfNavItem[];
}>;

const meta: Meta<SidebarArgs> = {
  title: 'Navigation/Sidebar',
  component: PfSidebar,
  tags: ['autodocs'],
  render: (args: SidebarArgs) => ({
    props: args,
    template: `<pf-sidebar [title]="title" [items]="items"></pf-sidebar>`,
    moduleMetadata: { imports: [PfSidebar] }
  }),
  args: {
    title: 'Workspace',
    items
  }
};

export default meta;
type Story = StoryObj<SidebarArgs>;

export const Default: Story = {};
