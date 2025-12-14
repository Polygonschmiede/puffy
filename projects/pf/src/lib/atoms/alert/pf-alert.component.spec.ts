import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Component } from '@angular/core';
import { PfAlert } from 'pf';

@Component({
  selector: 'pf-alert-host',
  imports: [PfAlert],
  template: `
    <pf-alert [title]="title" [variant]="variant">
      <span class="body">Watch out</span>
    </pf-alert>
  `
})
class PfAlertHostComponent {
  title = 'Heads up';
  variant = 'warning';
}

describe('PfAlert', () => {
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
      imports: [PfAlert, PfAlertHostComponent]
    })
      .overrideComponent(PfAlert, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders title and projected content', () => {
    const fixture = TestBed.createComponent(PfAlertHostComponent);

    fixture.detectChanges();

    const host = fixture.nativeElement.querySelector('pf-alert') as HTMLElement | null;
    const text = host?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

    expect(text).toContain('Heads up');
    expect(text).toContain('Watch out');
    expect(host?.className).toContain('pf-alert--warning');
  });
});
