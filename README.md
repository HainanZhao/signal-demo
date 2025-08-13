# Signal Demonstration

This repository contains a simple, vanilla JavaScript implementation of a reactive programming pattern, often referred to as "signals." This pattern allows you to create reactive values and automatically re-run code that depends on those values when they change.

## How it Works

The core idea revolves around three main functions: `signal`, `effect`, and `computed`.

### `signal(initialValue)`

A `signal` is a reactive data source. It holds a value and can notify "subscribers" when its value changes.

- **`get()`**: When an `effect` or `computed` function reads a signal's value using `get()`, that `effect`/`computed` is automatically registered as a subscriber to this signal.
- **`set(newValue)`**: When a signal's value is updated using `set()`, it notifies all its registered subscribers, causing them to re-run.

### `effect(fn)`

An `effect` is a function that runs once initially and then automatically re-runs whenever any of the signals it depends on (i.e., whose `get()` method was called during its execution) change. This is useful for performing side effects, like updating the DOM or logging to the console.

### `computed(fn)`

A `computed` value is a signal whose value is derived from one or more other signals. It's essentially an `effect` that updates another `signal`. When its dependencies change, its internal function `fn` is re-executed, and its own value is updated, which in turn can trigger other `effect`s or `computed`s that depend on it.

## Reactivity Flow (Mermaid Diagram)

```mermaid
graph TD
    A[signal(value)] --> B[get]
    B --> C[effect(fn)];
    B --> D[computed(fn)];
    C --> E[Side Effect (e.g., DOM Update)];
    D --> F[signal(computedValue)];
    F --> B;
    G[signal.set(newValue)] --> H{Notify Subscribers};
    H --> C;
    H --> D;
```

**Explanation of the Mermaid Diagram:**

- `signal(value)`: Represents a reactive signal holding a value.
- `get()`: When a signal's value is accessed, it establishes a dependency.
- `effect(fn)`: A function that runs and tracks its dependencies. When dependencies change, it re-runs, leading to side effects.
- `computed(fn)`: A function that derives a new value from other signals. It also tracks dependencies and updates its own internal signal.
- `Side Effect (e.g., DOM Update)`: The result of an `effect` running, often interacting with the outside world.
- `signal(computedValue)`: The internal signal managed by a `computed` function, which can in turn be a dependency for other `effect`s or `computed`s.
- `signal.set(newValue)`: When a signal's value is updated.
- `Notify Subscribers`: The process where a signal informs all its dependent `effect`s and `computed`s to re-run.
