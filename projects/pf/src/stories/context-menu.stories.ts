import type { Meta, StoryObj } from '@storybook/angular';
import { PfContextMenu } from 'pf';

const items = [
  { id: 'copy', label: 'Copy' },
  { id: 'paste', label: 'Paste' },
  { id: 'delete', label: 'Delete', destructive: true }
];

type ContextMenuArgs = Partial<{
  items: typeof items;
}>;

const meta: Meta<ContextMenuArgs> = {
  title: 'Molecules/Context Menu',
  component: PfContextMenu,
  tags: ['autodocs'],
  render: (args: ContextMenuArgs) => ({
    props: args,
    template: `
      <pf-context-menu [items]="items">
        <div style="padding:16px; border:1px dashed var(--pf-color-border, #cbd4e3);">
          Right click inside this area.
        </div>
      </pf-context-menu>
    `,
    imports: [PfContextMenu]
  }),
  args: {
    items
  }
};

export default meta;
type Story = StoryObj<ContextMenuArgs>;

export const Default: Story = {};
