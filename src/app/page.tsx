"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "./login/page";

export default function Mainpage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  useEffect(() => {
    requestAnimationFrame(() => {
      const storedUserData = localStorage.getItem("user");
      const storeduser = storedUserData ? JSON.parse(storedUserData) : null;
      console.log("storeduser", storeduser);
      if (storeduser) {
        if (
          storeduser.isBuyer &&
          storeduser.subscription_status.has_active_subscription == true
        ) {
          router.push("/homepagebuyer");
        } else {
          router.push("/homepage");
        }
      }
    });
  }, []);

  // During loading, render nothing or a loading indicator
  if (isLoading) {
    return null; // Or return a loading spinner, if preferred
  }

  // If no user data or redirection has occurred, render the Login component
  return <Login />;
}
