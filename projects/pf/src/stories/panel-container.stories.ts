import type { Meta, StoryObj } from '@storybook/angular';
import { PfPanelContainer, PfNeumorphicCard } from 'pf';

type PanelArgs = Partial<{ columns: number }>;

const meta: Meta<PanelArgs> = {
  title: 'Layouts/Panel Container',
  component: PfPanelContainer,
  tags: ['autodocs'],
  render: (args: PanelArgs) => ({
    props: args,
    template: `
      <pf-panel-container [columns]="columns">
        <pf-neumorphic-card *ngFor="let i of [1,2,3,4,5]">Panel {{ i }}</pf-neumorphic-card>
      </pf-panel-container>
    `,
    moduleMetadata: { imports: [PfPanelContainer, PfNeumorphicCard] }
  }),
  args: {
    columns: 3
  }
};

export default meta;
type Story = StoryObj<PanelArgs>;

export const Default: Story = {};
