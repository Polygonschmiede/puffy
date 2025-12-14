import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfDivider } from 'pf';

describe('PfDivider', () => {
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
      imports: [PfDivider]
    })
      .overrideComponent(PfDivider, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('applies orientation', () => {
    const fixture = TestBed.createComponent(PfDivider);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).className).toContain('vertical');
  });
});
