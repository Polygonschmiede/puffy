import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfPopover } from 'pf';

describe('PfPopover', () => {
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
      imports: [PfPopover]
    })
      .overrideComponent(PfPopover, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles panel', () => {
    const fixture = TestBed.createComponent(PfPopover);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button')?.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Open');
  });
});
