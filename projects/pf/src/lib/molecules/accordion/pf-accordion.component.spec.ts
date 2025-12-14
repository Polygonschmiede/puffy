import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfAccordion } from 'pf';

describe('PfAccordion', () => {
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
      imports: [PfAccordion]
    })
      .overrideComponent(PfAccordion, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles sections', () => {
    const fixture = TestBed.createComponent(PfAccordion);
    fixture.componentRef.setInput('items', [
      { id: 'a', title: 'A', content: 'Alpha' },
      { id: 'b', title: 'B', content: 'Beta' }
    ]);

    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Alpha');
    buttons[1].click();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Beta');
  });
});
