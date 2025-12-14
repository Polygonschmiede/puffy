import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfIconButton } from 'pf';

@Component({
  selector: 'pf-icon-button-host',
  imports: [PfIconButton],
  template: `<pf-icon-button><span class="icon">+</span></pf-icon-button>`
})
class PfIconButtonHostComponent {}

describe('PfIconButton', () => {
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
      imports: [PfIconButton, PfIconButtonHostComponent]
    })
      .overrideComponent(PfIconButton, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders projected content', () => {
    const fixture = TestBed.createComponent(PfIconButtonHostComponent);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button');
    expect(btn?.textContent?.trim()).toBe('+');
  });
});
