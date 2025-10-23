import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { ThemeInfo } from '@app/core/models/theme-info';

@Injectable({
  'providedIn': 'root'
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _defaultTheme = 'dark';
  // NOTE: Do not forget to add these theme name (key of this map) to global style.css file
  public readonly allThemes = new Map<string, ThemeInfo>([
    [
      this._defaultTheme,
      {
        displayName: 'Dark',
        colorBaseClass: 'bg-[#1D232A]',
        colorBaseContentClass: 'bg-[#ECF9FF]',
        colorPrimaryClass: 'bg-indigo-500',
        colorSecondaryClass: 'bg-pink-500',
        colorAccentClass: 'bg-teal-400',
      }
    ],
    [
      'night',
      {
        displayName: 'Night',
        colorBaseClass: 'bg-[#0F172A]',
        colorBaseContentClass: 'bg-[#C9CBD0]',
        colorPrimaryClass: 'bg-[#3ABDF7]',
        colorSecondaryClass: 'bg-[#818CF8]',
        colorAccentClass: 'bg-[#F471B5]',
      }
    ],
    [
      'halloween',
      {
        displayName: 'Halloween',
        colorBaseClass: 'bg-[#1B1816]',
        colorBaseContentClass: 'bg-[#CDCDCD]',
        colorPrimaryClass: 'bg-[#FF8F00]',
        colorSecondaryClass: 'bg-[#7A00C2]',
        colorAccentClass: 'bg-[#42AA00]',
      }
    ],
    [
      'dim',
      {
        displayName: 'Dim',
        colorBaseClass: 'bg-[#2A303C]',
        colorBaseContentClass: 'bg-[#B2CCD6]',
        colorPrimaryClass: 'bg-[#9FE88D]',
        colorSecondaryClass: 'bg-[#FF7D5D]',
        colorAccentClass: 'bg-[#C792E9]',
      }
    ],
    [
      'synthwave',
      {
        displayName: 'Synthwave',
        colorBaseClass: 'bg-[#09002F]',
        colorBaseContentClass: 'bg-indigo-300',
        colorPrimaryClass: 'bg-pink-400',
        colorSecondaryClass: 'bg-sky-300',
        colorAccentClass: 'bg-orange-400',
      }
    ],
  ]);
  private readonly _currentTheme = signal<string>(this._defaultTheme);

  public get currentTheme() {
    return this._currentTheme.asReadonly();
  }

  constructor() {
    this.loadTheme();
  }

  public setTheme(newTheme: string): void {
    if (this._currentTheme() == newTheme) {
      return;
    }
    if (!this.allThemes.has(newTheme)) {
      return;
    }

    this._document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    this._currentTheme.set(newTheme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') ?? '';
    this.setTheme(this.allThemes.has(savedTheme) ? savedTheme : this._defaultTheme);
  }
}
