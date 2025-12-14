import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfSlider } from 'pf';

describe('PfSlider', () => {
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
      imports: [PfSlider]
    })
      .overrideComponent(PfSlider, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits changes for uncontrolled slider', () => {
    const fixture = TestBed.createComponent(PfSlider);
    const emitted: number[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));

    fixture.detectChanges();

    const input: HTMLInputElement | null = fixture.nativeElement.querySelector('input[type="range"]');
    if (input) {
      input.value = '30';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    fixture.detectChanges();

    expect(emitted).toEqual([30]);
  });
});
