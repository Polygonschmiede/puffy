import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfDatePicker } from 'pf';

describe('PfDatePicker', () => {
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
      imports: [PfDatePicker]
    })
      .overrideComponent(PfDatePicker, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits selected date and closes', () => {
    const fixture = TestBed.createComponent(PfDatePicker);
    const emitted: string[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const trigger: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    trigger.click();
    fixture.detectChanges();

    const day: HTMLButtonElement = fixture.nativeElement.querySelector('.pf-calendar__day');
    day.click();
    fixture.detectChanges();

    expect(emitted.length).toBe(1);
  });
});
