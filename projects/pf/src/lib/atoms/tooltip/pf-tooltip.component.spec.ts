import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfTooltip } from 'pf';

@Component({
  selector: 'pf-tooltip-host',
  imports: [PfTooltip],
  template: `
    <pf-tooltip content="Hint">
      <button pfTooltipTrigger type="button">Hover me</button>
    </pf-tooltip>
  `
})
class PfTooltipHostComponent {}

describe('PfTooltip', () => {
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
      imports: [PfTooltip, PfTooltipHostComponent]
    })
      .overrideComponent(PfTooltip, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('shows bubble when triggered', () => {
    const fixture = TestBed.createComponent(PfTooltipHostComponent);
    fixture.detectChanges();

    const tooltip: any = fixture.debugElement.children[0].componentInstance as PfTooltip;
    tooltip.show();
    fixture.detectChanges();

    const bubble = fixture.nativeElement.querySelector('.pf-tooltip__bubble');
    expect(bubble?.textContent).toContain('Hint');
  });
});
