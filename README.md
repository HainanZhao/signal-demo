# Signal Demonstration

This repository contains a simple, vanilla JavaScript implementation of a reactive programming pattern, often referred to as "signals." This pattern allows you to create reactive values and automatically re-run code that depends on those values when they change.

## What is Reactive Programming? (For Beginners)

Imagine you have a spreadsheet where cell C1 contains the formula `=A1 + B1`. When you change the value in A1 or B1, cell C1 automatically updates to show the new result. You don't have to manually recalculate C1 - the spreadsheet does it for you!

Reactive programming works similarly in code. Instead of manually updating everything when data changes, the system automatically keeps everything in sync. This is what "signals" help us achieve in JavaScript.

## How it Works

The core idea revolves around three main functions: `signal`, `effect`, and `computed`. Think of them as building blocks for creating reactive applications.

### `signal(initialValue)` - The Data Container

A `signal` is like a smart box that holds a value. What makes it "smart" is that it can remember who is interested in its value and notify them when the value changes.

**Real-world analogy**: Think of a signal like a news channel. The news channel (signal) broadcasts information (the value), and viewers (effects and computed values) automatically get updates when there's breaking news (value changes).

- **`get()`**: This is how you "read" or "subscribe to" the signal's current value. When an `effect` or `computed` function calls `get()` on a signal, it's like saying "Hey, I want to know whenever this value changes!"
- **`set(newValue)`**: This is how you update the signal's value. When you call `set()`, the signal automatically notifies everyone who called `get()` before, telling them "The value changed, you should update yourself!"

### `effect(fn)` - The Side Effect Handler

An `effect` is a function that runs automatically whenever the signals it depends on change. It's perfect for doing things like updating the user interface, sending network requests, or logging information.

**Programming analogy**: Think of an effect like a **setup callback function** that you register to listen for changes. Just like how you might set up an event listener (`button.addEventListener('click', callback)`), an effect is a callback that gets triggered whenever its dependencies change.

**Real-world analogy**: Think of an effect like a security guard who monitors multiple alarm systems (signals). Whenever any alarm goes off (signal value changes), the security guard automatically responds (the effect function runs).

**Comparison to familiar patterns**:
```javascript
// Traditional event listener (manual setup)
button.addEventListener('click', () => {
    console.log('Button clicked!');
});

// Effect (automatic setup based on dependencies)
effect(() => {
    console.log('Counter value:', counter.get()); // Automatically runs when counter changes
});
```

**Example use cases**:
- Updating a text element in HTML when a username changes
- Sending an API request when a search query changes
- Logging debug information when any value changes

### `computed(fn)` - The Derived Value

A `computed` value is like having a formula in a spreadsheet. It automatically calculates a new value based on other signals, and when those signals change, the computed value recalculates itself.

**Real-world analogy**: Think of a computed value like a calculator that's connected to multiple input devices. When any input changes, the calculator automatically shows the new result.

**Example use cases**:
- Calculating the total price (including tax) when the base price or tax rate changes
- Creating a full name from first name and last name signals
- Computing whether a form is valid based on multiple input fields

## How Signals Work Together (Visual Guide)

```mermaid
graph TD
    A[signal value] --> B[get method called]
    B --> C[effect function]
    B --> D[computed function]
    C --> E[Side Effects<br/>DOM updates, logging, etc.]
    D --> F[new computed signal]
    F --> B
    G[set new value] --> A
    A --> H{Notify all subscribers}
    H --> C
    H --> D
```

## Step-by-Step Explanation (Beginner-Friendly)

Let's walk through what happens in the diagram above:

### Step 1: Creating and Reading Signals
1. **`signal(value)`** - You create a signal with an initial value (like a variable, but smarter)
2. **`get()`** - When your code reads the signal's value, the signal remembers "who asked"

### Step 2: Setting Up Automatic Reactions
3. **`effect(fn)`** - You create a function that should run whenever certain signals change
4. **`computed(fn)`** - You create a derived value that depends on other signals

### Step 3: The Magic Happens
5. **`set(newValue)`** - When you change a signal's value...
6. **Notify Subscribers** - The signal automatically tells everyone who was listening
7. **Auto-Update** - All effects and computed values automatically re-run with the new data

### A Simple Example to Understand

Imagine you're building a shopping cart:

```javascript
// Step 1: Create signals for your data
const price = signal(10);        // Item costs $10
const quantity = signal(2);      // User wants 2 items
const taxRate = signal(0.08);    // 8% tax

// Step 2: Create computed values that depend on the signals
const subtotal = computed(() => price.get() * quantity.get());
const tax = computed(() => subtotal.get() * taxRate.get());
const total = computed(() => subtotal.get() + tax.get());

// Step 3: Create effects that update the user interface
effect(() => {
    document.getElementById('total').textContent = `$${total.get().toFixed(2)}`;
});

// Step 4: When data changes, everything updates automatically!
quantity.set(3); // User changes quantity to 3
// The total on the page automatically updates to $32.40!
```

**What makes this powerful**:
- You only change `quantity.set(3)` in one place
- The `subtotal` automatically recalculates: 10 × 3 = 30
- The `tax` automatically recalculates: 30 × 0.08 = 2.40
- The `total` automatically recalculates: 30 + 2.40 = 32.40
- The webpage automatically updates to show $32.40

You don't have to manually update each calculation or remember to update the display - it all happens automatically!

## Key Concepts for Computer Science Students

**Dependency Tracking**: The system automatically figures out what depends on what. When `quantity` changes, it knows to update `subtotal`, which triggers updates to `tax` and `total`.

**Observer Pattern**: This is a classic design pattern where objects (signals) maintain a list of dependents (effects/computed) and notify them of state changes.

**Declarative Programming**: Instead of writing step-by-step instructions (imperative), you declare relationships between data (declarative). The system figures out the execution order.

**Reactive Programming**: This is a programming paradigm oriented around data flows and the propagation of change - perfect for user interfaces and real-time applications.

---

## Angular Signal Implementation & Findings

The vanilla JavaScript example was migrated to a modern Angular application to demonstrate how the same concepts apply within a major framework and to investigate some of its specific behaviors. Due to issues with the development environment, the Angular CLI could not be used, so the component files were created manually.

The core logic was replicated in a `SignalDemoComponent`. Here is the component's TypeScript code:

**`signal-demo.component.ts`**
```typescript
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
  // The mistake: Reading the signal's value outside of a reactive context.
  // This `countValue` is a static snapshot, not a reactive binding.
  countValue = this.countSignal();

  increment() {
    this.countSignal.set(this.countSignal() + 1);
    console.log('Incrementing count to:', this.countSignal());
    console.log("But the 'Incorrect Usage' UI will not update. Check the console logs.");
  }
}
```

And the corresponding template:

**`signal-demo.component.html`**
```html
<h1>Signal Demonstration (Angular)</h1>
<p>This is a simple demonstration of how signals are implemented and triggered in Angular. The console will show the effects being run.</p>

<div class="container">
  <div class="section">
    <h2>Correct Usage</h2>
    <div id="correct-usage">
      <p>First name: <span>{{ firstName() }}</span></p>
      <p>Last name: <span>{{ lastName() }}</span></p>
      <p>Full name: <span>{{ fullName() }}</span></p>
      <button (click)="changeName()">Change First Name</button>
    </div>
  </div>

  <div class="section">
    <h2>Incorrect Usage</h2>
    <div id="incorrect-usage">
      <!-- This binds to the static `countValue` property, not the signal itself. -->
      <p>Count: <span>{{ countValue }}</span></p>
      <button (click)="increment()">Increment</button>
      <p class="warning">
        The count in the UI will not update because we are displaying a static variable (`countValue`)
        that was read from the signal only once during component initialization.
        The `countSignal` itself is updating, but the template isn't subscribed to it.
        Check the console to see the signal's real value.
      </p>
    </div>
  </div>
</div>
```

### Investigation Findings

Based on a review of the official Angular documentation, here are the answers to the initial questions.

#### 1. When are effects/computed signals evaluated?

The evaluation strategy depends on whether you are using a `computed` signal or an `effect`.

*   **Computed Signals (`computed`)**: They are **lazily evaluated**. This means the derivation function (the code inside `computed(...)`) does *not* run immediately when a dependency changes. Instead, it only runs when the computed signal's value is read for the first time after a dependency has been updated. The result is then cached (memoized) and returned on subsequent reads until another dependency changes, which invalidates the cache.

*   **Effects (`effect`)**: They run **asynchronously**. When a signal that an effect depends on is updated, the effect is not executed immediately. It is scheduled to run as part of Angular's change detection cycle. This allows the framework to batch multiple signal changes into a single effect execution, improving performance and preventing redundant runs.

#### 2. How does Angular manage signal "subscriptions" when a component is destroyed?

Angular handles this **automatically** through its dependency injection and component lifecycle management.

*   When an `effect` is created within a component (e.g., in its `constructor`), Angular ties the effect's lifetime to that component's lifetime.
*   When the component is destroyed (for example, because an `*ngIf` becomes `false`), Angular automatically destroys the effect as well.
*   This automatic cleanup mechanism prevents memory leaks. You do not need to manually "unsubscribe" from signals in the way you would with RxJS Subscriptions in `ngOnDestroy`. The framework manages the lifecycle of the reactive dependency graph for you.

#### Follow-up: What about `computed` signals?

The same automatic cleanup applies to `computed` signals. A computed signal is aware of the context where it was created. If it's created in a component, its lifecycle is bound to that component.

To demonstrate this, a `ChildComponent` was created with a `computed` signal that logs to the console whenever it re-evaluates. A parent component can create or destroy this `ChildComponent`.

**The behavior is as follows:**
1.  When the `ChildComponent` is created, the `computed` signal is also created.
2.  When the source signal (in a shared service) is updated while the `ChildComponent` exists, the `console.log` inside the `computed` function runs, and the UI updates.
3.  When the `ChildComponent` is destroyed (via `*ngIf="false"`), the `computed` signal is also destroyed.
4.  Now, when the source signal is updated, **nothing is logged from the child**, because the `computed` signal no longer exists to react to the change.

This confirms that Angular's signals are robustly tied to the component lifecycle, preventing orphaned computations and potential memory leaks.
