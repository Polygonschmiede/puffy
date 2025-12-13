import { ResourceLoader } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { Pf } from './pf';

describe('Pf', () => {
  let component: Pf;
  let fixture: ComponentFixture<Pf>;
  let testEnvInitialized = false;

  beforeAll(() => {
    if (testEnvInitialized) {
      return;
    }

    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting(),
      {
        providers: [
          {
            provide: ResourceLoader,
            useValue: { get: () => Promise.resolve('') }
          }
        ]
      }
    );
    testEnvInitialized = true;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
