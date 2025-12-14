import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfCommand } from 'pf';

const items = [
  { label: 'Open Settings', value: 'settings' },
  { label: 'New File', value: 'new-file' }
];

describe('PfCommand', () => {
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
      imports: [PfCommand]
    })
      .overrideComponent(PfCommand, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('filters and selects item', () => {
    const fixture = TestBed.createComponent(PfCommand);
    fixture.componentRef.setInput('items', items);
    fixture.componentRef.setInput('open', true);
    const selections: string[] = [];
    fixture.componentRef.instance.selectCommand.subscribe((value) => selections.push(value));
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Open';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    const option: HTMLButtonElement = fixture.nativeElement.querySelector('button.pf-command__option');
    option.click();
    fixture.detectChanges();

    expect(selections).toEqual(['settings']);
  });
});
