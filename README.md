# Paradise Yatra - Frontend

A modern, responsive travel website built with Next.js 15, TypeScript, and Tailwind CSS. This frontend application provides an immersive travel experience with beautiful animations and optimized performance.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations using Framer Motion
- **Performance Optimized**: Lazy loading components for better page load times
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Component Architecture**: Modular, reusable components with proper separation of concerns
- **Admin Dashboard**: Complete admin interface for managing content
- **SEO Optimized**: Built with Next.js for excellent search engine optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.10
- **Icons**: Lucide React 0.526.0
- **Linting**: ESLint 9
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── admin/             # Admin-specific components
│   ├── ui/                # UI components (buttons, cards, etc.)
│   └── lazy-components.tsx # Lazy-loaded component exports
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ParadiseYatra/my-next-app
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
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🏗️ Component Architecture

### Lazy Loading
The application uses lazy loading for better performance. Components are wrapped in `LazyWrapper` and exported through `lazy-components.tsx`.

### Key Components

- **Header**: Navigation and branding
- **HeroSection**: Main landing section with call-to-action
- **TrendingDestinations**: Featured travel destinations
- **PremiumPackages**: High-end travel packages
- **AdventureEscapes**: Adventure travel options
- **BlogSection**: Travel blog and articles
- **AdminDashboard**: Complete admin interface

## 🎨 Styling

The project uses Tailwind CSS 4 with a custom design system:

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Built-in theme support
- **Animations**: Smooth transitions with Framer Motion
- **Custom Components**: Reusable UI components in `components/ui/`

## 🔧 Configuration

### Next.js Config
Located in `next.config.ts` - handles image optimization, routing, and build settings.

### TypeScript Config
Located in `tsconfig.json` - includes path aliases and strict type checking.

### Tailwind Config
Uses Tailwind CSS 4 with PostCSS for optimal styling.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚀 Performance Features

- **Lazy Loading**: Components load only when needed
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by routes
- **Bundle Analysis**: Built-in bundle analyzer support


## 🧪 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error boundaries

### Component Structure
```typescript
// Example component structure
import { motion } from 'framer-motion';

interface ComponentProps {
  // Define props
}

export const Component: React.FC<ComponentProps> = ({ props }) => {
  return (
    <motion.div>
      {/* Component content */}
    </motion.div>
  );
};
```

### State Management
- Use React Context for global state
- Local state with useState/useReducer
- Custom hooks for reusable logic

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **AWS Amplify**: Use Next.js preset
- **Docker**: Use multi-stage builds for optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
