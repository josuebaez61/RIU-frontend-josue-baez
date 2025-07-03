import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared';

@Component({
  selector: 'app-main-layout',
  imports: [SharedModule, RouterOutlet],
  template: `
    <mat-toolbar>Heros</mat-toolbar>
    <main class="main-content p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: ``,
})
export class MainLayout {}
