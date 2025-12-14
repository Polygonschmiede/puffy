import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfTabs } from 'pf';

describe('PfTabs', () => {
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
      imports: [PfTabs]
    })
      .overrideComponent(PfTabs, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('switches tabs', () => {
    const fixture = TestBed.createComponent(PfTabs);
    fixture.componentRef.setInput('tabs', [
      { id: 'a', label: 'A', content: 'Alpha' },
      { id: 'b', label: 'B', content: 'Beta' }
    ]);

    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Beta');
  });
});
