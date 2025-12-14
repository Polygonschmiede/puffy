import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfTypography } from './pf-typography.component';

describe('PfTypography', () => {
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
      imports: [PfTypography]
    })
      .overrideComponent(PfTypography, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders variant class', () => {
    const fixture = TestBed.createComponent(PfTypography);
    fixture.componentRef.setInput('variant', 'h2');
    fixture.detectChanges();

    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.className).toContain('pf-typography__h2');
  });
});
