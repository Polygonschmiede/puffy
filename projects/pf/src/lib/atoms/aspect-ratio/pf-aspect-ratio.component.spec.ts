import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfAspectRatio } from 'pf';

describe('PfAspectRatio', () => {
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
      imports: [PfAspectRatio]
    })
      .overrideComponent(PfAspectRatio, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('applies aspect ratio styles', () => {
    const fixture = TestBed.createComponent(PfAspectRatio);
    fixture.componentRef.setInput('ratio', 1);
    fixture.detectChanges();

    const inner = fixture.nativeElement.querySelector('.pf-aspect-ratio__inner') as HTMLElement;
    expect(inner.style.aspectRatio).toBe('1');
  });
});
