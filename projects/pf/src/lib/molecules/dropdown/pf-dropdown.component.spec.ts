import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfDropdown } from 'pf';

describe('PfDropdown', () => {
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
      imports: [PfDropdown]
    })
      .overrideComponent(PfDropdown, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('opens and selects item', () => {
    const fixture = TestBed.createComponent(PfDropdown);
    const selected: string[] = [];
    fixture.componentRef.setInput('items', [
      { id: 'a', label: 'Alpha' },
      { id: 'b', label: 'Beta' }
    ]);
    fixture.componentRef.instance.itemSelected.subscribe((item) => selected.push(item.id));

    fixture.detectChanges();

    fixture.nativeElement.querySelector('button')?.click();
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.pf-dropdown__item')[1]?.click();
    fixture.detectChanges();

    expect(selected).toEqual(['b']);
  });
});
