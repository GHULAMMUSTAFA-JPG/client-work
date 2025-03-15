// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: any; // This could be a user object or a token
//   loginUser: (userData: any) => void;
//   logout: () => void;
//   restartSockets: () => void;
//   setUserProfile: any;
//   userProfile: any;
//   rendControl: boolean;
//   setRendControl: any;
//   isLoading: boolean;
//   setIsLoading: any;
//   setNotifications: any;
//   notifications: any;
//   conversations: any;
//   setConversations: any;
//   setSockets: any;
//   sockets: any;
//   restartSocket: boolean;
//   selectedIds: any;
//   setSelectedIds: any;
//   isActive: number;
//   setIsActive: any;
//   setIsAuthenticated: any;
//   setUser: any;
// }

// interface selectedIdProps {
//   Message_ID: null | string;
//   Recipient_ID: null | string;
//   Sender_ID: null | string;
//   Conversation_Id: null | string;
//   Profile_Image: null | string;
//   Name: null | string;
//   index: null | number;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();
//   const [userProfile, setUserProfile] = useState<any>();
//   const [sockets, setSockets] = useState<any>();
//   const [rendControl, setRendControl] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [notifications, setNotifications] = useState<any>();
//   const [conversations, setConversations] = useState<any>();
//   const [restartSocket, setRestartSocket] = useState<boolean>(false);
//   const [isActive, setIsActive] = useState<number>(0);
//   const [selectedIds, setSelectedIds] = useState<selectedIdProps>({
//     Message_ID: null,
//     Recipient_ID: null,
//     Sender_ID: null,
//     Conversation_Id: null,
//     Profile_Image: null,
//     Name: null,
//     index: null,
//   });
//   // Check authentication on initial load
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       // console.log("storedUser", storedUser);
//       setIsAuthenticated(true);
//       setUser(JSON.parse(storedUser)); // Load user data from localStorage
//     }
//   }, []);

//   const loginUser = (userData: any) => {
//     setIsLoading(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData);
//     if (userData.isBuyer) {
//       router.push("/homepagebuyer");
//       setIsLoading(false);
//     } else {
//       router.push("/homepage");
//       setIsLoading(false);
//     }
//   };

//   const restartSockets = async () => {
//     setRestartSocket(!restartSocket);
//   };
//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("id");
//     localStorage.removeItem("checkoutSession");
//     localStorage.removeItem("checkoutisbuyer");
//     setIsAuthenticated(false);
//     setUser(null);

//     // Safely close socket if it exists
//     if (sockets && sockets.readyState === WebSocket.OPEN) {
//       sockets.close(1000, "");
//     }

//     // Reset all states
//     setUserProfile(null);
//     setSockets(null);
//     setNotifications(null);
//     setConversations(null);
//     setSelectedIds({
//       Message_ID: null,
//       Recipient_ID: null,
//       Sender_ID: null,
//       Conversation_Id: null,
//       Profile_Image: null,
//       Name: null,
//       index: null,
//     });

//     router.push("/");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isActive,
//         setIsActive,
//         selectedIds,
//         setSelectedIds,
//         restartSocket,
//         restartSockets,
//         sockets,
//         setSockets,
//         conversations,
//         setConversations,
//         notifications,
//         setNotifications,
//         setIsLoading,
//         isLoading,
//         isAuthenticated,
//         user,
//         setRendControl,
//         rendControl,
//         loginUser,
//         logout,
//         setUserProfile,
//         userProfile,
//         setIsAuthenticated,
//         setUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import SetStateAction from React to properly type the setState function
import type { SetStateAction } from "react";

interface Notification {
  Is_Seen: boolean;
  Notification_Icon_Type: string;
  Title: string;
  Message: string;
  Event_Type: string;
  Meta_Data: {
    Campaign_ID: string;
    Creator_ID: string;
    Post_ID: string;
    [key: string]: any;
  };
}

interface NotificationListProps {
  notifications: Notification[];
}

interface selectedIdProps {
  Message_ID: null | string;
  Recipient_ID: null | string;
  Sender_ID: null | string;
  Conversation_Id: null | string;
  Profile_Image: null | string;
  Name: null | string;
  index: null | number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // This could be a user object or a token
  loginUser: (userData: any) => void;
  logout: () => void;
  restartSockets: () => void;
  setUserProfile: (profile: any) => void;
  userProfile: any;
  rendControl: boolean;
  setRendControl: (control: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setNotifications: (notifications: SetStateAction<NotificationListProps>) => void; // Updated to support callback
  notifications: NotificationListProps;
  conversations: any;
  setConversations: (conversations: any) => void;
  setSockets: (sockets: any) => void;
  sockets: any;
  restartSocket: boolean;
  selectedIds: any;
  setSelectedIds: any;
  isActive: number;
  setIsActive: (active: number) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setUser: (user: any) => void;
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
  const [userProfile, setUserProfile] = useState<any>(null);
  const [sockets, setSockets] = useState<any>(null);
  const [rendControl, setRendControl] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationListProps>({ notifications: [] });
  const [conversations, setConversations] = useState<any>(null);
  const [restartSocket, setRestartSocket] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<selectedIdProps>({
    Message_ID: null,
    Recipient_ID: null,
    Sender_ID: null,
    Conversation_Id: null,
    Profile_Image: null,
    Name: null,
    index: null,
  });

  // Check authentication on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser)); // Load user data from localStorage
    }
  }, []);

  const loginUser = (userData: any) => {
    setIsLoading(true);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    if (userData.isBuyer) {
      router.push("/homepagebuyer");
      setIsLoading(false);
    } else {
      router.push("/homepage");
      setIsLoading(false);
    }
  };

  const restartSockets = async () => {
    setRestartSocket(!restartSocket);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("checkoutSession");
    localStorage.removeItem("checkoutisbuyer");
    setIsAuthenticated(false);
    setUser(null);

    // Safely close socket if it exists
    if (sockets && sockets.readyState === WebSocket.OPEN) {
      sockets.close(1000, "");
    }

    // Reset all states
    setUserProfile(null);
    setSockets(null);
    setNotifications({ notifications: [] });
    setConversations(null);
    setSelectedIds({
      Message_ID: null,
      Recipient_ID: null,
      Sender_ID: null,
      Conversation_Id: null,
      Profile_Image: null,
      Name: null,
      index: null,
    });

    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isActive,
        setIsActive,
        selectedIds,
        setSelectedIds,
        restartSocket,
        restartSockets,
        sockets,
        setSockets,
        conversations,
        setConversations,
        notifications,
        setNotifications,
        setIsLoading,
        isLoading,
        isAuthenticated,
        user,
        setRendControl,
        rendControl,
        loginUser,
        logout,
        setUserProfile,
        userProfile,
        setIsAuthenticated,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};