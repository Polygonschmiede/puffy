import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfResizable } from 'pf';

describe('PfResizable', () => {
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
      imports: [PfResizable]
    })
      .overrideComponent(PfResizable, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('adjusts size via keyboard', () => {
    const fixture = TestBed.createComponent(PfResizable);
    fixture.componentRef.setInput('initialSize', 40);
    const emitted: number[] = [];
    fixture.componentRef.instance.sizeChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const handle: HTMLElement = fixture.nativeElement.querySelector('.pf-resizable__handle');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();

    expect(emitted[0]).toBeGreaterThan(40);
  });
});
