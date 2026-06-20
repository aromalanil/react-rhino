export type Listener = () => void;

export class Store<TState extends Record<string, any>> {
  private state: TState;

  private listeners: Map<keyof TState, Set<Listener>>;

  constructor(initialState: TState) {
    this.state = { ...initialState };
    this.listeners = new Map();
  }

  getState<K extends keyof TState>(key: K): TState[K] {
    return this.state[key];
  }

  setState<K extends keyof TState>(
    key: K,
    updater: TState[K] | ((prev: TState[K]) => TState[K]),
  ): void {
    const prevValue = this.state[key];
    const newValue =
      typeof updater === 'function'
        ? (updater as (prev: TState[K]) => TState[K])(prevValue)
        : updater;

    if (!Object.is(prevValue, newValue)) {
      this.state[key] = newValue;
      const keyListeners = this.listeners.get(key);
      if (keyListeners) {
        keyListeners.forEach((listener) => listener());
      }
    }
  }

  subscribe<K extends keyof TState>(key: K, listener: Listener): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);

    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }
}
