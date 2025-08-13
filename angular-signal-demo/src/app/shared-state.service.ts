import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  // A source signal that will be updated by the parent
  sourceSignal = signal(0);

  constructor() { }
}
