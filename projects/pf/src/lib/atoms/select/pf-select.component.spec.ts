import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfSelect } from 'pf';

describe('PfSelect', () => {
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
      imports: [PfSelect]
    })
      .overrideComponent(PfSelect, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits changes for uncontrolled select', () => {
    const fixture = TestBed.createComponent(PfSelect);
    const emitted: string[] = [];
    fixture.componentRef.setInput('options', [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' }
    ]);
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));

    fixture.detectChanges();

    const selectEl: HTMLSelectElement | null = fixture.nativeElement.querySelector('select');
    if (selectEl) {
      selectEl.value = 'b';
      selectEl.dispatchEvent(new Event('change'));
    }
    fixture.detectChanges();

    expect(emitted).toEqual(['b']);
  });
});
