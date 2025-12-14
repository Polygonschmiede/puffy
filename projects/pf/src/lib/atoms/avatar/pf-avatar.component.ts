import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type PfAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'pf-avatar',
  imports: [NgOptimizedImage],
  template: `
    @if (hasImage()) {
      <img
        [ngSrc]="src()!"
        [alt]="alt()"
        [width]="sizePixels()"
        [height]="sizePixels()"
        class="pf-avatar__image"
      />
    } @else {
      <span class="pf-avatar__fallback">{{ initials() }}</span>
    }
  `,
  styleUrl: './pf-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'avatarClass()'
  }
})
export class PfAvatar {
  readonly src = input<string | null | undefined>();
  readonly alt = input('Avatar');
  readonly fallback = input<string | undefined>();
  readonly size = input<PfAvatarSize>('md');

  protected readonly avatarClass = computed(() => `pf-avatar pf-avatar--${this.size()}`);

  protected readonly hasImage = computed(() => Boolean(this.src()));

  protected readonly sizePixels = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 32;
      case 'lg':
        return 64;
      case 'xl':
        return 96;
      default:
        return 48;
    }
  });

  protected readonly initials = computed(() => {
    const value = this.fallback()?.trim();
    if (!value) {
      return '?';
    }

    const letters = value
      .split(/\s+/)
      .filter(Boolean)
      .map((segment) => segment[0]?.toUpperCase() ?? '')
      .join('')
      .slice(0, 2);

    return letters || '?';
  });
}
