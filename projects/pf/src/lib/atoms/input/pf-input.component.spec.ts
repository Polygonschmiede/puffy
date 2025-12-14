import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfInput } from 'pf';

describe('PfInput', () => {
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
      imports: [PfInput]
    })
      .overrideComponent(PfInput, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders label and error', () => {
    const fixture = TestBed.createComponent(PfInput);
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('error', 'Required');

    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Email');
    expect(host.textContent).toContain('Required');
  });

  it('updates uncontrolled value and emits changes', () => {
    const fixture = TestBed.createComponent(PfInput);
    const emitted: string[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));

    fixture.detectChanges();

    const inputEl: HTMLInputElement | null = fixture.nativeElement.querySelector('input');
    if (inputEl) {
      inputEl.value = 'Hello';
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    fixture.detectChanges();

    expect(emitted).toEqual(['Hello']);
    expect(inputEl?.value).toBe('Hello');
  });
});
