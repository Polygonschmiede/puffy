import type { Meta, StoryObj } from '@storybook/angular';
import { PfSkeleton } from 'pf';

type SkeletonArgs = Partial<{
  width: string;
  height: string;
}>;

const meta: Meta<SkeletonArgs> = {
  title: 'Atoms/Skeleton',
  component: PfSkeleton,
  tags: ['autodocs'],
  render: (args: SkeletonArgs) => ({
    props: args,
    template: `<pf-skeleton [width]="width" [height]="height"></pf-skeleton>`,
    moduleMetadata: { imports: [PfSkeleton] }
  }),
  args: {
    width: '100%',
    height: '1rem'
  }
};

export default meta;
type Story = StoryObj<SkeletonArgs>;

export const Default: Story = {};

export const AvatarShimmer: Story = {
  args: { width: '3rem', height: '3rem' }
};
