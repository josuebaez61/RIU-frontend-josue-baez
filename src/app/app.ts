import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingIndicator } from './shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingIndicator],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
