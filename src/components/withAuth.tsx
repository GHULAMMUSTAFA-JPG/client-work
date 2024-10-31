// components/withAuth.tsx

"use client"
import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      // Check for an auth token in localStorage
      const isAuthenticated = Boolean(localStorage.getItem('user'));

      // Redirect to login page if user is not authenticated
      if (!isAuthenticated) {
        router.replace('/login');
      }
    }, [router]);

    // If authenticated, render the wrapped component
    const isAuthenticated = Boolean(localStorage.getItem('user'));
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
