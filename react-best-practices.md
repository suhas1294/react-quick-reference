# React Patterns & Common Pitfalls Guide

A comprehensive guide to common React patterns, pitfalls, and their solutions based on real-world scenarios.

---

## Table of Contents
1. [State Initialization vs State Syncing](#1-state-initialization-vs-state-syncing)
2. [useEffect Dependency Issues](#2-useeffect-dependency-issues)
3. [Infinite Loop in componentDidUpdate](#3-infinite-loop-in-componentdidupdate)
4. [React State Batching](#4-react-state-batching)
5. [Stale Closures in Callbacks](#5-stale-closures-in-callbacks)
6. [Deep Comparison Pitfalls](#6-deep-comparison-pitfalls)
7. [Component Remounting Strategies](#7-component-remounting-strategies)
8. [Redux State Updates](#8-redux-state-updates)
9. [Prop Updates Not Reflecting](#9-prop-updates-not-reflecting)
10. [Race Conditions](#10-race-conditions)

---

## 1. State Initialization vs State Syncing

### ❌ Problem: Component doesn't update when props change

```typescript
// WRONG - State initialized once, never syncs with prop changes
const MyComponent = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  return <div>{data.value}</div>;
  // When parent passes new initialData, UI still shows old data!
};
```

### ✅ Solution: Add useEffect to sync state with props

```typescript
// CORRECT - State syncs when props change
const MyComponent = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  // Sync internal state when prop changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return <div>{data.value}</div>;
};
```

### 🎯 When to Use
- Component needs internal state derived from props
- State can be modified internally but should reset when prop changes
- Form components that initialize from server data

### 💡 Alternative: Use props directly if no internal modifications needed

```typescript
// BEST - No state needed if just displaying
const MyComponent = ({ data }) => {
  return <div>{data.value}</div>;
};
```

---

## 2. useEffect Dependency Issues

### ❌ Problem: Missing dependencies cause stale data

```typescript
// WRONG - callback uses stale count value
const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Always logs 0!
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Missing count dependency

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
};
```

### ✅ Solution 1: Add dependency

```typescript
// CORRECT - Add count to dependencies
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Logs current count
  }, 1000);
  return () => clearInterval(timer);
}, [count]); // Effect re-runs when count changes
```

### ✅ Solution 2: Use functional setState

```typescript
// BETTER - Use functional update, no dependency needed
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => {
      console.log(prev); // Always has latest value
      return prev + 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}, []); // Empty deps is safe now
```

---

## 3. Infinite Loop in componentDidUpdate

### ❌ Problem: componentDidUpdate triggers itself infinitely

```typescript
// WRONG - Infinite loop!
componentDidUpdate(prevProps) {
  if (this.props.cssGenerationInProgress) {
    this.updateData(); // Updates state/props
    // Next render: cssGenerationInProgress still true → calls updateData again → infinite loop
  }
}
```

### ✅ Solution: Check if value CHANGED, not just its current state

```typescript
// CORRECT - Only run when value transitions
componentDidUpdate(prevProps) {
  const prev = prevProps.cssGenerationInProgress;
  const current = this.props.cssGenerationInProgress;

  // Only run when transitioning from false → true
  if (current && !prev) {
    this.updateData();
  }
}
```

### 🎯 Pattern: Always compare with prevProps/prevState

```typescript
componentDidUpdate(prevProps, prevState) {
  // ✅ Check what CHANGED
  if (prevProps.userId !== this.props.userId) {
    this.fetchUserData(this.props.userId);
  }

  // ❌ Don't just check current value
  // if (this.props.userId) { this.fetchUserData(); } // BAD!
}
```

---

## 4. React State Batching

### ❌ Problem: Synchronous state updates are batched

```typescript
// WRONG - Both setState calls batched, no re-render in between
const toggleComponent = () => {
  setShowComponent(false);  // Queued
  setShowComponent(true);   // Queued
  // Net result: no change, component never unmounts/remounts
};
```

### ✅ Solution 1: Use setTimeout to break batching

```typescript
// WORKS - But not ideal
const toggleComponent = () => {
  setShowComponent(false);
  setTimeout(() => setShowComponent(true), 0); // Separate render cycle
};
```

### ✅ Solution 2: Use key prop for forced remount

```typescript
// BETTER - Use key to force remount
const [remountKey, setRemountKey] = useState(0);

const remountComponent = () => {
  setRemountKey(prev => prev + 1); // Change key to force remount
};

return <MyComponent key={remountKey} />;
```

### ✅ Solution 3: Use React 18's flushSync (advanced)

```typescript
import { flushSync } from 'react-dom';

const toggleComponent = () => {
  flushSync(() => {
    setShowComponent(false); // Forces immediate render
  });
  setShowComponent(true); // Separate render
};
```

---

## 5. Stale Closures in Callbacks

### ❌ Problem: Callbacks capture old state values

```typescript
// WRONG - onClick captures initial count value
const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setTimeout(() => {
      console.log(count); // Logs old value!
    }, 3000);
  };

  return <button onClick={handleClick}>Log count</button>;
};
```

### ✅ Solution 1: Use useCallback with dependencies

```typescript
// CORRECT - useCallback recreates function when count changes
const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setTimeout(() => {
      console.log(count); // Logs current value
    }, 3000);
  }, [count]); // Recreate when count changes

  return <button onClick={handleClick}>Log count</button>;
};
```

### ✅ Solution 2: Use ref for mutable current value

```typescript
// BETTER - Ref always has latest value
const Counter = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count; // Keep ref in sync
  }, [count]);

  const handleClick = () => {
    setTimeout(() => {
      console.log(countRef.current); // Always latest
    }, 3000);
  };

  return <button onClick={handleClick}>Log count</button>;
};
```

---

## 6. Deep Comparison Pitfalls

### ❌ Problem: Comparing objects/arrays by reference

```typescript
// WRONG - Always false even if content is same
useEffect(() => {
  if (prevRules !== currentRules) { // Reference comparison
    // Runs even when content is identical
  }
}, [currentRules]);
```

### ✅ Solution 1: JSON.stringify for simple objects

```typescript
// GOOD for small objects
const didRulesChange = (prev, current) => {
  if (prev === current) return false;
  if (!prev || !current) return true;
  return JSON.stringify(prev) !== JSON.stringify(current);
};
```

**Limitations:**
- Slow for large objects
- Order-sensitive ({"a":1,"b":2} !== {"b":2,"a":1})
- Fails with circular references
- Ignores functions, undefined, Symbols

### ✅ Solution 2: Use deep equality library

```typescript
import isEqual from 'lodash/isEqual';
// or
import { deepEqual } from 'fast-deep-equal';

const didRulesChange = (prev, current) => {
  return !isEqual(prev, current);
};
```

### ✅ Solution 3: Shallow comparison for known structure

```typescript
// BEST for arrays of primitives or simple objects
const didRulesChange = (prev, current) => {
  if (prev.length !== current.length) return true;
  return prev.some((rule, i) => rule.id !== current[i].id);
};
```

---

## 7. Component Remounting Strategies

### Problem: Need to reset component to initial state

### Strategy 1: Change key prop ⭐ RECOMMENDED

```typescript
// BEST - Clean, explicit, no hacks
const [resetKey, setResetKey] = useState(0);

const resetComponent = () => {
  setResetKey(prev => prev + 1);
};

return <ComplexForm key={resetKey} initialData={data} />;
```

**Pros:** Clean, explicit intent, works universally
**Cons:** Full unmount/remount (slow for complex components)

### Strategy 2: Toggle mounting

```typescript
// OKAY - Clear but causes flicker
const [showForm, setShowForm] = useState(true);

const resetComponent = () => {
  setShowForm(false);
  setTimeout(() => setShowForm(true), 0);
};

return showForm && <ComplexForm />;
```

**Pros:** Works, easy to understand
**Cons:** setTimeout hack, visual flicker, not ideal

### Strategy 3: Reset internal state (if component supports it)

```typescript
// BEST IF SUPPORTED - No remount needed
const formRef = useRef();

const resetComponent = () => {
  formRef.current?.reset(); // Component provides reset method
};

return <ComplexForm ref={formRef} />;
```

**Pros:** Fast, no unmount/remount
**Cons:** Requires component to expose reset method

### Strategy 4: Fix the component to sync with props

```typescript
// IDEAL - Component handles prop changes correctly
// Inside ComplexForm:
useEffect(() => {
  // Reset internal state when prop changes
  setFormData(initialData);
}, [initialData]);
```

**Pros:** No parent workarounds needed, component is self-contained
**Cons:** Requires modifying the component

---

## 8. Redux State Updates

### ❌ Problem: Mutating state directly (pre-Redux Toolkit)

```typescript
// WRONG - Direct mutation
const reducer = (state, action) => {
  state.user.name = action.payload; // Mutates state!
  return state; // React won't detect change
};
```

### ✅ Solution: Redux Toolkit with Immer

```typescript
// CORRECT - Redux Toolkit uses Immer, mutations are safe
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', age: 0 },
  reducers: {
    updateUser(state, action) {
      state.name = action.payload.name; // Safe with Immer!
      state.age = action.payload.age;
    },
    // Or use Object.assign for multiple properties
    updateUserBatch(state, action) {
      Object.assign(state, action.payload);
    },
    // Delete properties directly
    clearName(state) {
      delete state.name; // Safe with Immer!
    }
  }
});
```

### ✅ Old Redux: Manual immutable updates

```typescript
// For non-Toolkit Redux
const reducer = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      name: action.payload
    }
  };
};
```

---

## 9. Prop Updates Not Reflecting

### Checklist when props change but UI doesn't update:

#### 1. Check if using internal state instead of props

```typescript
// ❌ BAD
const MyComponent = ({ data }) => {
  const [localData] = useState(data); // Ignores prop updates!
  return <div>{localData.value}</div>;
};

// ✅ GOOD
const MyComponent = ({ data }) => {
  return <div>{data.value}</div>;
};
```

#### 2. Check if child component has internal state

```typescript
// Child component might have this:
const ChildComponent = ({ rules }) => {
  const [internalRules] = useState(rules); // Won't update!

  // Fix: Add useEffect
  useEffect(() => {
    setInternalRules(rules);
  }, [rules]);
};
```

#### 3. Check if using memo/shouldComponentUpdate incorrectly

```typescript
// ❌ BAD - Blocks all updates
const MyComponent = React.memo(
  ({ data }) => <div>{data.value}</div>,
  () => true // Always returns true = never update!
);

// ✅ GOOD - Custom comparison
const MyComponent = React.memo(
  ({ data }) => <div>{data.value}</div>,
  (prevProps, nextProps) => prevProps.data.id === nextProps.data.id
);
```

#### 4. Check reference equality for objects/arrays

```typescript
// Objects with same content but different references trigger re-render
const data = { name: 'John' }; // New object every render

// Fix: useMemo
const data = useMemo(() => ({ name: 'John' }), []);
```

---

## 10. Race Conditions

### ❌ Problem: Async operations complete out of order

```typescript
// WRONG - Fast request can be overwritten by slow request
const SearchComponent = () => {
  const [results, setResults] = useState([]);

  const search = async (query) => {
    const data = await fetchResults(query);
    setResults(data); // Last request to finish wins!
  };

  return <input onChange={(e) => search(e.target.value)} />;
};

// User types: "react"
// Request 1: "r" starts
// Request 2: "re" starts
// Request 3: "rea" starts
// Request 3 finishes → shows "rea" results
// Request 1 finishes → shows "r" results (WRONG!)
```

### ✅ Solution 1: Cancel previous requests

```typescript
// CORRECT - Abort previous requests
const SearchComponent = () => {
  const [results, setResults] = useState([]);
  const abortControllerRef = useRef();

  const search = async (query) => {
    // Cancel previous request
    abortControllerRef.current?.abort();

    // Create new abort controller
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const data = await fetchResults(query, {
        signal: abortController.signal
      });
      setResults(data);
    } catch (err) {
      if (err.name === 'AbortError') return; // Ignore abort errors
      throw err;
    }
  };

  return <input onChange={(e) => search(e.target.value)} />;
};
```

### ✅ Solution 2: Ignore stale responses

```typescript
// CORRECT - Track latest query
const SearchComponent = () => {
  const [results, setResults] = useState([]);
  const latestQueryRef = useRef('');

  const search = async (query) => {
    latestQueryRef.current = query;
    const data = await fetchResults(query);

    // Only update if this is still the latest query
    if (query === latestQueryRef.current) {
      setResults(data);
    }
  };

  return <input onChange={(e) => search(e.target.value)} />;
};
```

### ✅ Solution 3: Debounce input

```typescript
// BEST - Reduce number of requests
import { debounce } from 'lodash';

const SearchComponent = () => {
  const [results, setResults] = useState([]);

  const search = useMemo(
    () => debounce(async (query) => {
      const data = await fetchResults(query);
      setResults(data);
    }, 300),
    []
  );

  return <input onChange={(e) => search(e.target.value)} />;
};
```

---

## Quick Reference: Common Patterns

### Pattern: Derived State

```typescript
// ❌ Don't store derived state
const [price, setPrice] = useState(100);
const [tax, setTax] = useState(price * 0.1); // Out of sync!

// ✅ Calculate on render
const [price, setPrice] = useState(100);
const tax = price * 0.1;

// ✅ Or use useMemo if expensive
const tax = useMemo(() => calculateComplexTax(price), [price]);
```

### Pattern: Conditional useEffect

```typescript
// ✅ Run effect only when condition is true
useEffect(() => {
  if (!isReady) return; // Guard clause

  fetchData();
}, [isReady]);

// Or conditionally skip with early return
useEffect(() => {
  if (!user.id) return;

  const subscription = subscribeToUser(user.id);
  return () => subscription.unsubscribe();
}, [user.id]);
```

### Pattern: Previous Value

```typescript
// ✅ Track previous value
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// Usage:
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
```

### Pattern: One-time Effect

```typescript
// ✅ Run only on mount
useEffect(() => {
  fetchInitialData();
}, []); // Empty deps = only on mount

// ⚠️ Be careful with React 18 StrictMode
// Effects run twice in development
useEffect(() => {
  let cancelled = false;

  fetchData().then(data => {
    if (!cancelled) setData(data);
  });

  return () => { cancelled = true; };
}, []);
```

---

## Debugging Checklist

When something doesn't work:

1. **Check React DevTools** - Are props actually changing?
2. **Add console.logs** - Is the code path executing?
3. **Check dependencies** - Are useEffect/useCallback deps correct?
4. **Check references** - Are you comparing objects by reference?
5. **Check componentDidUpdate** - Are you comparing with prevProps?
6. **Check internal state** - Is component using state instead of props?
7. **Check batching** - Are multiple setState calls being batched?
8. **Check timing** - Is async code completing after component unmounts?

---

## Resources

- [React Docs - useEffect](https://react.dev/reference/react/useEffect)
- [React Docs - useState](https://react.dev/reference/react/useState)
- [Redux Toolkit - createSlice](https://redux-toolkit.js.org/api/createSlice)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

---

**Last Updated:** 2026-03-09
