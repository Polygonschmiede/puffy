import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfSkeleton } from 'pf';

describe('PfSkeleton', () => {
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
      imports: [PfSkeleton]
    })
      .overrideComponent(PfSkeleton, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('sets dimensions', () => {
    const fixture = TestBed.createComponent(PfSkeleton);
    fixture.componentRef.setInput('width', '50px');
    fixture.componentRef.setInput('height', '10px');

    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.width).toBe('50px');
    expect(host.style.height).toBe('10px');
  });
});
