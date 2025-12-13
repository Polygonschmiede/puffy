import { ResourceLoader } from '@angular/compiler';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';

class EmptyResourceLoader extends ResourceLoader {
  override get(): Promise<string> {
    return Promise.resolve('');
  }
}

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    providers: [{ provide: ResourceLoader, useClass: EmptyResourceLoader }]
  }
);
