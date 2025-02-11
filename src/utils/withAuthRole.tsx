import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Role-based access control (RBAC) HOC
export function withAuthRole({ Component, allowedRoles }: any) {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user, setIsLoading } = useAuth(); // Assuming user is coming from your context

    useEffect(() => {
      // If user is still loading, wait
      if (!user) {
        setLoading(true);
        return;
      }

      // If the user's role is not allowed, redirect
      if (user.isBuyer && !allowedRoles.includes("buyer")) {
        console.log("buyer but creratot route");
        window.location.href = "/login";
        // router.push("/login");
      } else if (!user.isBuyer && !allowedRoles.includes("creator")) {
        console.log("creator but buyer route");
        window.location.href = "/login";
        // router.push("/login");
      }

      // If everything is fine, stop loading
      setLoading(false);
    }, [user, allowedRoles, router]);

    // While loading, you can display a loading spinner or message
    if (loading) return <div>Loading...</div>;

    // Return the wrapped component if the user is authorized
    return <Component {...props} />;
  };
}
