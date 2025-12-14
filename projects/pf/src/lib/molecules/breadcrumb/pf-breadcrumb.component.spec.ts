import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfBreadcrumb } from 'pf';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Data', href: '/library/data' },
  { label: 'Usage', href: '/library/data/usage' }
];

describe('PfBreadcrumb', () => {
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
      imports: [PfBreadcrumb]
    })
      .overrideComponent(PfBreadcrumb, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('marks last item as current page', () => {
    const fixture = TestBed.createComponent(PfBreadcrumb);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[links.length - 1].getAttribute('aria-current')).toBe('page');
  });

  it('collapses middle items when above maxVisible', () => {
    const fixture = TestBed.createComponent(PfBreadcrumb);
    fixture.componentRef.setInput('items', [...items, { label: 'Deep', href: '/deep' }]);
    fixture.componentRef.setInput('maxVisible', 4);
    fixture.detectChanges();

    const ellipsis = fixture.nativeElement.querySelector('button.pf-breadcrumb__ellipsis');
    expect(ellipsis).toBeTruthy();
  });
});
