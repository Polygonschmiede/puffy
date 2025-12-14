import type { Meta, StoryObj } from '@storybook/angular';
import { PfAlert, PfAlertVariant } from 'pf';

type AlertArgs = Partial<{
  title: string;
  variant: PfAlertVariant;
  content: string;
}>;

const meta: Meta<AlertArgs> = {
  title: 'Atoms/Alert',
  component: PfAlert,
  tags: ['autodocs'],
  render: (args: AlertArgs) => ({
    props: args,
    template: `
      <pf-alert [title]="title" [variant]="variant">
        {{ content }}
      </pf-alert>
    `,
    imports: [PfAlert]
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'destructive']
    }
  },
  args: {
    title: 'Heads up',
    variant: 'info',
    content: 'Here is a contextual hint for this surface.'
  }
};

export default meta;
type Story = StoryObj<AlertArgs>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    content: 'Your changes have been stored.'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Check this',
    content: 'Something might need your attention soon.'
  }
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    content: 'We could not complete that action.'
  }
};
