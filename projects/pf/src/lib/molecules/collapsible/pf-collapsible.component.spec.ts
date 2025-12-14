import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfCollapsible } from 'pf';

describe('PfCollapsible', () => {
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
      imports: [PfCollapsible]
    })
      .overrideComponent(PfCollapsible, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles content visibility', () => {
    const fixture = TestBed.createComponent(PfCollapsible);
    const emitted: boolean[] = [];
    fixture.componentRef.instance.openChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const content: HTMLElement = fixture.nativeElement.querySelector('.pf-collapsible__content');
    expect(content.hidden).toBe(false);
    expect(emitted).toEqual([true]);
  });
});
