import type { Meta, StoryObj } from '@storybook/angular';
import { PfPanelHeader } from 'pf';

type HeaderArgs = Partial<{ title: string; subtitle: string; eyebrow: string }>;

const meta: Meta<HeaderArgs> = {
  title: 'Layouts/Panel Header',
  component: PfPanelHeader,
  tags: ['autodocs'],
  render: (args: HeaderArgs) => ({
    props: args,
    template: `
      <pf-panel-header [title]="title" [subtitle]="subtitle" [eyebrow]="eyebrow">
        <button type="button">Action</button>
      </pf-panel-header>
    `,
    imports: [PfPanelHeader]
  }),
  args: {
    title: 'Metrics',
    subtitle: 'Weekly overview',
    eyebrow: 'Dashboard'
  }
};

export default meta;
type Story = StoryObj<HeaderArgs>;

export const Default: Story = {};
