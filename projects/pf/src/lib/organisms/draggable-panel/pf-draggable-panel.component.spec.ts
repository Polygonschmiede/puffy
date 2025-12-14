import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfDraggablePanel } from './pf-draggable-panel.component';

describe('PfDraggablePanel', () => {
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
      imports: [PfDraggablePanel]
    })
      .overrideComponent(PfDraggablePanel, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits drag start and end', () => {
    const fixture = TestBed.createComponent(PfDraggablePanel);
    const starts: (string | undefined)[] = [];
    const ends: (string | undefined)[] = [];
    fixture.componentRef.setInput('id', 'panel-1');
    fixture.componentRef.instance.dragStart.subscribe((v) => starts.push(v));
    fixture.componentRef.instance.dragEnd.subscribe((v) => ends.push(v));
    fixture.detectChanges();

    const handle: HTMLElement = fixture.nativeElement.querySelector('.pf-draggable-panel__handle');
    handle.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    window.dispatchEvent(new PointerEvent('pointerup'));
    fixture.detectChanges();

    expect(starts).toEqual(['panel-1']);
    expect(ends).toEqual(['panel-1']);
  });
});
