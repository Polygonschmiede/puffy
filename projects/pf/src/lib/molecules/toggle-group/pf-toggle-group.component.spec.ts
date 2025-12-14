import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfToggleGroup } from 'pf';

const items = [
  { label: 'Alpha', value: 'a' },
  { label: 'Beta', value: 'b' },
  { label: 'Gamma', value: 'c' }
];

describe('PfToggleGroup', () => {
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
      imports: [PfToggleGroup]
    })
      .overrideComponent(PfToggleGroup, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles single selection', () => {
    const fixture = TestBed.createComponent(PfToggleGroup);
    fixture.componentRef.setInput('items', items);
    const emitted: (string | null)[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value as string | null));
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();

    expect(emitted).toEqual(['b']);
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('supports multi selection', () => {
    const fixture = TestBed.createComponent(PfToggleGroup);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('multiple', true);
    const emitted: (string[] | null)[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value as string[] | null));
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    buttons[2].click();
    fixture.detectChanges();

    expect(emitted[emitted.length - 1]).toEqual(['a', 'c']);
  });

  it('moves focus with arrow keys', () => {
    const fixture = TestBed.createComponent(PfToggleGroup);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(buttons[1]);
  });
});
