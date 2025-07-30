"use client";

import { Suspense, lazy, ComponentType, ReactNode } from "react";
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

// Helper function to create lazy components with consistent loading
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  const LazyWrappedComponent = (props: React.ComponentProps<T>) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
  
  LazyWrappedComponent.displayName = 'LazyWrappedComponent';
  return LazyWrappedComponent;
};

export default LazyWrapper; 