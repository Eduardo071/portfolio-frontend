import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  scrolled  = signal(false);
  mobileOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMobile() {
    this.mobileOpen.update(v => !v);
  }

  closeMenu() {
    this.mobileOpen.set(false);
  }
}
