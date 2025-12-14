import type { Meta, StoryObj } from '@storybook/angular';
import { PfButton, PfSheet } from 'pf';

type SheetArgs = Partial<{ open: boolean; side: 'left' | 'right' | 'bottom'; title: string }>;

const meta: Meta<SheetArgs> = {
  title: 'Overlays/Sheet',
  component: PfSheet,
  tags: ['autodocs'],
  render: (args: SheetArgs) => ({
    props: args,
    template: `
      <pf-button (clicked)="open = true">Open Sheet</pf-button>
      <pf-sheet [open]="open" [side]="side" [title]="title" (openChange)="open = $event">
        <p>Place form or navigation content here.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </pf-sheet>
    `,
    imports: [PfSheet, PfButton]
  }),
  args: {
    open: false,
    side: 'right',
    title: 'Settings'
  }
};

export default meta;
type Story = StoryObj<SheetArgs>;

export const Right: Story = {};

export const Left: Story = {
  args: { side: 'left' }
};

export const Bottom: Story = {
  args: { side: 'bottom' }
};
