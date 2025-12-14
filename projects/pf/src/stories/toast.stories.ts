import { Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { PfButton, PfToastContainer, PfToastService } from 'pf';

@Component({
  selector: 'pf-toast-demo',
  imports: [PfToastContainer, PfButton],
  template: `
    <div style="display: flex; gap: 8px;">
      <pf-button (clicked)="show('Saved', 'Settings updated', 'success')">Show Toast</pf-button>
      <pf-button (clicked)="show('Error', 'Please retry', 'danger')">Show Error</pf-button>
    </div>
    <pf-toast-container />
  `
})
class PfToastDemoComponent {
  private readonly toastService = inject(PfToastService);

  show(title: string, description?: string, tone: 'default' | 'success' | 'danger' = 'success'): void {
    this.toastService.show({ title, description, tone });
  }
}

type ToastArgs = Record<string, never>;

const meta: Meta<ToastArgs> = {
  title: 'Feedback/Toast',
  component: PfToastDemoComponent,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ToastArgs>;

export const Default: Story = {};
