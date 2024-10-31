// components/withAuth.tsx

"use client"
import { useEffect, ComponentType, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check for an auth token in localStorage
      const checkAuthentication = () => {
        const user = localStorage.getItem('user'); // Access localStorage here
        if (!user) {
          router.replace('/login'); // Redirect if not authenticated
        } else {
          setLoading(false); // Set loading to false if authenticated
        }
      };

      checkAuthentication(); // Call the function to check authentication
    }, [router]);

    // Show a loading state while checking authentication
    if (loading) {
      return <div>Loading...</div>; // Replace this with your loading UI
    }

    // If authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
