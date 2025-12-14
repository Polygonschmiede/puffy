import { ResourceLoader } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PfTable } from 'pf';

@Component({
  selector: 'pf-table-host',
  imports: [PfTable],
  template: `
    <pf-table>
      <thead><tr><th>Col</th></tr></thead>
      <tbody><tr><td>Row</td></tr></tbody>
    </pf-table>
  `
})
class PfTableHostComponent {}

describe('PfTable', () => {
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
      imports: [PfTable, PfTableHostComponent]
    })
      .overrideComponent(PfTable, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders content', () => {
    const fixture = TestBed.createComponent(PfTableHostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Row');
  });
});
