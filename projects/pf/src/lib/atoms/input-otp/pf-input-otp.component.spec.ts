import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfInputOtp } from 'pf';

describe('PfInputOtp', () => {
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
      imports: [PfInputOtp]
    })
      .overrideComponent(PfInputOtp, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits on input and advances focus', () => {
    const fixture = TestBed.createComponent(PfInputOtp);
    const emitted: string[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const inputs: HTMLInputElement[] = Array.from(fixture.nativeElement.querySelectorAll('input'));
    inputs[0].value = '1';
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(emitted[0]).toBe('1');
    expect(document.activeElement).toBe(inputs[1]);
  });
});
