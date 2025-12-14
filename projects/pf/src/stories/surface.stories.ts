import type { Meta, StoryObj } from '@storybook/angular';
import { PfSurface } from 'pf';

type SurfaceArgs = Partial<{ padding: 'none' | 'sm' | 'md' | 'lg'; elevation: 'flat' | 'soft' | 'raised'; inset: boolean }>;

const meta: Meta<SurfaceArgs> = {
  title: 'Atoms/Surface',
  component: PfSurface,
  tags: ['autodocs'],
  render: (args: SurfaceArgs) => ({
    props: args,
    template: `
      <pf-surface [padding]="padding" [elevation]="elevation" [inset]="inset">
        <p>Surface content</p>
      </pf-surface>
    `,
    moduleMetadata: { imports: [PfSurface] }
  }),
  args: {
    padding: 'md',
    elevation: 'soft',
    inset: false
  }
};

export default meta;
type Story = StoryObj<SurfaceArgs>;

export const Default: Story = {};
