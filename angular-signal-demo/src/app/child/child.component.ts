import { Component, computed, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit, OnDestroy {

  private timer: any;

  derivedSignal = computed(() => {
    // This log will only run when the source signal changes, NOT every second.
    const currentValue = this.sharedState.sourceSignal() * 2;
    console.log(`[ChildComponent] Computed signal is re-evaluating...`);
    return `Derived value: ${currentValue}`;
  });

  constructor(
    public sharedState: SharedStateService,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone,
  ) {
    console.log('ChildComponent created.');
  }

  ngOnInit(): void {
    // Run a timer outside of Angular's zone to manually trigger change detection every second.
    // This is to demonstrate that `detectChanges()` does NOT cause the computed signal to re-evaluate.
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        console.log('[ChildComponent] Manually calling detectChanges()...');
        this.cdRef.detectChanges();
      }, 10_000);
    });
  }

  ngOnDestroy(): void {
    console.log('ChildComponent destroyed.');
    // Clean up the timer when the component is destroyed.
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
