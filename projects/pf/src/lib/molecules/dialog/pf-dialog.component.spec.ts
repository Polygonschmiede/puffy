import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfDialog } from 'pf';

@Component({
  selector: 'pf-dialog-host',
  imports: [PfDialog],
  template: `
    <pf-dialog [open]="open" title="Demo" (openChange)="open = $event">
      <p>Content</p>
      <div pfDialogActions><button type="button">OK</button></div>
    </pf-dialog>
  `
})
class PfDialogHostComponent {
  open = true;
}

describe('PfDialog', () => {
  let testEnvInitialized = false;

  beforeAll(() => {
    if (testEnvInitialized) {
      return;
    }

    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
      providers: [
        {
          provide: ResourceLoader,
          useValue: { get: () => Promise.resolve('') }
        }
      ]
    });
    testEnvInitialized = true;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfDialog, PfDialogHostComponent]
    })
      .overrideComponent(PfDialog, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders when open and emits close', () => {
    const fixture = TestBed.createComponent(PfDialogHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Content');
    const close = fixture.nativeElement.querySelector('.pf-dialog__close') as HTMLButtonElement | null;
    close?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
  });
});
