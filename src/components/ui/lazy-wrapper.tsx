"use client";

import React, { Suspense, lazy, ComponentType, ReactNode, useState, useEffect } from "react";
import Loading from "./loading";

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

const LazyWrapper = ({ 
  children, 
  fallback = <Loading size="lg" className="min-h-[200px]" />,
  className = ""
}: LazyWrapperProps) => {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
};

// Error boundary component for lazy loading
const ErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
    <div className="text-red-600 mb-4">Failed to load component</div>
    <button
      onClick={retry}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

// Helper function to create lazy components with consistent loading and error handling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  const LazyWrappedComponent = (props: React.ComponentProps<T>) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      // Reset error state when component mounts
      setHasError(false);
      setError(null);
    }, []);

    const retry = () => {
      setHasError(false);
      setError(null);
      // Force a re-render by updating a state
      window.location.reload();
    };

    if (hasError) {
      return <ErrorFallback error={error!} retry={retry} />;
    }

    return (
      <LazyWrapper fallback={fallback}>
        <ErrorBoundary onError={(error) => {
          setHasError(true);
          setError(error);
        }}>
          <LazyComponent {...props} />
        </ErrorBoundary>
      </LazyWrapper>
    );
  };
  
  LazyWrappedComponent.displayName = 'LazyWrappedComponent';
  return LazyWrappedComponent;
};

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: ReactNode; onError: (error: Error) => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return null; // Let the parent handle the error display
    }

    return this.props.children;
  }
}

export default LazyWrapper; 