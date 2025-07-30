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
export const createLazyComponent = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
};

export default LazyWrapper; 