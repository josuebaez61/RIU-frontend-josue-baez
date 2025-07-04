import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-main-layout',
  imports: [MatToolbarModule, RouterOutlet],
  template: `
    <mat-toolbar>Heros App By Josué Baez</mat-toolbar>
    <main class="main-content p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: ``,
})
export class MainLayout {}
