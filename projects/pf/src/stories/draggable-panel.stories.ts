import type { Meta, StoryObj } from '@storybook/angular';
import { PfDraggablePanel, PfPanelHeader } from 'pf';

type DraggableArgs = Partial<{ id: string }>;

const meta: Meta<DraggableArgs> = {
  title: 'Layouts/Draggable Panel',
  component: PfDraggablePanel,
  tags: ['autodocs'],
  render: (args: DraggableArgs) => ({
    props: args,
    template: `
      <pf-draggable-panel [id]="id" (dragStart)="start = $event" (dragEnd)="end = $event">
        <div pfPanelHandle>
          <pf-panel-header title="Panel" subtitle="Drag handle above"></pf-panel-header>
        </div>
        <p>Content area</p>
        <p>Drag events: start {{ start }}, end {{ end }}</p>
      </pf-draggable-panel>
    `,
    imports: [PfDraggablePanel, PfPanelHeader]
  }),
  args: {
    id: 'panel-1'
  }
};

export default meta;
type Story = StoryObj<DraggableArgs>;

export const Default: Story = {};
