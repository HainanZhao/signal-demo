import {
  Component,
  computed,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  OnInit,
  untracked,
} from '@angular/core';
import { SharedStateService } from '../shared-state.service';

@Component({
  selector: 'app-untracked-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UntrackedChildComponent implements OnInit, OnDestroy {
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
    private zone: NgZone
  ) {
    console.log('ChildComponent created.');
  }

  getValue() {
    return untracked(this.derivedSignal);
  }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      console.warn('[ChildComponent] ==== Manually calling detectChanges() ====');
      this.cdRef.detectChanges();
    }, 1_000);
  }

  ngOnDestroy(): void {
    console.log('ChildComponent destroyed.');
    // Clean up the timer when the component is destroyed.
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
