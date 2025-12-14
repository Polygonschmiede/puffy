import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfTextarea } from 'pf';

describe('PfTextarea', () => {
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
      imports: [PfTextarea]
    })
      .overrideComponent(PfTextarea, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders label and error', () => {
    const fixture = TestBed.createComponent(PfTextarea);
    fixture.componentRef.setInput('label', 'Notes');
    fixture.componentRef.setInput('error', 'Required');

    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.textContent).toContain('Notes');
    expect(host.textContent).toContain('Required');
  });
});
