import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfToggle } from 'pf';

describe('PfToggle', () => {
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
      imports: [PfToggle]
    })
      .overrideComponent(PfToggle, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles uncontrolled state via click', () => {
    const fixture = TestBed.createComponent(PfToggle);
    const emitted: boolean[] = [];
    fixture.componentRef.instance.pressedChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    button?.click();
    fixture.detectChanges();

    expect(emitted).toEqual([true]);
    expect(button?.getAttribute('aria-pressed')).toBe('true');
  });

  it('handles keyboard activation', () => {
    const fixture = TestBed.createComponent(PfToggle);
    const emitted: boolean[] = [];
    fixture.componentRef.instance.pressedChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();

    expect(emitted).toEqual([true]);
  });

  it('respects disabled state', () => {
    const fixture = TestBed.createComponent(PfToggle);
    fixture.componentRef.setInput('disabled', true);
    const emitted: boolean[] = [];
    fixture.componentRef.instance.pressedChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    button?.click();
    fixture.detectChanges();

    expect(emitted).toEqual([]);
    expect(button?.disabled).toBe(true);
  });
});
