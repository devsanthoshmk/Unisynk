# ADR 003: State Management Strategy

**Status**: Accepted  
**Date**: 2025-11-13  
**Decision Makers**: Development Team  
**Tags**: state-management, zustand, react

---

## Context

Modern React applications require effective state management for:
- Global application state (user, theme, settings)
- Feature-specific state (forms, modals, filters)
- Server state (API data, cache)
- URL state (search params, filters)

We needed a state management solution that is:
- Simple to use and understand
- TypeScript-friendly
- Performant
- Minimal boilerplate
- Easy to test

## Decision

We adopt a **layered state management approach**:

1. **Zustand** - Global and feature state
2. **React Query / SWR** - Server state (future)
3. **React Context** - Theme and auth providers
4. **URL State** - Search params and filters
5. **Local State** - Component-specific state

### Primary: Zustand for Global State

```typescript
// lib/stores/user-store.ts
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}))
```

### Store Organization

```
lib/stores/
├── user-store.ts          # User authentication state
├── onboarding-store.ts    # Onboarding flow state
├── theme-store.ts         # Theme preferences
└── index.ts               # Barrel export
```

## Rationale

### Why Zustand?

**Pros:**
- ✅ Minimal boilerplate (no providers, actions, reducers)
- ✅ Excellent TypeScript support
- ✅ Small bundle size (~1KB)
- ✅ No context provider hell
- ✅ Easy to test
- ✅ Built-in devtools support
- ✅ Supports middleware (persist, immer)

**Cons:**
- ❌ Less ecosystem than Redux
- ❌ No time-travel debugging (without middleware)

**Alternatives Considered:**

1. **Redux Toolkit**
   - Rejected: Too much boilerplate
   - Rejected: Overkill for our needs
   - Rejected: Larger bundle size

2. **Jotai**
   - Considered: Atomic state management
   - Rejected: Less mature ecosystem
   - Rejected: Different mental model

3. **Recoil**
   - Rejected: Experimental status
   - Rejected: Facebook-specific patterns

4. **Context + useReducer**
   - Rejected: Performance issues with large state
   - Rejected: Provider hell
   - Rejected: More boilerplate

### State Layer Decisions

| State Type | Solution | Reason |
|------------|----------|--------|
| Global App State | Zustand | Simple, performant |
| Server State | React Query (future) | Caching, refetching |
| Theme | Context | Framework integration |
| Auth | Context + Zustand | Provider pattern + state |
| URL State | Next.js searchParams | SEO, shareable links |
| Form State | React Hook Form | Form-specific features |
| Component State | useState | Simple, local |

## Consequences

### Positive

- Simple mental model
- Easy to add new stores
- Great developer experience
- Minimal re-renders
- Easy to test stores in isolation

### Negative

- Need to decide when to use Zustand vs Context
- Multiple state solutions to learn
- Need patterns for async actions

### Neutral

- Requires documentation
- Need to establish store patterns

## Implementation

### Store Pattern

```typescript
// lib/stores/feature-store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface FeatureStore {
  // State
  data: Data[]
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchData: () => Promise<void>
  addItem: (item: Data) => void
  removeItem: (id: string) => void
  reset: () => void
}

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export const useFeatureStore = create<FeatureStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        fetchData: async () => {
          set({ isLoading: true, error: null })
          try {
            const data = await api.fetchData()
            set({ data, isLoading: false })
          } catch (error) {
            set({ error: error.message, isLoading: false })
          }
        },
        
        addItem: (item) => {
          set((state) => ({ data: [...state.data, item] }))
        },
        
        removeItem: (id) => {
          set((state) => ({
            data: state.data.filter((item) => item.id !== id)
          }))
        },
        
        reset: () => set(initialState)
      }),
      { name: 'feature-store' }
    )
  )
)
```

### Usage in Components

```typescript
// components/feature-list.tsx
import { useFeatureStore } from '@/lib/stores/feature-store'

export function FeatureList() {
  // Select only needed state
  const data = useFeatureStore((state) => state.data)
  const isLoading = useFeatureStore((state) => state.isLoading)
  const fetchData = useFeatureStore((state) => state.fetchData)
  
  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

### Selector Pattern (Performance)

```typescript
// Avoid - causes re-render on any state change
const store = useFeatureStore()

// Better - only re-renders when data changes
const data = useFeatureStore((state) => state.data)

// Best - memoized selector
const itemCount = useFeatureStore(
  (state) => state.data.length,
  shallow
)
```

### Testing Stores

```typescript
// __tests__/feature-store.test.ts
import { renderHook, act } from '@testing-library/react'
import { useFeatureStore } from '@/lib/stores/feature-store'

describe('FeatureStore', () => {
  beforeEach(() => {
    useFeatureStore.getState().reset()
  })
  
  it('should add item', () => {
    const { result } = renderHook(() => useFeatureStore())
    
    act(() => {
      result.current.addItem({ id: '1', name: 'Test' })
    })
    
    expect(result.current.data).toHaveLength(1)
  })
})
```

## Patterns and Best Practices

### 1. Store Slicing

```typescript
// For large stores, split into slices
interface Store {
  user: UserSlice
  settings: SettingsSlice
}

const createUserSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user })
})

const createSettingsSlice = (set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme })
})

export const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createSettingsSlice(set)
}))
```

### 2. Async Actions

```typescript
// Pattern for async operations
fetchData: async () => {
  set({ isLoading: true, error: null })
  try {
    const data = await api.fetchData()
    set({ data, isLoading: false })
  } catch (error) {
    set({ error: error.message, isLoading: false })
  }
}
```

### 3. Computed Values

```typescript
// Use selectors for computed values
const completedTodos = useStore(
  (state) => state.todos.filter((todo) => todo.completed)
)
```

### 4. Persistence

```typescript
// Persist specific stores
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user })
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }) // Only persist user
    }
  )
)
```

## When to Use What

### Use Zustand When:
- Global application state
- State shared across multiple routes
- State that needs persistence
- Complex state logic

### Use Context When:
- Theme provider
- Auth provider (with Zustand for state)
- Deeply nested component trees

### Use useState When:
- Component-local state
- Simple toggle states
- Form inputs (without validation)

### Use React Hook Form When:
- Complex forms
- Form validation
- Multi-step forms

### Use URL State When:
- Filters and search
- Pagination
- Shareable state

## Compliance

- All global stores must be in `lib/stores/`
- Stores must follow the established pattern
- Use TypeScript for all stores
- Include reset action for testing
- Document complex state logic

## Migration Path

For future server state management:
1. Evaluate React Query or SWR
2. Migrate API calls from Zustand to server state library
3. Keep UI state in Zustand
4. Update documentation

## Related Decisions

- [ADR 001: Folder Structure](./001-folder-structure-and-modularity.md)
- [ADR 005: API Client Architecture](./005-api-client-architecture.md)

## References

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Query Documentation](https://tanstack.com/query/latest)
- [State Management Patterns](https://www.patterns.dev/posts/state-management)

---

**Last Updated**: 2025-11-13  
**Review Date**: 2026-02-13 (3 months)
