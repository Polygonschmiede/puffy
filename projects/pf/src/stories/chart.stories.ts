import type { Meta, StoryObj } from '@storybook/angular';
import { PfChart } from 'pf';

type ChartArgs = Partial<{
  data: { label: string; value: number; tone?: 'default' | 'accent' | 'danger' }[];
}>;

const meta: Meta<ChartArgs> = {
  title: 'Data/Chart',
  component: PfChart,
  tags: ['autodocs'],
  render: (args: ChartArgs) => ({
    props: args,
    template: `
      <pf-chart [data]="data"></pf-chart>
    `,
    imports: [PfChart]
  }),
  args: {
    data: [
      { label: 'Desktop', value: 72 },
      { label: 'Mobile', value: 54, tone: 'accent' },
      { label: 'Tablet', value: 38, tone: 'danger' }
    ]
  }
};

export default meta;
type Story = StoryObj<ChartArgs>;

export const Default: Story = {};
