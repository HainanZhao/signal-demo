import { Component } from '@angular/core';
import { SignalDemoComponent } from './signal-demo/signal-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignalDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-signal-demo';
}
