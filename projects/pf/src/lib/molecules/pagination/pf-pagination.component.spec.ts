import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfPagination } from 'pf';

describe('PfPagination', () => {
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
      imports: [PfPagination]
    })
      .overrideComponent(PfPagination, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits page changes', () => {
    const fixture = TestBed.createComponent(PfPagination);
    fixture.componentRef.setInput('total', 100);
    fixture.componentRef.setInput('pageSize', 10);
    const emitted: number[] = [];
    fixture.componentRef.instance.pageChange.subscribe((page) => emitted.push(page));

    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();

    expect(emitted).toEqual([2]);
  });
});
