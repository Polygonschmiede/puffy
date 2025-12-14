import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfSwitch } from 'pf';

@Component({
  selector: 'pf-switch-host',
  imports: [PfSwitch],
  template: `<pf-switch [checked]="checked" [label]="label" (checkedChange)="onChange($event)"></pf-switch>`
})
class PfSwitchHostComponent {
  checked = true;
  label = 'Active';
  latest?: boolean;

  onChange(value: boolean): void {
    this.latest = value;
  }
}

describe('PfSwitch', () => {
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
      imports: [PfSwitch, PfSwitchHostComponent]
    })
      .overrideComponent(PfSwitch, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('toggles uncontrolled value and emits', () => {
    const fixture = TestBed.createComponent(PfSwitch);
    const changes: boolean[] = [];
    fixture.componentRef.setInput('label', 'Toggle me');
    fixture.componentRef.instance.checkedChange.subscribe((value) => changes.push(value));

    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    button?.click();
    fixture.detectChanges();

    expect(changes).toEqual([true]);
    expect(button?.getAttribute('aria-checked')).toBe('true');
  });

  it('emits when controlled but keeps input-driven state', () => {
    const fixture = TestBed.createComponent(PfSwitchHostComponent);
    fixture.detectChanges();

    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    button?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.latest).toBe(false);
    expect(button?.getAttribute('aria-checked')).toBe('true');
  });
});
