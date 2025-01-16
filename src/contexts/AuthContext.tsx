import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // This could be a user object or a token
  loginUser: (userData: any) => void;
  logout: () => void;
  setUserProfile: any;
  userProfile:any;
  rendControl:boolean;
  setRendControl:any;
  isLoading:boolean;
  setIsLoading:any;
  setNotifications:any;
  notifications:any;
  conversations:any;
  setConversations:any;
  setSockets:any;
  sockets:any

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>()
  const [sockets, setSockets] = useState<any>()
  const [rendControl, setRendControl] =  useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<any>()
  const [conversations, setConversations] = useState<any>()
  // Check authentication on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Load user data from localStorage
    }
  }, []);

  const loginUser = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    if(userData.isBuyer)
      router.push("/homepagebuyer");

    else
      router.push("/homepage")

  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
      if (sockets.readyState === WebSocket.OPEN) {
          sockets.close(1000, "Client closing the connection.");
      }
  };

  return (
    <AuthContext.Provider value={{sockets, setSockets ,conversations,setConversations, notifications, setNotifications,setIsLoading, isLoading, isAuthenticated, user,setRendControl,rendControl, loginUser, logout,setUserProfile, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
