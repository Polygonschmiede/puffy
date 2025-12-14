import type { Meta, StoryObj } from '@storybook/angular';
import { PfMenubar, PfNavItem } from 'pf';

const items: PfNavItem[] = [
  { id: 'file', label: 'File' },
  { id: 'edit', label: 'Edit' },
  { id: 'view', label: 'View' }
];

type MenubarArgs = Partial<{
  items: PfNavItem[];
}>;

const meta: Meta<MenubarArgs> = {
  title: 'Navigation/Menubar',
  component: PfMenubar,
  tags: ['autodocs'],
  render: (args: MenubarArgs) => ({
    props: args,
    template: `<pf-menubar [items]="items"></pf-menubar>`,
    imports: [PfMenubar]
  }),
  args: { items }
};

export default meta;
type Story = StoryObj<MenubarArgs>;

export const Default: Story = {};
