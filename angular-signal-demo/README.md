# AngularSignalDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Angular Signals

This project demonstrates the use of Angular Signals, a new reactive programming model in Angular.

### Key Concepts

*   **Signals (signal):** A signal is a wrapper around a value that can notify interested consumers when that value changes.
*   **Computed Signals (computed):** A computed signal derives its value from other signals. It is lazily evaluated and memoized.
*   **Effects (effect):** An effect is an operation that runs whenever one or more signal values change.

### Signals and Change Detection

One of the key features of signals is their integration with Angular's change detection mechanism.

#### Computed Signals and `ChangeDetectionStrategy.OnPush`

A common misconception is that `ChangeDetectionStrategy.OnPush` will prevent re-rendering of a component if its inputs have not changed. While this is true for traditional input binding, Angular Signals introduce a new dynamic.

When a component's template reads a signal, Angular creates a dependency between that component and the signal. This is true for both regular signals and computed signals.

When a signal's value changes, it notifies all its dependents. If a dependent is a component, Angular schedules that component for change detection, even if it is configured with `OnPush`. This means that any change to a signal that is read in a component's template will cause that component to be checked, and potentially re-rendered, regardless of its change detection strategy.

In essence, signals provide a more granular way to trigger change detection. You can think of it as every signal change that is used in a template implicitly triggering an "onPush" event for that specific component. This allows for highly efficient updates, as only the components that are truly affected by a state change are re-evaluated.

This project's `UntrackedChildComponent` demonstrates this. It uses `ChangeDetectionStrategy.OnPush`, but its view is updated whenever the computed signal it depends on changes.