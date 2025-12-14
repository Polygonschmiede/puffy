import type { Meta, StoryObj } from '@storybook/angular';
import { PfImageFallback } from 'pf';

type ImgArgs = Partial<{ src: string; fallbackSrc: string; alt: string }>;

const meta: Meta<ImgArgs> = {
  title: 'Atoms/Image with Fallback',
  component: PfImageFallback,
  tags: ['autodocs'],
  render: (args: ImgArgs) => ({
    props: args,
    template: `
      <pf-image-fallback [src]="src" [fallbackSrc]="fallbackSrc" [alt]="alt" width="200" height="120"></pf-image-fallback>
    `,
    moduleMetadata: { imports: [PfImageFallback] }
  }),
  args: {
    src: 'invalid.jpg',
    fallbackSrc: 'https://via.placeholder.com/200x120.png?text=Fallback',
    alt: 'Demo image'
  }
};

export default meta;
type Story = StoryObj<ImgArgs>;

export const Default: Story = {};
