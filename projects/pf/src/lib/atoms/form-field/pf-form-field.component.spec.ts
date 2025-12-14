import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfFormField, PfFormLabel } from 'pf';

describe('PfFormField', () => {
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
      imports: [PfFormField, PfFormLabel]
    })
      .overrideComponent(PfFormField, {
        set: { styleUrls: [], styles: [''] }
      })
      .overrideComponent(PfFormLabel, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders label and description/error IDs', () => {
    const fixture = TestBed.createComponent(PfFormField);
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('description', 'We will never spam you.');
    fixture.componentRef.setInput('error', 'Invalid email');
    fixture.componentRef.setInput('controlId', 'email');
    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('.pf-form-field__description');
    const error = fixture.nativeElement.querySelector('.pf-form-field__error');
    expect(description?.id).toContain('email');
    expect(error?.id).toContain('email');
  });
});
