import type { Meta, StoryObj } from '@storybook/angular';
import { PfAlertDialog } from 'pf';

type AlertDialogArgs = Partial<{
  triggerLabel: string;
  title: string;
  cancelLabel: string;
  confirmLabel: string;
}>;

const meta: Meta<AlertDialogArgs> = {
  title: 'Molecules/Alert Dialog',
  component: PfAlertDialog,
  tags: ['autodocs'],
  render: (args: AlertDialogArgs) => ({
    props: args,
    template: `
      <pf-alert-dialog
        [triggerLabel]="triggerLabel"
        [title]="title"
        [cancelLabel]="cancelLabel"
        [confirmLabel]="confirmLabel"
      >
        This action cannot be undone.
      </pf-alert-dialog>
    `,
    moduleMetadata: { imports: [PfAlertDialog] }
  }),
  args: {
    triggerLabel: 'Delete',
    title: 'Delete project?',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm'
  }
};

export default meta;
type Story = StoryObj<AlertDialogArgs>;

export const Default: Story = {};
