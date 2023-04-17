import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme: HTMLAnchorElement = document.querySelector('link#theme');

  private theme: string = localStorage.theme || 'megna';

  constructor() {
      const url = `./assets/css/colors/${this.theme}.css`;
      this.linkTheme.setAttribute('href', url);
   }

  changeTheme(theme: string) {
    localStorage.setItem('theme', theme);
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const theme = localStorage.theme;
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    links.forEach((element: HTMLAnchorElement) => {
      element.classList.remove('working');
      if (element.getAttribute('data-theme') === theme) element.classList.add('working')
    });
  }
}
