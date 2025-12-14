import { ResourceLoader } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { PfAvatar } from 'pf';

describe('PfAvatar', () => {
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
      imports: [PfAvatar]
    })
      .overrideComponent(PfAvatar, {
        set: { styleUrls: [], styles: [''] }
      })
      .compileComponents();
  });

  it('renders initials when no image is provided', () => {
    const fixture = TestBed.createComponent(PfAvatar);
    fixture.componentRef.setInput('fallback', 'Ada Lovelace');

    fixture.detectChanges();

    const fallback = fixture.nativeElement.querySelector('.pf-avatar__fallback');
    expect(fallback?.textContent?.trim()).toBe('AL');
  });

  it('renders an image when src is provided', () => {
    const fixture = TestBed.createComponent(PfAvatar);
    fixture.componentRef.setInput('src', '/assets/example.png');
    fixture.componentRef.setInput('alt', 'Example user');

    fixture.detectChanges();

    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
    expect(img).not.toBeNull();
    const source =
      img?.getAttribute('ng-reflect-ng-src') ?? img?.getAttribute('src') ?? '';
    expect(source).toContain('/assets/example.png');
    expect(img?.alt).toBe('Example user');
  });
});
