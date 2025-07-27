# Holidays Query System Design

## Overview

A centralized, efficient GraphQL query system for holiday data with lazy loading, infinite scrolling, combinable filters, and intelligent caching. Built using React Query infinite queries with Embla Carousel (shadcn) integration.

## Core Requirements

### Filter System

- **Combinable filters**: Multiple filters can be active simultaneously
- **Default state**: No filters active by default (shows all holidays)
- **Server-side filtering**: Each filter combination triggers separate GraphQL queries
- **Cache reuse**: Individual holiday items cached and reused across filter combinations

### Loading Strategy

- **Initial load**: 4 items per filter
- **Lazy loading**: Additional 4 items on carousel navigation/drag
- **Buffer system**: Maintain 4 items ahead of current view
- **Maximum items**: 20 items per filter (configurable)

### Caching Strategy

- **Per-tab caching**: Results cached separately for each filter combination
- **Destination persistence**: Cache maintained across destination changes
- **Intelligent cleanup**: React Query automatic garbage collection
- **Deduplication**: Reuse cached holiday items across different queries

## Architecture

### Query Structure

```typescript
// Base query with default variables
const baseVariables = {
  rooms: ['2'],
  duration: 7,
  departure_points: [],
  boards: [],
  ratings: [],
  trip_ratings: [],
  departure_date: null,
  departure_date_type: 0,
  destinations: [], // Set dynamically
  regions: [],
  resorts: [],
  trip_type: -1,
  start_index: 0,
  sort: 0, // Price ascending
  fav_accommodations: [],
  client_list_id: -1,
  max_price: -1,
  take: 4,
  accommodation_id: null,
}
```

### Filter Variable Mapping

```typescript
const filterVariables = {
  'Under £400pp': { max_price: 399 },
  '5-Star': { ratings: [5] },
  'Last Minute': {
    departure_date: getDate(),
    departure_date_type: 1,
  },
  'All Inclusive': { boards: [5] },
  'City Breaks': { trip_type: 1 },
}
```

### Cache Key Strategy

```typescript
// Cache key format: ['holidays', destinationId, filterHash, pageIndex]
queryKey: ['holidays', destinationId, JSON.stringify(activeFilters), pageParam]
```

## Components Architecture

### Core Components

1. **`useHolidaysInfiniteQuery`** - Main data fetching hook
2. **`useFilterManager`** - Filter state management
3. **`HolidaysQueryProvider`** - Context provider for shared state

### Data Flow

```
User selects filters → FilterManager updates → Query variables computed →
GraphQL request → Cache check → Data returned → UI updates →
Lazy loading triggers → Repeat
```

## State Management

### Filter State

```typescript
interface FilterState {
  activeFilters: string[]
  filterVariables: Record<string, any>
  combinedVariables: GraphQLVariables
}
```

### Loading State

```typescript
interface LoadingState {
  isInitialLoading: boolean
  isLoadingMore: boolean
  hasNextPage: boolean
  error: Error | null
}
```

## Caching Configuration

### React Query Settings

```typescript
{
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  keepPreviousData: true,
  refetchOnWindowFocus: false,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
}
```

### Cache Management

- **Automatic deduplication**: Identical holiday items shared across queries
- **Background refetch**: Every 10 minutes if tab visible
- **Memory limits**: 20 items × 5 filters = 100 items max per destination
- **Cleanup**: Inactive destinations cleared after 30 minutes

## Performance Optimizations

### Component Optimization

- **React.memo**: Applied to `HolidayCard` components
- **Stable references**: Use `useCallback` and `useMemo` for handlers
- **Image lazy loading**: Continue using existing placeholder system

### Query Optimization

- **Request cancellation**: Automatic with React Query
- **Prefetch strategy**: Load next page when within 2 items of end
- **Background updates**: Stale-while-revalidate pattern

## Error Handling

### Error Types and Responses

1. **Network Errors**
   - Show `HolidayCardSkeleton` during retry attempts
   - Automatic retry with exponential backoff (3 attempts)
   - Background error recovery

2. **Total Query Failure**
   - Replace entire carousel with `ResultsError` component
   - Provide retry button for manual recovery
   - Log error for debugging

3. **Partial Load Failure**
   - Show error state in individual card slots
   - Inline retry buttons for specific items
   - Maintain existing successful results

### Error Components

```typescript
// New component to create
<ResultsError
  onRetry={() => refetch()}
  message="Failed to load holidays"
/>
```

## Filter Tab Behavior

### Tab Interactions

- **Preload on hover**: Load filter data after 300ms hover delay
- **Instant switching**: Show cached data immediately if available
- **Loading overlay**: Skeleton state during new filter loads
- **Cancel requests**: Previous filter requests cancelled automatically

### State Persistence

- **Filter selections**: Remembered per destination
- **Active tab**: Restored on destination revisit

## Implementation Hooks

### Primary Hooks

1. **`useHolidaysInfiniteQuery(destinationId, activeFilters)`**
   - Manages infinite query with pagination
   - Handles filter variable merging
   - Returns data, loading states, and pagination functions

2. **`useFilterManager(defaultFilters?)`**
   - Manages active filter state
   - Provides filter toggle functions
   - Computes combined variables

3. **`useHolidayPreloader()`**
   - Handles hover-based preloading
   - Manages prefetch queue
   - Debounces hover events

### Integration Points

- **Embla Carousel**: Integrate with scroll events for lazy loading
- **TanStack Query**: Use infinite query patterns
- **Destination Context**: Subscribe to destination changes
- **Filter Tabs**: Connect to filter state management

## File Structure

```
src/query/
├── hooks/
│   ├── useHolidaysInfiniteQuery.ts
│   ├── useFilterManager.ts
│   └── useHolidayPreloader.ts
├── queries/
│   ├── holidays.ts (existing)
│   └── holidayVariables.ts (new)
├── types/
│   └── holidayTypes.ts
└── utils/
    ├── filterUtils.ts
    └── cacheUtils.ts
```

## Testing Strategy

- **Hook testing**: Test filter combinations and state management
- **Query testing**: Mock GraphQL responses and error scenarios
- **Integration testing**: Test carousel + lazy loading interactions
- **Performance testing**: Verify cache efficiency and memory usage

## Future Enhancements

### Scroll Position Persistence

- **Position persistence**: Component state + sessionStorage backup
- **Item-based positioning**: Use item index rather than pixel position
- **Reset on destination change**: Clear positions for new destination
- **Per-filter memory**: Maintain scroll positions per filter tab
- **Cross-session persistence**: Remember positions across browser sessions

#### Implementation Components

- **`useScrollPosition(filterId)`** hook for scroll state management
- **Scroll State interface** for position tracking
- **sessionStorage integration** for persistence
- **Carousel integration** for position restoration

### Additional Features

- **URL synchronization**: Sync filter state with URL parameters
- **Analytics integration**: Track filter usage and performance metrics
- **A/B testing**: Support for different loading strategies
- **Offline support**: Cache-first strategy with service worker
