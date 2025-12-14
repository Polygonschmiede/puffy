import type { Meta, StoryObj } from '@storybook/angular';
import { PfButton, PfCommand } from 'pf';

type CommandArgs = Partial<{
  open: boolean;
  items: { label: string; value: string; shortcut?: string }[];
}>;

const meta: Meta<CommandArgs> = {
  title: 'Overlays/Command',
  component: PfCommand,
  tags: ['autodocs'],
  render: (args: CommandArgs) => ({
    props: args,
    template: `
      <pf-button (clicked)="open = true">Open Command</pf-button>
      <pf-command [open]="open" [items]="items" (openChange)="open = $event" (selectCommand)="selected = $event"></pf-command>
      <p style="margin-top: 12px;">Selected: {{ selected || 'none' }}</p>
    `,
    imports: [PfCommand, PfButton]
  }),
  args: {
    open: false,
    items: [
      { label: 'Open Settings', value: 'settings', shortcut: '⌘ ,' },
      { label: 'New File', value: 'new-file', shortcut: '⌘ N' },
      { label: 'Toggle Theme', value: 'theme', shortcut: '⌘ T' }
    ]
  }
};

export default meta;
type Story = StoryObj<CommandArgs>;

export const Default: Story = {};
