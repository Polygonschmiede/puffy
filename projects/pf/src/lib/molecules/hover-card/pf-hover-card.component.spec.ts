import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfHoverCard } from 'pf';

@Component({
  selector: 'pf-hover-card-host',
  imports: [PfHoverCard],
  template: `
    <pf-hover-card>
      <span pfHoverTrigger>Hover</span>
      <span pfHoverContent>Details</span>
    </pf-hover-card>
  `
})
class PfHoverCardHostComponent {}

describe('PfHoverCard', () => {
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
      imports: [PfHoverCard, PfHoverCardHostComponent]
    })
      .overrideComponent(PfHoverCard, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('shows content', () => {
    const fixture = TestBed.createComponent(PfHoverCardHostComponent);
    fixture.detectChanges();

    const hc = fixture.debugElement.children[0].componentInstance as PfHoverCard;
    hc.show();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Details');
  });
});
