import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfCard, PfCardPadding, PfCardVariant } from 'pf';

@Component({
  selector: 'pf-card-host',
  imports: [PfCard],
  template: `
    <pf-card [padding]="padding" [variant]="variant">
      <span class="inside">Projected</span>
    </pf-card>
  `
})
class PfCardHostComponent {
  padding: PfCardPadding = 'lg';
  variant: PfCardVariant = 'pressed';
}

describe('PfCard', () => {
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
      imports: [PfCardHostComponent]
    })
      .overrideComponent(PfCard, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('applies default variant and padding', () => {
    const fixture = TestBed.createComponent(PfCard);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.className).toContain('pf-card--raised');
    expect(host.className).toContain('pf-card--pad-md');
  });

  it('applies variant and padding classes on the host', () => {
    const fixture = TestBed.createComponent(PfCardHostComponent);

    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('pf-card') as HTMLElement | null;
    expect(cardElement?.className).toContain('pf-card--pressed');
    expect(cardElement?.className).toContain('pf-card--pad-lg');
    expect(cardElement?.textContent?.trim()).toContain('Projected');
  });
});
