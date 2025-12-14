import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfMenubar } from 'pf';

describe('PfMenubar', () => {
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
      imports: [PfMenubar]
    })
      .overrideComponent(PfMenubar, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits selected item', () => {
    const fixture = TestBed.createComponent(PfMenubar);
    const selected: string[] = [];
    fixture.componentRef.setInput('items', [
      { id: 'file', label: 'File' },
      { id: 'edit', label: 'Edit' }
    ]);
    fixture.componentRef.instance.itemSelected.subscribe((item) => selected.push(item.id));

    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('button')[1]?.click();
    fixture.detectChanges();

    expect(selected).toEqual(['edit']);
  });
});
