# CLIENT STRUCTURE

## ROOT
client/
├── index.html
├── tsconfig.json
├── vite.config.ts
├── vite-env.d.ts

## SRC
src/
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
├── GlobalStyles.ts        # Global styles

## API LAYER
src/api/
├── client.ts              # HTTP client
└── types/
    ├── request.ts         # Request types
    └── response.ts        # Response types

## ASSETS
src/assets/
├── fonts/                 # Font files
└── svg/                   # SVG icons

## COMPONENTS

### UI Components (reusable)
src/components/ui/
├── Button.tsx
├── Circle.tsx
├── Flexbox.tsx
├── Grid.tsx
├── Icon.tsx
├── Image.tsx
├── Indent.tsx
├── LoadingSpinner.tsx
├── Text.tsx
├── constants.ts           # UI constants
├── types.ts               # UI types
└── *.md                   # Component documentation

### Feature Components
src/components/
├── Header/                # Header component
│   ├── index.tsx
│   └── styled.ts
├── MobileMenu/            # Mobile menu
│   ├── index.tsx
│   └── styled.ts
├── Popup/                 # Modal/popup
│   ├── index.tsx
│   └── styled.ts
├── SearchInput/           # Search functionality
│   └── index.ts
├── Layout.tsx             # Main layout wrapper
├── Notification.tsx       # Notification system
└── ProductCard.tsx        # Product display card

## PAGES
src/pages/
├── AuthPage.tsx           # User authentication
├── CartPage.tsx           # Shopping cart
├── HomePage.tsx           # Landing/home
├── ProductPage.tsx        # Product details
└── ProfilePage.tsx        # User profile

## STATE MANAGEMENT
src/store/
├── slices/                # Redux slices
│   ├── popupSlice.ts      # Popup state
│   └── settingsSlice.ts   # App settings
└── thunk/                 # Async actions

## UTILITIES
src/utils/
├── hooks/
│   └── hooks.ts           # Custom React hooks
├── helpers/
│   └── helpers.ts         # Utility functions
├── types/
│   ├── product.ts         # Product types
│   ├── settings.ts        # Settings types
│   └── user.ts            # User types
└── enums/
    └── enum.ts            # Application enums