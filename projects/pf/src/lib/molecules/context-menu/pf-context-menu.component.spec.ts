import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfContextMenu } from 'pf';

@Component({
  selector: 'pf-context-menu-host',
  imports: [PfContextMenu],
  template: `
    <pf-context-menu [items]="items" (itemSelected)="selected = $event.id">
      <div class="area">Right click</div>
    </pf-context-menu>
  `
})
class PfContextMenuHostComponent {
  items = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' }
  ];
  selected?: string;
}

describe('PfContextMenu', () => {
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
      imports: [PfContextMenu, PfContextMenuHostComponent]
    })
      .overrideComponent(PfContextMenu, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('opens and selects item', () => {
    const fixture = TestBed.createComponent(PfContextMenuHostComponent);
    fixture.detectChanges();

    const cm = fixture.debugElement.children[0].componentInstance as PfContextMenu;
    cm.openMenu(new MouseEvent('contextmenu', { clientX: 10, clientY: 10 }));
    fixture.detectChanges();

    fixture.nativeElement.querySelectorAll('.pf-context-menu__item')[1]?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.selected).toBe('b');
  });
});
