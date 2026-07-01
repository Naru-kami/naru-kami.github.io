import React, { createContext, useContext, useSyncExternalStore } from "react";

export default function createFastContext<Store>(initialState: Store, storageKey?: string) {
  const store = { current: initialState };
  const subscribers = new Set<() => void>();

  const get = () => store.current;

  const set = (value: Partial<Store> | ((prev: Store) => Partial<Store>)) => {
    const newvalue = typeof value === 'function' ? value(store.current) : value;

    storageKey && localStorage.setItem(storageKey, JSON.stringify({ ...store.current, ...newvalue }));
    store.current = { ...store.current, ...newvalue };

    subscribers.forEach(callback => callback());
  };

  const subscribe = (callback: () => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  type UseStoreDataReturnType = {
    get: () => Store;
    set: (value: Partial<Store> | ((prev: Store) => Partial<Store>)) => void;
    subscribe: (callback: () => void) => () => void;
  };

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <StoreContext.Provider value={{ get, set, subscribe }}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput
  ): [SelectorOutput, (value: Partial<Store> | ((prev: Store) => Partial<Store>)) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => selector(store.get()),
      () => selector(initialState),
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore
  };
}