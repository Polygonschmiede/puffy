import type { Meta, StoryObj } from '@storybook/angular';
import { PfToggleGroup } from 'pf';

type ToggleGroupArgs = Partial<{
  items: { label: string; value: string; disabled?: boolean }[];
  multiple: boolean;
  orientation: 'horizontal' | 'vertical';
}>;

const meta: Meta<ToggleGroupArgs> = {
  title: 'Molecules/Toggle Group',
  component: PfToggleGroup,
  tags: ['autodocs'],
  render: (args: ToggleGroupArgs) => ({
    props: args,
    template: `
      <pf-toggle-group
        [items]="items"
        [multiple]="multiple"
        [orientation]="orientation"
        (valueChange)="value = $event"
      ></pf-toggle-group>
      <p style="margin-top: 12px; font-size: 0.9rem; color: var(--pf-color-contrast-weak, #334155);">
        Selection: {{ value | json }}
      </p>
    `,
    moduleMetadata: { imports: [PfToggleGroup] }
  }),
  argTypes: {
    multiple: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] }
  },
  args: {
    items: [
      { label: 'Alpha', value: 'a' },
      { label: 'Beta', value: 'b' },
      { label: 'Gamma', value: 'c' }
    ],
    multiple: false,
    orientation: 'horizontal'
  }
};

export default meta;
type Story = StoryObj<ToggleGroupArgs>;

export const Single: Story = {};

export const Multiple: Story = {
  args: {
    multiple: true
  }
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical'
  }
};
