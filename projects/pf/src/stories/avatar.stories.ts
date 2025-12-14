import type { Meta, StoryObj } from '@storybook/angular';
import { PfAvatar, PfAvatarSize } from 'pf';

const avatarSrc = new URL('./assets/accessibility.png', import.meta.url).href;

type AvatarArgs = Partial<{
  src: string;
  alt: string;
  fallback: string;
  size: PfAvatarSize;
}>;

const meta: Meta<AvatarArgs> = {
  title: 'Atoms/Avatar',
  component: PfAvatar,
  tags: ['autodocs'],
  render: (args: AvatarArgs) => ({
    props: args,
    template: `
      <pf-avatar
        [src]="src"
        [alt]="alt"
        [fallback]="fallback"
        [size]="size"
      ></pf-avatar>
    `,
    moduleMetadata: { imports: [PfAvatar] }
  }),
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    }
  },
  args: {
    fallback: 'Ada Lovelace',
    size: 'md',
    alt: 'Profile avatar'
  }
};

export default meta;
type Story = StoryObj<AvatarArgs>;

export const Fallback: Story = {};

export const WithImage: Story = {
  args: {
    src: avatarSrc,
    alt: 'Accessibility illustration'
  }
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    fallback: 'Alan Turing'
  }
};
