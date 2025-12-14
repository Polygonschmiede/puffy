import type { Meta, StoryObj } from '@storybook/angular';
import { signal } from '@angular/core';
import { PfDialog, PfButton } from 'pf';

class DialogStoryState {
  readonly open = signal(false);
}

type DialogArgs = Partial<{
  title: string;
  closeOnBackdrop: boolean;
  showFooter: boolean;
}>;

const meta: Meta<DialogArgs> = {
  title: 'Molecules/Dialog',
  component: PfDialog,
  tags: ['autodocs'],
  render: (args: DialogArgs) => {
    const state = new DialogStoryState();
    return {
      props: { ...args, state },
      template: `
        <pf-button label="Open dialog" (click)="state.open.set(true)"></pf-button>
        <pf-dialog
          [open]="state.open()"
          [title]="title"
          [closeOnBackdrop]="closeOnBackdrop"
          [showFooter]="showFooter"
          (openChange)="state.open.set($event)"
        >
          <p>Use dialogs to confirm actions or show focused content.</p>
          <div pfDialogActions>
            <pf-button label="Close" variant="ghost" (click)="state.open.set(false)"></pf-button>
            <pf-button label="Confirm" (click)="state.open.set(false)"></pf-button>
          </div>
        </pf-dialog>
      `,
      moduleMetadata: { imports: [PfDialog, PfButton] }
    };
  },
  args: {
    title: 'Dialog title',
    closeOnBackdrop: true,
    showFooter: true
  }
};

export default meta;
type Story = StoryObj<DialogArgs>;

export const Default: Story = {};

export const NoBackdropClose: Story = {
  args: { closeOnBackdrop: false }
};

export const WithoutFooter: Story = {
  args: { showFooter: false }
};
