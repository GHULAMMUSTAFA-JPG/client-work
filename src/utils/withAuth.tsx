"use client";

import React, { ComponentType, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Import the context
import { useRouter } from "next/navigation";

// HOC that provides authentication state to wrapped component
const withAuth = <P extends {}>(WrappedComponent: ComponentType<P & { isAuthenticated: boolean }>) => {

  const AuthenticatedComponent = (props: P) => {
    const router = useRouter()
    const { isAuthenticated, user } = useAuth(); // Access auth state from context

    // Optionally, you could add logic for loading or redirecting the user
    // Here, we check if the user is authenticated and return a loading state


    useEffect(() => {
      if (typeof window !== "undefined") {
        if (!isAuthenticated) {

          router.push("/login"); // Redirect to login page
        }
        else {
          if (!user.isBuyer)
            router.push("/homepage")
          else {
            router.push("/homepagebuyer")
          }
        }
      }
    }, [isAuthenticated])


    return <WrappedComponent {...props} isAuthenticated={isAuthenticated} user={user} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
