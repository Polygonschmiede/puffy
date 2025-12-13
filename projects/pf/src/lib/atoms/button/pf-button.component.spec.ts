import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfButton } from './pf-button.component';

describe('PfButton', () => {
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
      imports: [PfButton]
    })
      .overrideComponent(PfButton, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders the provided label', () => {
    const fixture = TestBed.createComponent(PfButton);
    fixture.componentRef.setInput('label', 'Tap me');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button?.textContent?.trim()).toBe('Tap me');
  });

  it('applies variant, tone, size, and block classes', () => {
    const fixture = TestBed.createComponent(PfButton);
    fixture.componentRef.setInput('label', 'Block');
    fixture.componentRef.setInput('variant', 'ghost');
    fixture.componentRef.setInput('tone', 'neutral');
    fixture.componentRef.setInput('size', 'lg');
    fixture.componentRef.setInput('fullWidth', true);

    fixture.detectChanges();

    const className = fixture.nativeElement.querySelector('button')?.className ?? '';
    expect(className).toContain('pf-button--ghost');
    expect(className).toContain('pf-button--neutral');
    expect(className).toContain('pf-button--lg');
    expect(className).toContain('pf-button--block');
  });

  it('disables the control when disabled is true', () => {
    const fixture = TestBed.createComponent(PfButton);
    fixture.componentRef.setInput('label', 'Nope');
    fixture.componentRef.setInput('disabled', true);

    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    expect(button?.disabled).toBe(true);
    expect(button?.className).toContain('pf-button--disabled');
  });
});
