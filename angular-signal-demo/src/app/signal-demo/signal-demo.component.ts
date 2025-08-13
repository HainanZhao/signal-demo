import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.css'
})
export class SignalDemoComponent {
  // --- Demo 1: Correct and Incorrect Usage ---
  firstName = signal('John');
  lastName = signal('Doe');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  changeName() {
    this.firstName.set('Jane');
  }

  countSignal = signal(0);
  countValue = this.countSignal();

  increment() {
    this.countSignal.set(this.countSignal() + 1);
    console.log('Incrementing count to:', this.countSignal());
    console.log("But the 'Incorrect Usage' UI will not update.");
  }

  // --- Demo 2: Component Destruction and Computed Signal Lifecycle ---
  showChild = signal(false);

  constructor(public sharedState: SharedStateService) {}

  toggleChildComponent() {
    this.showChild.update(v => !v);
  }

  resetSourceSignal() {
    this.sharedState.sourceSignal.set(0);
    console.log('--- Source signal updated. --- ', this.sharedState.sourceSignal());
  }
}
