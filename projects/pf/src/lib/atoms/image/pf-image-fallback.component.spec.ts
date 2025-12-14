import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfImageFallback } from './pf-image-fallback.component';

describe('PfImageFallback', () => {
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
      imports: [PfImageFallback]
    })
      .overrideComponent(PfImageFallback, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('uses fallback when provided', () => {
    const fixture = TestBed.createComponent(PfImageFallback);
    fixture.componentRef.setInput('src', 'bad.png');
    fixture.componentRef.setInput('fallbackSrc', 'fallback.png');
    fixture.detectChanges();

    fixture.componentInstance.useFallback();
    fixture.detectChanges();

    const comp = fixture.componentInstance;
    expect(comp.currentSrc()).toContain('fallback.png');
  });
});
