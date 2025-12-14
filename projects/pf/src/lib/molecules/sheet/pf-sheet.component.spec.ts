import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfSheet } from 'pf';

describe('PfSheet', () => {
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
      imports: [PfSheet]
    })
      .overrideComponent(PfSheet, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders when open and closes on backdrop', () => {
    const fixture = TestBed.createComponent(PfSheet);
    fixture.componentRef.setInput('open', true);
    const emitted: boolean[] = [];
    fixture.componentRef.instance.openChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('aside')).toBeTruthy();
    fixture.nativeElement.querySelector('.pf-sheet__backdrop')?.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(emitted).toEqual([false]);
  });
});
