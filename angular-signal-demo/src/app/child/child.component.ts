import { Component, computed, OnDestroy } from '@angular/core';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
})
export class ChildComponent implements OnDestroy {

  // Create a computed signal that depends on the service's signal
  derivedSignal = computed(() => {
    // This log is the key to our investigation.
    // It will only run when the component exists and the source signal changes.
    console.log('[ChildComponent] Computed signal is re-evaluating...');
    return `Derived value: ${this.sharedState.sourceSignal() * 2}`;
  });

  constructor(public sharedState: SharedStateService) {
    console.log('ChildComponent created.');
  }

  ngOnDestroy(): void {
    console.log('ChildComponent destroyed.');
  }
}
