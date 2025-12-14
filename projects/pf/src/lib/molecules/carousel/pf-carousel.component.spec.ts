import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfCarousel } from 'pf';

describe('PfCarousel', () => {
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
      imports: [PfCarousel]
    })
      .overrideComponent(PfCarousel, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('cycles through slides', () => {
    const fixture = TestBed.createComponent(PfCarousel);
    fixture.componentRef.setInput('items', [
      { title: 'Slide 1' },
      { title: 'Slide 2' }
    ]);
    fixture.detectChanges();

    const nextBtn: HTMLButtonElement = fixture.nativeElement.querySelectorAll('.pf-carousel__control')[1];
    nextBtn.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.index()).toBe(1);
  });
});
