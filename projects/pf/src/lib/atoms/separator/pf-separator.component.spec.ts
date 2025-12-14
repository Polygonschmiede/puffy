import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfSeparator } from 'pf';

describe('PfSeparator', () => {
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
      imports: [PfSeparator]
    })
      .overrideComponent(PfSeparator, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('sets aria orientation', () => {
    const fixture = TestBed.createComponent(PfSeparator);
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('aria-orientation')).toBe('horizontal');
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-orientation')).toBe('vertical');
  });
});
