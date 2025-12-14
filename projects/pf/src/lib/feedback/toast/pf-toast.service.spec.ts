import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfToastService } from './pf-toast.service';

describe('PfToastService', () => {
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

  it('adds and removes toasts', () => {
    const service = TestBed.inject(PfToastService);

    const id = service.show({ title: 'Saved' });
    expect(service.toasts().length).toBe(1);

    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });
});
