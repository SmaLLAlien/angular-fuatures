import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-features';

  toggleMenu(menuToggle: HTMLDivElement) {
    menuToggle.classList.toggle('active');
  }
}
