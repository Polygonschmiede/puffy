import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfCalendar } from 'pf';

describe('PfCalendar', () => {
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
      imports: [PfCalendar]
    })
      .overrideComponent(PfCalendar, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('emits selected date', () => {
    const fixture = TestBed.createComponent(PfCalendar);
    const emitted: string[] = [];
    fixture.componentRef.instance.valueChange.subscribe((value) => emitted.push(value));
    fixture.detectChanges();

    const day: HTMLButtonElement = fixture.nativeElement.querySelector('.pf-calendar__day');
    day.click();
    fixture.detectChanges();

    expect(emitted.length).toBe(1);
  });
});
