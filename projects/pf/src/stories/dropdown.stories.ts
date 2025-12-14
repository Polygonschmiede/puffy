import type { Meta, StoryObj } from '@storybook/angular';
import { PfDropdown } from 'pf';

const items = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'divider', label: '', dividerAbove: true, disabled: true },
  { id: 'signout', label: 'Sign out', destructive: true }
];

type DropdownArgs = Partial<{
  label: string;
  items: typeof items;
}>;

const meta: Meta<DropdownArgs> = {
  title: 'Molecules/Dropdown',
  component: PfDropdown,
  tags: ['autodocs'],
  render: (args: DropdownArgs) => ({
    props: args,
    template: `
      <pf-dropdown [label]="label" [items]="items"></pf-dropdown>
    `,
    imports: [PfDropdown]
  }),
  args: {
    label: 'Actions',
    items
  }
};

export default meta;
type Story = StoryObj<DropdownArgs>;

export const Default: Story = {};
