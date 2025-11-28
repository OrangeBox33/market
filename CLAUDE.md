# Market E-commerce Frontend

## Project Overview

React 19 frontend for e-commerce application with Vite, Redux Toolkit and styled-components.

## Frontend Architecture

- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit with slices (user, cart, product)
- **Styling**: styled-components
- **API Client**: Axios with interceptors in `client/src/api/client.ts`
- **Development Port**: 3333

## Frontend Application Structure

```
client/
├── src/
│   ├── api/                          # API layer and HTTP client
│   │   ├── client.ts
│   │   └── types/
│   │
│   ├── common/                       # Shared utilities and types
│   │   ├── enums/
│   │   ├── helpers/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Base UI component library
│   │   └── [feature components]
│   │
│   ├── pages/                        # Route-based page components
│   │   ├── AuthPage/
│   │   ├── CartPage/
│   │   ├── CategoriesPage/
│   │   ├── HomePage/
│   │   ├── ProductPage/
│   │   └── ProfilePage/
│   │
│   ├── store/                        # Redux state management
│   │   ├── store.ts
│   │   ├── slices/                   # Redux Toolkit slices
│   │   └── thunk/
│   │
│   ├── context/                      # React context providers
│   ├── engine/                       # Business logic engines
│   └── assets/                       # Static assets
│
├── index.html
├── tsconfig.json
└── vite.config.ts
```

## Component Organization Patterns

**UI Components (`src/components/ui/`)**:

- Base reusable components with consistent props interface
- Use Flexbox for most layouts, Grid only for table-like structures
- Text/Icon/Image for content display
- Indent for consistent spacing

**Feature Components** (`src/components/[FeatureName]/`):

- Feature-specific components with styled.ts pattern
- Index.tsx as main component file
- Styled components separated into dedicated file

**Pages** (`src/pages/[PageName]/`):

- Route-level components
- Each page in its own directory
- Single component file per page

**State Management**:

- Redux Toolkit with slices pattern
- Slices: cart, popup, product, settings, user
- Centralized store configuration in store.ts

## React Components - Base UI Library

When creating React components, always use these base components instead of raw HTML elements:

### Text Component

- `children: React.ReactNode` ✓
- `size?: string` (default "16px")
- `textWeight?: string` (default "normal")
- `tag?: keyof JSX.IntrinsicElements` (default "span")
- `color?: TColors` (default "primary")
- `font?: 'bastionx' | 'helios'`
- `textAlign?: 'center' | 'left' | 'right'`
- `fontStyle?: 'italic'`
- `maxWidth?: number`

### Icon Component

- `SVG: React.FC<React.SVGProps<SVGSVGElement>>` ✓
- `width: number` ✓
- `height: number` ✓
- `color?: string` (default "red")

### Image Component

- `src: string` ✓
- `width: number` ✓
- `height: number` ✓
- `alt?: string` (default "")
- `color?: string`

### Flexbox Component (for layout) - **PREFERRED**

- `children: ReactNode` ✓
- `gap?: string` (default "0")
- `justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'` (default "flex-start")
- `alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'` (default "stretch")
- `direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'` (default "row")
- `isWrap?: boolean` (default nowrap)
- `isFullHeight?: boolean` (100% height)
- `className?: string`

### Grid Component (for table-like layouts) - **USE ONLY FOR SPECIAL CASES**

- `columns: number` ✓
- `rows: number` ✓
- `height?: string`
- `width?: string`
- `isFullHeight?: boolean` (100% height)
- `isFullWidth?: boolean` (100% width)
- `isEqualWidth?: boolean` (1fr columns)
- `isEqualHeight?: boolean` (1fr rows)
- `gap?: string` (default "0")
- `justifyContent?: string` (default "stretch")
- `alignItems?: string` (default "stretch")
- `placeItems?: string` (default "unset")
- `children?: ReactNode`
- `className?: string`

### Indent Component (for spacing)

- `children: ReactNode` ✓

Margin props:

- `m?: number` (all sides)
- `mT?: number` (top)
- `mR?: number` (right)
- `mB?: number` (bottom)
- `mL?: number` (left)

Padding props:

- `p?: number` (all sides)
- `pT?: number` (top)
- `pR?: number` (right)
- `pB?: number` (bottom)
- `pL?: number` (left)

Additional:

- `borderRadius?: number`
- `maxWidth?: number`
- `maxHeight?: number`

**Usage Pattern**: Always structure components using Flexbox for layout (PREFERRED), Indent for spacing, and Text/Icon/Image for content. Use Grid only for table-like layouts or special cases requiring 2D grid structure. Never use raw div, span, img, or p tags directly.
