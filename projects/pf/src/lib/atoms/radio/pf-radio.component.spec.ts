import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfRadio } from 'pf';

describe('PfRadio', () => {
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
      imports: [PfRadio]
    })
      .overrideComponent(PfRadio, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits when selected', () => {
    const fixture = TestBed.createComponent(PfRadio);
    const emitted: boolean[] = [];
    fixture.componentRef.setInput('label', 'A');
    fixture.componentRef.instance.checkedChange.subscribe((value) => emitted.push(value));

    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    button?.click();
    fixture.detectChanges();

    expect(emitted).toEqual([true]);
    expect(button?.getAttribute('aria-checked')).toBe('true');
  });
});
