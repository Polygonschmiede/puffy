import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfChart } from 'pf';

describe('PfChart', () => {
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
      imports: [PfChart]
    })
      .overrideComponent(PfChart, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('calculates bar width based on max', () => {
    const fixture = TestBed.createComponent(PfChart);
    fixture.componentRef.setInput('data', [
      { label: 'A', value: 10 },
      { label: 'B', value: 20 }
    ]);
    fixture.detectChanges();

    const bars = fixture.nativeElement.querySelectorAll('.pf-chart__bar') as NodeListOf<HTMLElement>;
    expect(bars[1].style.width).toBe('100%');
  });
});
