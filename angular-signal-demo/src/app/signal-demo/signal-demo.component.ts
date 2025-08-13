import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.css'
})
export class SignalDemoComponent {
  // Correct Usage Demo
  firstName = signal('John');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  changeName() {
    this.firstName.set('Jane');
  }

  // Incorrect Usage Demo
  countSignal = signal(0);
  // The mistake: Reading the signal's value outside of a reactive context (like a template or computed/effect).
  // This `countValue` is a static snapshot, not a reactive binding.
  countValue = this.countSignal();

  increment() {
    this.countSignal.set(this.countSignal() + 1);
    console.log('Incrementing count to:', this.countSignal());
    console.log("But the 'Incorrect Usage' UI will not update. Check the console logs.");
  }
}
