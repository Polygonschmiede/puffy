import type { Meta, StoryObj } from '@storybook/angular';
import { PfBadge, PfBadgeTone, PfBadgeVariant } from 'pf';

type BadgeArgs = Partial<{
  label: string;
  variant: PfBadgeVariant;
  tone: PfBadgeTone;
}>;

const meta: Meta<BadgeArgs> = {
  title: 'Atoms/Badge',
  component: PfBadge,
  tags: ['autodocs'],
  render: (args: BadgeArgs) => ({
    props: args,
    template: `
      <pf-badge
        [label]="label"
        [variant]="variant"
        [tone]="tone"
      ></pf-badge>
    `,
    moduleMetadata: { imports: [PfBadge] }
  }),
  argTypes: {
    variant: {
      control: 'select',
      options: ['raised', 'flat']
    },
    tone: {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'destructive']
    }
  },
  args: {
    label: 'Status',
    variant: 'raised',
    tone: 'neutral'
  }
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Raised: Story = {};

export const Accent: Story = {
  args: {
    tone: 'accent',
    label: 'Accent'
  }
};

export const Success: Story = {
  args: {
    tone: 'success',
    label: 'Success'
  }
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    label: 'Warning'
  }
};

export const Destructive: Story = {
  args: {
    tone: 'destructive',
    label: 'Remove'
  }
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    tone: 'accent',
    label: 'Flat'
  }
};
