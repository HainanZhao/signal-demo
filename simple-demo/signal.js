// A global variable to hold the currently running effect
let currentEffect = null;

// The signal function creates a reactive value
function signal(initialValue) {
  let _value = initialValue;
  const subscribers = new Set();

  const s = {
    get() {
      if (currentEffect) {
        subscribers.add(currentEffect);
      }
      return _value;
    },
    set(newValue) {
      if (newValue !== _value) {
        _value = newValue;
        // Notify all subscribers
        subscribers.forEach(effect => effect());
      }
    }
  };
  return s;
}

// The effect function runs a piece of code and re-runs it when dependencies change
function effect(fn) {
  const _effect = () => {
    currentEffect = _effect;
    fn();
    currentEffect = null;
  };
  _effect();
}

// The computed function creates a derived signal
function computed(fn) {
  const s = signal(0); // Initial value doesn't matter, it will be recomputed
  effect(() => {
    s.set(fn());
  });
  return {
    get() {
      return s.get();
    }
  };
}
