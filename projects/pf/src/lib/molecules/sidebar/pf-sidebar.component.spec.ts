import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfSidebar } from 'pf';

describe('PfSidebar', () => {
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
      imports: [PfSidebar]
    })
      .overrideComponent(PfSidebar, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles collapse and emits selection', () => {
    const fixture = TestBed.createComponent(PfSidebar);
    const selected: string[] = [];
    fixture.componentRef.setInput('items', [
      { id: 'home', label: 'Home' },
      { id: 'settings', label: 'Settings' }
    ]);
    fixture.componentRef.instance.itemSelected.subscribe((item) => selected.push(item.id));

    fixture.detectChanges();

    fixture.nativeElement.querySelector('.pf-sidebar__toggle')?.click();
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('.pf-sidebar__item')[1]?.click();
    fixture.detectChanges();

    expect(selected).toEqual(['settings']);
  });
});
