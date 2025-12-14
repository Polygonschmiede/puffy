import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfRadioGroup } from 'pf';

const items = [
  { label: 'One', value: '1' },
  { label: 'Two', value: '2' }
];

describe('PfRadioGroup', () => {
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
      imports: [PfRadioGroup]
    })
      .overrideComponent(PfRadioGroup, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('selects item and emits', () => {
    const fixture = TestBed.createComponent(PfRadioGroup);
    fixture.componentRef.setInput('items', items);
    const emitted: string[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();

    expect(emitted).toEqual(['2']);
    expect(buttons[1].getAttribute('aria-checked')).toBe('true');
  });

  it('moves focus with keyboard', () => {
    const fixture = TestBed.createComponent(PfRadioGroup);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(document.activeElement).toBe(buttons[1]);
  });
});
