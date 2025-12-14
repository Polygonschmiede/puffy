import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfDrawer } from 'pf';

@Component({
  selector: 'pf-drawer-host',
  imports: [PfDrawer],
  template: `
    <pf-drawer [open]="open" title="Drawer" (openChange)="open = $event">
      <p>Drawer content</p>
    </pf-drawer>
  `
})
class PfDrawerHostComponent {
  open = true;
}

describe('PfDrawer', () => {
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
      imports: [PfDrawer, PfDrawerHostComponent]
    })
      .overrideComponent(PfDrawer, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders when open and emits close', () => {
    const fixture = TestBed.createComponent(PfDrawerHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Drawer content');
    const close = fixture.nativeElement.querySelector('.pf-drawer__close') as HTMLButtonElement | null;
    close?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.open).toBe(false);
  });
});
