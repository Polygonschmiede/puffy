import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfBadge } from 'pf';

describe('PfBadge', () => {
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
      imports: [PfBadge]
    })
      .overrideComponent(PfBadge, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders the provided label', () => {
    const fixture = TestBed.createComponent(PfBadge);
    fixture.componentRef.setInput('label', 'New');

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('New');
  });

  it('applies variant and tone classes', () => {
    const fixture = TestBed.createComponent(PfBadge);
    fixture.componentRef.setInput('label', 'Success');
    fixture.componentRef.setInput('variant', 'flat');
    fixture.componentRef.setInput('tone', 'success');

    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.className).toContain('pf-badge');
    expect(host.className).toContain('pf-badge--flat');
    expect(host.className).toContain('pf-badge--success');
  });
});
