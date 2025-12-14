import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfPanelContainer } from './pf-panel-container.component';

describe('PfPanelContainer', () => {
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
      imports: [PfPanelContainer]
    })
      .overrideComponent(PfPanelContainer, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('applies grid template columns', () => {
    const fixture = TestBed.createComponent(PfPanelContainer);
    fixture.componentRef.setInput('columns', 4);
    fixture.detectChanges();

    const grid: HTMLElement = fixture.nativeElement.querySelector('.pf-panel-container__grid');
    expect(grid.style.gridTemplateColumns).toContain('repeat(4');
  });
});
