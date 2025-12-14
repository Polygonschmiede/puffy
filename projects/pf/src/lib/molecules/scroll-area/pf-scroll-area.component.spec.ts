import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfScrollArea } from 'pf';

describe('PfScrollArea', () => {
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
      imports: [PfScrollArea]
    })
      .overrideComponent(PfScrollArea, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('applies maxHeight and orientation', () => {
    const fixture = TestBed.createComponent(PfScrollArea);
    fixture.componentRef.setInput('maxHeight', '200px');
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const viewport: HTMLElement | null = fixture.nativeElement.querySelector('.pf-scroll-area__viewport');
    expect(viewport?.style.maxHeight).toBe('200px');
    expect(viewport?.getAttribute('data-orientation')).toBe('vertical');
  });
});
