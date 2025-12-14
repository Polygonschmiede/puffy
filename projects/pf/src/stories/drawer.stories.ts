import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';
import { PfDrawer, PfButton } from 'pf';

class DrawerStoryState {
  readonly open = signal(false);
}

type DrawerArgs = Partial<{
  title: string;
  closeOnBackdrop: boolean;
}>;

const meta: Meta<DrawerArgs> = {
  title: 'Molecules/Drawer',
  component: PfDrawer,
  tags: ['autodocs'],
  render: (args: DrawerArgs) => {
    const state = new DrawerStoryState();
    return {
      props: { ...args, state },
      template: `
        <pf-button label="Open drawer" (click)="state.open.set(true)"></pf-button>
        <pf-drawer
          [open]="state.open()"
          [title]="title"
          [closeOnBackdrop]="closeOnBackdrop"
          (openChange)="state.open.set($event)"
        >
          <p>Place navigation or supplemental details inside a drawer.</p>
        </pf-drawer>
      `,
      moduleMetadata: { imports: [PfDrawer, PfButton] }
    };
  },
  args: {
    title: 'Drawer',
    closeOnBackdrop: true
  }
};

export default meta;
type Story = StoryObj<DrawerArgs>;

export const Default: Story = {};

export const NoBackdropClose: Story = {
  args: { closeOnBackdrop: false }
};
