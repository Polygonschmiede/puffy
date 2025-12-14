import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfNavigationMenu } from 'pf';

describe('PfNavigationMenu', () => {
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
      imports: [PfNavigationMenu]
    })
      .overrideComponent(PfNavigationMenu, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('opens a submenu and emits selection', () => {
    const fixture = TestBed.createComponent(PfNavigationMenu);
    const selected: string[] = [];
    fixture.componentRef.setInput('items', [
      { id: 'a', label: 'A', children: [{ id: 'a-1', label: 'Alpha', href: '#' }] }
    ]);
    fixture.componentRef.instance.itemSelected.subscribe((item) => selected.push(item.id));

    fixture.detectChanges();

    fixture.nativeElement.querySelector('button')?.click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.pf-navigation__link')?.click();
    fixture.detectChanges();

    expect(selected).toEqual(['a-1']);
  });
});
