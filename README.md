# React Boilerplate

A modern, feature-rich React boilerplate built with Vite, Redux Toolkit, and Tailwind CSS. This starter template includes authentication, internationalization, theming, form handling, data tables, and a complete dashboard layout - everything you need to kickstart your React application.

## ✨ Features

- 🚀 **Fast Development** - Powered by Vite for lightning-fast HMR and builds
- 🎨 **Modern UI** - Tailwind CSS v4 with dark/light theme support
- 🌍 **Internationalization** - i18n support with React i18next (English & Spanish included)
- 🔐 **Authentication** - Complete auth system with Redux Toolkit
- 📊 **Data Visualization** - ECharts integration for charts and graphs
- 📝 **Form Management** - React Hook Form with comprehensive form components
- 📋 **Data Tables** - Reusable DataTable component with pagination
- 🎯 **Type Safety** - TypeScript-ready structure (can be migrated)
- 🔄 **State Management** - Redux Toolkit with RTK Query for API calls
- 🛣️ **Routing** - React Router v7 with lazy loading and protected routes
- 📱 **Responsive** - Mobile-first responsive design
- 🎭 **Multiple Layouts** - Public, Auth, and Dashboard layouts
- 🧩 **Reusable Components** - Comprehensive UI component library

## 🛠️ Tech Stack

### Core
- **React** ^19.2.3
- **Vite** ^7.3.0
- **React Router DOM** ^7.11.0

### State Management
- **Redux Toolkit** ^2.11.2
- **React Redux** ^9.2.0

### Styling
- **Tailwind CSS** ^4.1.18
- **PostCSS** ^8.5.6
- **Autoprefixer** ^10.4.23
- **clsx** & **tailwind-merge** for conditional styling

### Forms & Validation
- **React Hook Form** ^7.70.0

### API & HTTP
- **Axios** ^1.13.2

### Internationalization
- **i18next** ^25.7.3
- **react-i18next** ^16.5.1

### UI & Icons
- **Lucide React** ^0.562.0
- **React Hot Toast** ^2.6.0

### Data Visualization
- **ECharts** ^5.6.0
- **echarts-for-react** ^3.0.5

### Utilities
- **lodash-es** ^4.17.22

### Development Tools
- **ESLint** ^9.39.2
- **TypeScript types** for React and React DOM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** or **pnpm**

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "react-dashboard"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
src/
├── assets/              # Static assets (images, icons, etc.)
├── components/          # Reusable React components
│   ├── common/         # Common components (forms, tables, modals, etc.)
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/             # Base UI components (Button, Card, Badge, etc.)
├── hooks/              # Custom React hooks
├── layouts/            # Layout components
│   └── components/     # Layout-specific components (Sidebar, Navbar, etc.)
├── locales/            # Translation files (en.json, es.json)
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   ├── demo/          # Demo/example pages
│   └── public/        # Public pages
├── router/             # React Router configuration
├── store/              # Redux store configuration
│   ├── api/           # RTK Query API definitions
│   └── slices/        # Redux slices (auth, theme, language)
├── utils/              # Utility functions
├── App.jsx             # Root App component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### Path Aliases

The project uses path aliases for cleaner imports:

- `@/` → `src/`
- `@components` → `src/components`
- `@pages` → `src/pages`
- `@utils` → `src/utils`
- `@hooks` → `src/hooks`
- `@layouts` → `src/layouts`
- `@store` → `src/store`
- `@assets` → `src/assets`
- `@router` → `src/router`
- `@locales` → `src/locales`

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=your-api-base-url
```

### Theme Configuration

The theme system supports:
- **Dark/Light mode** - Automatically detects system preference
- **Persistent theme** - Theme preference persists across sessions

## 🎨 Key Features Breakdown

### Authentication
- Login/Logout functionality
- Protected routes
- Auth state management with Redux
- Axios interceptors for token handling

### Forms
- Pre-built form components (Input, Select, Checkbox, Radio, Textarea, FileInput, etc.)
- Form validation with React Hook Form
- Form helpers for common operations
- Multi-select component
- Demo pages showcasing form usage

### Data Tables
- Reusable DataTable component
- Pagination support
- Sorting and filtering capabilities
- Demo page with examples

### Dashboard
- Overview statistics
- Charts and graphs (ECharts)
- Activity feed
- Recent orders
- Top products
- Financial widgets
- Customer analytics

### Internationalization
- Support for multiple languages (English & Spanish)
- Language switching
- Persistent language preference

## 🎯 Usage Examples

### Using Form Components

```jsx
import { useForm } from 'react-hook-form';
import { Input, Select, Button } from '@components/common/forms';

function MyForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      country: ''
    }
  });
  
  const onSubmit = (data) => {
    console.log(data);
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ];
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input 
        name="name" 
        label="Name" 
        control={control}
        rules={{ required: 'Name is required' }}
      />
      <Select 
        name="country" 
        label="Country" 
        control={control}
        rules={{ required: 'Please select a country' }}
        options={countryOptions}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Using Redux Store

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@store/slices/themeSlice';

function MyComponent() {
  const theme = useSelector(state => state.theme.mode);
  const dispatch = useDispatch();
  
  return <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>;
}
```

### Using Translations

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('welcome.title')}</h1>;
}
```

## 🚧 Development Guidelines

1. **Component Structure**: Keep components modular and reusable
2. **State Management**: Use Redux for global state, local state for component-specific data
3. **Styling**: Use Tailwind utility classes, create components for repeated patterns
4. **Forms**: Always use React Hook Form for form handling
5. **API Calls**: Use RTK Query for API interactions
6. **Code Style**: Follow ESLint rules and React best practices


**Happy Coding! 🚀**

