"use client";

import React, { ComponentType, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext"; // Import the context
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// HOC that provides authentication state to wrapped component
const withAuth = <P extends {}>(
  WrappedComponent: ComponentType<P & { isAuthenticated: boolean }>
) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();

    const { isAuthenticated, user } = useAuth(); // Access auth state from context

    // Optionally, you could add logic for loading or redirecting the user
    // Here, we check if the user is authenticated and return a loading state

    useEffect(() => {
      if (typeof window !== "undefined") {
        const currentpath = window.location.href;
        // console.log(currentpath, "currentpath");
        if (!isAuthenticated) {
          if (pathname == "/login") {
          } else if (
            pathname.startsWith("/profile-view/") ||
            pathname.startsWith("/company-view/")
          ) {
          } else {
            router.push("/login");
          }
        } else {
          // console.log("asdjagsduasda",user.isBuyer)
          if (!user.isBuyer)
            currentpath.includes("/login")
              ? router.push("/homepage")
              : router.push(currentpath);
          else {
            currentpath.includes("/login")
              ? router.push("/homepagebuyer")
              : router.push(currentpath);
          }
        }
      }
    }, [isAuthenticated]);
    return (
      <WrappedComponent
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    );
  };

  return AuthenticatedComponent;
};

export default withAuth;
