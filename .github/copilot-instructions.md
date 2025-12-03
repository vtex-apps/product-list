# VTEX IO Product List Component

## Architecture Overview

This is a **VTEX IO Store Framework app** that renders shopping cart product lists in the Minicart. It uses the VTEX IO block-based architecture where components are composed through JSON configuration rather than direct React imports.

### Block System Pattern
- **`store/interfaces.json`**: Defines block names mapped to React components (e.g., `"product-list"` → `"ProductListWrapper"`)
- **`store/blocks.json`**: Provides default block compositions that stores can override
- Components accept props through block configurations, not direct JSX usage

### Component Hierarchy
```
ProductListWrapper (responsive switch)
└─> ProductList (data partitioning & mapping)
    └─> ItemContextWrapper per item (context provider)
        └─> LazyRender (viewport optimization)
            └─> Child blocks (configured by store)
```

## Key Patterns

### Context-Based Component Communication
All child components (`ProductName`, `Price`, `QuantitySelector`, etc.) consume `ItemContext` rather than receiving props. See `react/ItemContext.tsx`:
```tsx
export const useItemContext = () => {
  const context = useContext(ItemContext)
  if (context === undefined) {
    throw new Error('useItemContext must be used within a ItemContextProvider')
  }
  return context
}
```
**Why**: Enables flexible block composition without prop drilling through store configuration layers.

### Desktop/Mobile Responsive Strategy
Uses `ProductListWrapper` with `react-sizeme` to switch between desktop/mobile child blocks at `MAX_MOBILE_WIDTH = 640px`. Stores define both `product-list-content-desktop` and `product-list-content-mobile` with different layouts (see `docs/README.md` default implementation).

### Lazy Rendering Pattern
`LazyRender` uses `vtex.on-view` to defer rendering items until near viewport. Each item wrapped individually with configurable `lazyRenderHeight` (100px) and `lazyRenderOffset` (300px).

### Item Availability Segregation
`ProductList.tsx` partitions items into `availableItems` and `unavailableItems` arrays using `.reduce()`, rendering unavailable first with separating headers. Item count modes: `distinct`, `total`, `distinctAvailable`, `totalAvailable`.

### Quantity Selector State Machine
`QuantitySelector.tsx` switches between dropdown (0-9) and input (10+) modes dynamically. Uses `useQuantitySelectorState` custom hook for validation. Supports `unitMultiplier` for products sold in multiples (e.g., 0.5kg increments).

## VTEX IO Specifics

### Type Dependencies
- Types come from VTEX IO packages via URLs in `devDependencies` (see `react/package.json`):
  ```json
  "vtex.checkout-graphql": "http://vtex.vtexassets.com/_v/public/typings/v1/vtex.checkout-graphql@0.55.1/..."
  ```
- Import types: `import type { Item } from 'vtex.checkout-graphql'`

### CSS Handles System
Use `useCssHandles` hook with predefined handle arrays for styling:
```tsx
const CSS_HANDLES = ['productListItem', 'productPrice'] as const
const handles = useCssHandles(CSS_HANDLES)
// Usage: className={handles.productPrice}
```
Stores customize via CSS Handles, not component props.

### i18n with react-intl
- Messages defined in `messages/*.json` with keys like `store/product-list.unavailableItems`
- Use `defineMessages` + `useIntl` for translations
- Support for 30+ locales in parallel files

## Development Workflows

### Testing
- Run: `yarn test` (uses `vtex-test-tools`)
- Test utilities: `@vtex/test-tools/react` (wrapper around React Testing Library)
- Mock pattern: Create `__mocks__/vtex.*.tsx` files for VTEX dependencies
- See `react/__tests__/ProductList.test.tsx` for examples

### Linting
- Run: `yarn lint` (root) or `cd react && yarn lint`
- Uses `eslint-config-vtex` and `eslint-config-vtex-react`
- TypeScript strict mode with `noEmit` check

### Component Development
1. Add React component in `react/`
2. Register in `store/interfaces.json` with block name
3. Add default configuration in `store/blocks.json` if needed
4. Define CSS handles for styling points
5. Document in `docs/README.md` with props table

## Critical Dependencies

- **Order Management**: Uses `vtex.order-manager` `OrderForm` context for cart state
- **Device Detection**: `vtex.device-detector` for mobile/desktop detection
- **Extension Points**: `ExtensionPoint` and `useChildBlock` from `vtex.render-runtime` for block composition
- **Styling**: `vtex.flex-layout` for layout composition (not traditional CSS-in-JS)

## Common Pitfalls

1. **Don't import child components directly** - use `ExtensionPoint` with block IDs
2. **Don't pass props through JSX** - child components read from `ItemContext`
3. **React memoization is critical** - see `memo()` usage in `ProductList` and `ItemContextWrapper` to prevent re-renders on every cart update
4. **Keys must include price and index** - `key={${item.uniqueId}-${item.sellingPrice}-${item.index}}` ensures re-render on price changes
5. **Replacing outer div with Fragment breaks layout** - documented in `ProductList.tsx` (PR #39 reference)
