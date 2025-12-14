import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfProgress } from 'pf';

describe('PfProgress', () => {
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
      imports: [PfProgress]
    })
      .overrideComponent(PfProgress, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders percentage', () => {
    const fixture = TestBed.createComponent(PfProgress);
    fixture.componentRef.setInput('value', 50);
    fixture.componentRef.setInput('max', 200);
    fixture.componentRef.setInput('showValue', true);
    fixture.detectChanges();

    const meta = fixture.nativeElement.querySelector('.pf-progress__value') as HTMLElement | null;
    expect(meta?.textContent?.trim()).toBe('25%');
  });
});
