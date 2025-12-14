import type { Meta, StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { PfRadio } from 'pf';

@Component({
  selector: 'pf-radio-demo',
  imports: [PfRadio],
  template: `
    <div class="radio-demo">
      <pf-radio
        label="Option A"
        value="a"
        [checked]="value() === 'a'"
        (checkedChange)="setValue('a')"
      ></pf-radio>
      <pf-radio
        label="Option B"
        value="b"
        [checked]="value() === 'b'"
        (checkedChange)="setValue('b')"
      ></pf-radio>
    </div>
    <p class="radio-demo__summary">Selected: {{ value() || 'none' }}</p>
  `
})
class PfRadioDemoComponent {
  readonly value = signal<string | null>(null);
  setValue(next: string): void {
    this.value.set(next);
  }
}

const meta: Meta<PfRadioDemoComponent> = {
  title: 'Atoms/Radio',
  component: PfRadioDemoComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<PfRadioDemoComponent>;

export const Basic: Story = {};
