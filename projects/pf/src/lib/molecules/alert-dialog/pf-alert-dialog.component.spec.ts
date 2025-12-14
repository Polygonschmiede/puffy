import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfAlertDialog } from 'pf';

describe('PfAlertDialog', () => {
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
      imports: [PfAlertDialog]
    })
      .overrideComponent(PfAlertDialog, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits confirm', () => {
    const fixture = TestBed.createComponent(PfAlertDialog);
    const confirmed: boolean[] = [];
    fixture.componentRef.instance.confirmed.subscribe(() => confirmed.push(true));

    fixture.detectChanges();

    fixture.nativeElement.querySelector('button')?.click();
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.pf-alert-dialog__button');
    buttons[buttons.length - 1]?.click();
    fixture.detectChanges();

    expect(confirmed).toEqual([true]);
  });
});
