"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "@/contexts/AuthContext";
import { FeedbackFish } from "@feedback-fish/react";

import {
  countNumberOfUnreadMessages,
  fetchBuyersData,
  fetchProfileData,
} from "@/@api";
import Loader from "@/components/loader";
import { defaultImagePath } from "@/components/constants";

export default function Header() {
  const router = useRouter();
  const [users, setUser] = useState<any>();
  const {
    restartSocket,
    setSockets,
    user,
    logout,
    userProfile,
    setUserProfile,
    rendControl,
    isLoading,
    setIsLoading,
    notifications,
    setNotifications,
    setConversations,
    selectedIds,
  } = useAuth();
  const [conversationList, setConversationList] = useState<any>();
  const [newNotification, setNewNotification] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>();
  const [newMessage, setNewMessage] = useState<boolean>(false);
  const [totalUnreadMessage, setTotalUnreadMessage] = useState<number>(0);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const navigateToSignIn = () => {
    logout();
  };

  useEffect(() => {
    if (user?.email) {
      // console.log("fetchbuyerdatasecond");

      // getHistoryOfUser();
      !user?.isBuyer
        ? fetchProfileData(user?.email, setUserProfile, setIsLoading)
        : fetchBuyersData(setUserProfile, user?.email, setIsLoading);
    }
  }, [user, rendControl]);

  useEffect(() => {
    if (userProfile?._id) {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/message/${userProfile._id}`
      );
      setSocket(ws);
      setSockets(ws);
      ws.onopen = () => {
        const data: any = {
          notification: true,
          recipient_id: userProfile?._id,
        };
        console.log("Sockets are working");
        ws.send(JSON.stringify(data));
        if (user?.email) {
          const dtoForHistory: any = {
            email: user?.email,
          };
          ws.send(JSON.stringify(dtoForHistory));
        }
      };

      ws.onmessage = (event) => {
        console.log("message recieved");

        const message = event.data;
        const response = JSON.parse(message);
        console.log("response", response);
        // console.log(response, "response from sockets", selectedIds);
        if (response?.notifications) {
          // console.log(response?.notifications, "response?.notifications");
          setNotifications(response);
          const not = response?.notifications || [];
          const hasUnseen = not.some(
            (notification: any) => notification.Is_Seen === false
          );
          setNewNotification(hasUnseen);
        } else if (response?.conversations) {
          countNumberOfUnreadMessages(
            response?.conversations,
            setTotalUnreadMessage
          );
          // response?.conversations?.map((messages: any, index: number) => {
          //     const checkNewMessage = messages?.conversation_new_messages !== 0
          //     console.log(messages,"checkNewMessage",checkNewMessage)
          //       checkNewMessage &&  setNewMessage(checkNewMessage)
          // })
          const hasNewMessage = response?.conversations?.some(
            (messages: any) =>
              messages?.conversation_new_messages !== 0 &&
              selectedIds?.Conversation_Id !== messages?._id
          );
          setTimeout(() => {
            setNewMessage(hasNewMessage);
          }, 0);
          // setNewMessage(hasNewMessage);
          setConversationList(response);
          setConversations(response);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [userProfile, restartSocket]);

  // const getHistoryOfUser = async () => {
  //     const response = await conversationHistory(user?.email, setConversationList, 1, 6, setIsLoading)
  // }

  // useEffect(() => {
  //     if (user?.email && socket && socket.readyState === WebSocket.OPEN) {
  //         const dtoForHistory: any = {
  //             "email": user?.email
  //         }
  //         socket.send(JSON.stringify(dtoForHistory))
  //     }
  // }, [socket, user])

  const readNotification = async () => {
    const data = {
      notification_is_seen: true,
      recipient_id: userProfile?._id,
    };
    if (socket.readyState === WebSocket.OPEN) {
      setTimeout(() => {
        socket.send(JSON.stringify(data));
      }, 5000);
    }
  };

  const readMessage = async (conversation: any) => {
    const data = {
      conversation_id: conversation?._id,
      sender_id: userProfile?._id,
    };
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  };

  const handlePlanUpgrade = async () => {
    try {
      // Close WebSocket connection before redirecting
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }

      const response = await fetch(
        `process.env.NEXT_PUBLIC_API_URL/payments/create-customer-portal?user_id=${userProfile?._id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      const url = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating portal session:", error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <header className="navbar-section">
        <nav className="navbar bg-white">
          <div className="container-fluid">
            <Icon
              icon="ic:round-menu"
              width={24}
              height={24}
              type="button"
              className="d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
              aria-controls="offcanvasResponsive"
            />
            <a className="navbar-brand">
  {/*             <img
                src="/assets/images/synnc-logo-new.png"
                alt="logo"
                width={80}
                height={30}
                className="img-fluid ps-3 ps-lg-0 mb-2 mb-lg-0"
              /> */}
        
        {userProfile?.isBrand ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="107.8" height="44.279" viewBox="0 0 107.8 44.279">
        <g id="Group_40" data-name="Group 40" transform="translate(-2757.2 -9216)">
          <g id="weblogo-teel" transform="translate(2757.2 9224.696)">
            <g id="Group_17" data-name="Group 17" transform="translate(0 0)">
              <path id="Path_843" data-name="Path 843" d="M-177.171-24.019c.322.28.636.563.943.859a1.149,1.149,0,0,0,.784.336,1.581,1.581,0,0,0,.5-.39l.279-.258c.373-.368.735-.746,1.089-1.132a1.27,1.27,0,0,1,.924-.346,1.617,1.617,0,0,1,.664.4,4.591,4.591,0,0,1,.082,1c0,.1,0,.2,0,.308,0,.337,0,.673-.005,1.01q0,.351,0,.7,0,.735-.007,1.47-.008.943,0,1.886,0,.724,0,1.448,0,.348,0,.7c0,.324,0,.647-.007.971,0,.1,0,.192,0,.291a1.913,1.913,0,0,1-.2.97,2.4,2.4,0,0,1-1.248.191l-.3,0c-.332,0-.665,0-1,0h-.692q-.726,0-1.451,0-.931,0-1.861,0-.715,0-1.43,0h-.686c-.32,0-.639,0-.959,0l-.287,0a1.467,1.467,0,0,1-.959-.234,1.115,1.115,0,0,1-.143-1.015,11.1,11.1,0,0,1,1.676-1.775,1.166,1.166,0,0,0,.317-.749c-1.09-1.44-3.233-2.233-4.941-2.589a11.156,11.156,0,0,0-8.438,2.135,1.049,1.049,0,0,0-.3.72,1.606,1.606,0,0,0,.393.5l.262.281.275.281.248.256c.254.259.511.514.768.768l.281.279.878.872,1.165,1.157.271.268.249.247.219.217a1.55,1.55,0,0,1,.333,1.253,1.115,1.115,0,0,1-.428.793,3.529,3.529,0,0,1-1.223.154l-.516,0-.56,0h-.286l-1.5,0q-.77,0-1.54.008-.6,0-1.193,0l-.567,0a7.042,7.042,0,0,1-5.334-1.79,6.221,6.221,0,0,1-1.669-4.151c.093-2.785,2.144-5.244,4.027-7.124a19.347,19.347,0,0,1,6.377-3.853l.422-.154A17.858,17.858,0,0,1-177.171-24.019Z" transform="translate(204.326 27.698)" fill="#1bb09d"/>
              <path id="Path_844" data-name="Path 844" d="M-125.037-.1l.271,0c.3,0,.591,0,.887,0l.621,0q.651,0,1.3,0c.552,0,1.1,0,1.657-.005q.642,0,1.284,0l.61,0a6.741,6.741,0,0,1,4.955,1.663,6.43,6.43,0,0,1,1.635,4.857c-.1,1.964-1.463,3.665-2.7,5.107l-.272.326A17.665,17.665,0,0,1-126.5,17.715q-.382.025-.764.041l-.368.017a17.727,17.727,0,0,1-12.325-4.581c-.3-.243-.3-.243-.642-.244a4.831,4.831,0,0,0-1.5,1.363,1.832,1.832,0,0,1-1.21.746c-.431-.091-.431-.091-.654-.3a2.417,2.417,0,0,1-.227-1.3c0-.1,0-.2,0-.3,0-.322,0-.645,0-.967q0-.337,0-.673,0-.7,0-1.41,0-.9,0-1.806,0-.695,0-1.389,0-.333,0-.666c0-.31,0-.621,0-.931,0-.137,0-.137,0-.278A2.458,2.458,0,0,1-144,4.017a1.73,1.73,0,0,1,1.261-.275l.308,0c.337,0,.673,0,1.01,0h.7q.735,0,1.47,0,.943.006,1.886,0,.724,0,1.448,0h.7c.324,0,.647,0,.971,0l.291,0a1.554,1.554,0,0,1,.972.231c.138.223.138.223.155.654A3.617,3.617,0,0,1-134.2,6.31a1.411,1.411,0,0,0-.669,1.113c.459,1.066,2.065,1.67,3.082,2.1a10.756,10.756,0,0,0,8.369-.4,9.824,9.824,0,0,0,2.126-1.461,1.046,1.046,0,0,0-.19-.932l-.269-.262-.3-.3-.332-.319-.338-.333q-.535-.527-1.075-1.049t-1.072-1.05q-.333-.327-.669-.652l-.306-.3-.27-.262a1.624,1.624,0,0,1-.5-1.053l.032-.269.026-.27C-126.309-.094-125.691-.1-125.037-.1Z" transform="translate(144.193 17.806)" fill="#1bb09d"/>
            </g>
            <g id="Group_18" data-name="Group 18" transform="translate(37.48 8.028)">
              <path id="Path_845" data-name="Path 845" d="M-81.971-11.047a1.948,1.948,0,0,1,.68,1.465A2.183,2.183,0,0,1-82.08-8a2.523,2.523,0,0,1-1.785.216,14.018,14.018,0,0,1-1.513-.7,5.146,5.146,0,0,0-2.415-.537l-.507-.007a2.612,2.612,0,0,0-1.278.447,1.965,1.965,0,0,0-.34,1.178,1.693,1.693,0,0,0,.738.948,7.336,7.336,0,0,0,1.1.4l.318.1q.782.246,1.571.463c1.795.5,3.844,1.126,4.906,2.781a6.751,6.751,0,0,1,.367,4.458,5.32,5.32,0,0,1-3.015,3.036,10.6,10.6,0,0,1-7.9-.344A7.478,7.478,0,0,1-94.36,2.706a3.445,3.445,0,0,1-.133-1.594,2.121,2.121,0,0,1,1.2-1.2,2.268,2.268,0,0,1,1.8.249c.256.157.509.319.762.481a6.833,6.833,0,0,0,4.615,1A1.823,1.823,0,0,0-84.9.852a1.89,1.89,0,0,0,.11-1.068c-.758-1.113-2.083-1.324-3.317-1.652-4.316-1.151-4.316-1.151-5.318-2.864A6.1,6.1,0,0,1-93.7-9.25,5.354,5.354,0,0,1-90.768-12.2,9.923,9.923,0,0,1-81.971-11.047Z" transform="translate(94.529 12.74)" fill="#1bb09d"/>
              <path id="Path_846" data-name="Path 846" d="M-12.9-.356l.418-.01A1.546,1.546,0,0,1-11.41.076a16.226,16.226,0,0,1,1.243,2.873l.156.43q.244.673.486,1.347.321.893.645,1.785l.148.415.139.382.121.336a.908.908,0,0,0,.384.536l.081-.226q.423-1.177.847-2.354l.315-.876C-5.182.091-5.182.091-4.369-.322a2.775,2.775,0,0,1,1.9.166,1.95,1.95,0,0,1,.819,1.515,8.022,8.022,0,0,1-.917,2.911l-.268.647q-.43,1.036-.869,2.068l-.3.708q-.777,1.84-1.563,3.676-.346.807-.68,1.618l-.142.344q-.134.324-.266.648a5.654,5.654,0,0,1-2.363,2.97,6.423,6.423,0,0,1-4.506-.109,1.529,1.529,0,0,1-.808-.821,2.761,2.761,0,0,1,.224-1.868,1.821,1.821,0,0,1,1.507-.5q.448.046.894.1a1.425,1.425,0,0,0,1.24-.286c.286-.34.286-.34.232-.662a12.747,12.747,0,0,0-.577-1.5l-.144-.334-.308-.713q-.243-.561-.484-1.123c-.476-1.107-.954-2.213-1.446-3.314q-.281-.629-.557-1.259-.13-.293-.263-.584c-.966-2.117-.966-2.117-.715-3.24A1.857,1.857,0,0,1-12.9-.356Z" transform="translate(29.115 4.609)" fill="#1bb09d"/>
              <path id="Path_847" data-name="Path 847" d="M-70.051-5.275A4.82,4.82,0,0,1-68.36-2.016c.039.64.04,1.279.04,1.92q0,.276,0,.552,0,.575,0,1.151,0,.735,0,1.47,0,.569,0,1.138c0,.268,0,.536,0,.8,0,.164,0,.327,0,.5,0,.143,0,.287,0,.434a2.251,2.251,0,0,1-.78,1.51,2.4,2.4,0,0,1-1.793.357,2.605,2.605,0,0,1-1.152-.793,4.321,4.321,0,0,1-.235-1.845c0-.14,0-.281-.005-.425q-.008-.673-.011-1.346T-72.3,2.067q0-.416-.006-.832a4.8,4.8,0,0,0-.837-3.251,3.146,3.146,0,0,0-2.126-.266,2.626,2.626,0,0,0-1.2,1.063,3,3,0,0,0-.154,1.061l0,.409c0,.146,0,.291,0,.442q-.006.463-.011.926-.008.73-.014,1.46-.006.7-.016,1.409c0,.144,0,.289,0,.437a3.279,3.279,0,0,1-.793,2.55,2.6,2.6,0,0,1-1.793.34,2.434,2.434,0,0,1-1.328-1.063,4.281,4.281,0,0,1-.156-1.415c0-.1,0-.207,0-.313q0-.513-.005-1.026c0-.117,0-.234,0-.355q0-.93-.006-1.859,0-.958-.011-1.916-.005-.738-.005-1.477,0-.353,0-.706c0-.33,0-.661,0-.991l-.005-.291a3.248,3.248,0,0,1,.6-1.873,2.462,2.462,0,0,1,1.866-.462,1.868,1.868,0,0,1,1.322.861,2.962,2.962,0,0,1,.266.8l.224-.214A5.143,5.143,0,0,1-70.051-5.275Z" transform="translate(123.926 10.156)" fill="#1bb09d"/>
              <path id="Path_848" data-name="Path 848" d="M-70.051-5.275A4.822,4.822,0,0,1-68.36-2.149c.042.655.044,1.309.045,1.965q0,.285,0,.571,0,.6,0,1.19c0,.507,0,1.014.008,1.521q0,.588,0,1.176,0,.28,0,.561c0,.262,0,.523,0,.785,0,.148,0,.3,0,.45a2.325,2.325,0,0,1-.871,1.454,2.484,2.484,0,0,1-1.719.291,2.641,2.641,0,0,1-1.152-.789,4.539,4.539,0,0,1-.235-1.912c0-.147,0-.293-.005-.444q-.008-.7-.011-1.405t-.012-1.4q0-.435-.006-.87a4.966,4.966,0,0,0-.555-2.737,1.969,1.969,0,0,0-1.594-.59,2.053,2.053,0,0,0-1.611.581,2.128,2.128,0,0,0-.552,1.607c0,.207,0,.207,0,.418,0,.149,0,.3,0,.452q-.006.473-.011.946-.008.746-.014,1.492-.006.72-.016,1.439c0,.148,0,.3,0,.448a3.97,3.97,0,0,1-.461,2.1,2.249,2.249,0,0,1-1.852.693,2.065,2.065,0,0,1-1.378-.751A3.113,3.113,0,0,1-80.738,5.2c0-.1,0-.2,0-.309q0-.506-.005-1.011l0-.35q0-.917-.006-1.833,0-.944-.011-1.889-.005-.728-.005-1.457,0-.348,0-.7c0-.326,0-.651,0-.977l-.005-.287a3.243,3.243,0,0,1,.6-1.864,2.462,2.462,0,0,1,1.866-.462,1.868,1.868,0,0,1,1.322.861,2.962,2.962,0,0,1,.266.8l.224-.214A5.143,5.143,0,0,1-70.051-5.275Z" transform="translate(109.446 10.156)" fill="#1bb09d"/>
              <path id="Path_849" data-name="Path 849" d="M-74.794-8.32a1.865,1.865,0,0,1,.833,1.247c.041,1.152.041,1.152-.352,1.625a2.014,2.014,0,0,1-1.676.5A3.257,3.257,0,0,1-77.407-5.6a3.349,3.349,0,0,0-2.374-.409A3.141,3.141,0,0,0-81.7-4.6a4.349,4.349,0,0,0-.27,3.521A3.141,3.141,0,0,0-80.259.755,3.568,3.568,0,0,0-77.4.556Q-77.1.388-76.8.211A2.492,2.492,0,0,1-75.06-.217,2.97,2.97,0,0,1-74,.58a2.368,2.368,0,0,1-.05,1.868,6.154,6.154,0,0,1-4.193,2,7.854,7.854,0,0,1-6.078-2,7.091,7.091,0,0,1-1.9-4.127l-.028-.369a7.5,7.5,0,0,1,1.665-5.187,7.265,7.265,0,0,1,3.543-2.149l.287-.074A7.848,7.848,0,0,1-74.794-8.32Z" transform="translate(143.246 13.67)" fill="#1bb09d"/>
            </g>
          </g>
          <text id="Brand" transform="translate(2836 9232)" fill="#1bb09d" font-size="10" font-family="SansSerifCollection, Sans Serif Collection"><tspan x="0" y="0">Brand</tspan></text>
        </g>
      </svg>
      ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="106.897" height="45.279" viewBox="0 0 106.897 45.279">
  <g id="Group_39" data-name="Group 39" transform="translate(-2757.2 -9215)">
    <g id="weblogo-teel" transform="translate(2757.2 9224.696)">
      <g id="Group_17" data-name="Group 17" transform="translate(0 0)">
        <path id="Path_843" data-name="Path 843" d="M-177.171-24.019c.322.28.636.563.943.859a1.149,1.149,0,0,0,.784.336,1.581,1.581,0,0,0,.5-.39l.279-.258c.373-.368.735-.746,1.089-1.132a1.27,1.27,0,0,1,.924-.346,1.617,1.617,0,0,1,.664.4,4.591,4.591,0,0,1,.082,1c0,.1,0,.2,0,.308,0,.337,0,.673-.005,1.01q0,.351,0,.7,0,.735-.007,1.47-.008.943,0,1.886,0,.724,0,1.448,0,.348,0,.7c0,.324,0,.647-.007.971,0,.1,0,.192,0,.291a1.913,1.913,0,0,1-.2.97,2.4,2.4,0,0,1-1.248.191l-.3,0c-.332,0-.665,0-1,0h-.692q-.726,0-1.451,0-.931,0-1.861,0-.715,0-1.43,0h-.686c-.32,0-.639,0-.959,0l-.287,0a1.467,1.467,0,0,1-.959-.234,1.115,1.115,0,0,1-.143-1.015,11.1,11.1,0,0,1,1.676-1.775,1.166,1.166,0,0,0,.317-.749c-1.09-1.44-3.233-2.233-4.941-2.589a11.156,11.156,0,0,0-8.438,2.135,1.049,1.049,0,0,0-.3.72,1.606,1.606,0,0,0,.393.5l.262.281.275.281.248.256c.254.259.511.514.768.768l.281.279.878.872,1.165,1.157.271.268.249.247.219.217a1.55,1.55,0,0,1,.333,1.253,1.115,1.115,0,0,1-.428.793,3.529,3.529,0,0,1-1.223.154l-.516,0-.56,0h-.286l-1.5,0q-.77,0-1.54.008-.6,0-1.193,0l-.567,0a7.042,7.042,0,0,1-5.334-1.79,6.221,6.221,0,0,1-1.669-4.151c.093-2.785,2.144-5.244,4.027-7.124a19.347,19.347,0,0,1,6.377-3.853l.422-.154A17.858,17.858,0,0,1-177.171-24.019Z" transform="translate(204.326 27.698)" fill="#1bb09d"/>
        <path id="Path_844" data-name="Path 844" d="M-125.037-.1l.271,0c.3,0,.591,0,.887,0l.621,0q.651,0,1.3,0c.552,0,1.1,0,1.657-.005q.642,0,1.284,0l.61,0a6.741,6.741,0,0,1,4.955,1.663,6.43,6.43,0,0,1,1.635,4.857c-.1,1.964-1.463,3.665-2.7,5.107l-.272.326A17.665,17.665,0,0,1-126.5,17.715q-.382.025-.764.041l-.368.017a17.727,17.727,0,0,1-12.325-4.581c-.3-.243-.3-.243-.642-.244a4.831,4.831,0,0,0-1.5,1.363,1.832,1.832,0,0,1-1.21.746c-.431-.091-.431-.091-.654-.3a2.417,2.417,0,0,1-.227-1.3c0-.1,0-.2,0-.3,0-.322,0-.645,0-.967q0-.337,0-.673,0-.7,0-1.41,0-.9,0-1.806,0-.695,0-1.389,0-.333,0-.666c0-.31,0-.621,0-.931,0-.137,0-.137,0-.278A2.458,2.458,0,0,1-144,4.017a1.73,1.73,0,0,1,1.261-.275l.308,0c.337,0,.673,0,1.01,0h.7q.735,0,1.47,0,.943.006,1.886,0,.724,0,1.448,0h.7c.324,0,.647,0,.971,0l.291,0a1.554,1.554,0,0,1,.972.231c.138.223.138.223.155.654A3.617,3.617,0,0,1-134.2,6.31a1.411,1.411,0,0,0-.669,1.113c.459,1.066,2.065,1.67,3.082,2.1a10.756,10.756,0,0,0,8.369-.4,9.824,9.824,0,0,0,2.126-1.461,1.046,1.046,0,0,0-.19-.932l-.269-.262-.3-.3-.332-.319-.338-.333q-.535-.527-1.075-1.049t-1.072-1.05q-.333-.327-.669-.652l-.306-.3-.27-.262a1.624,1.624,0,0,1-.5-1.053l.032-.269.026-.27C-126.309-.094-125.691-.1-125.037-.1Z" transform="translate(144.193 17.806)" fill="#1bb09d"/>
      </g>
      <g id="Group_18" data-name="Group 18" transform="translate(37.48 8.028)">
        <path id="Path_845" data-name="Path 845" d="M-81.971-11.047a1.948,1.948,0,0,1,.68,1.465A2.183,2.183,0,0,1-82.08-8a2.523,2.523,0,0,1-1.785.216,14.018,14.018,0,0,1-1.513-.7,5.146,5.146,0,0,0-2.415-.537l-.507-.007a2.612,2.612,0,0,0-1.278.447,1.965,1.965,0,0,0-.34,1.178,1.693,1.693,0,0,0,.738.948,7.336,7.336,0,0,0,1.1.4l.318.1q.782.246,1.571.463c1.795.5,3.844,1.126,4.906,2.781a6.751,6.751,0,0,1,.367,4.458,5.32,5.32,0,0,1-3.015,3.036,10.6,10.6,0,0,1-7.9-.344A7.478,7.478,0,0,1-94.36,2.706a3.445,3.445,0,0,1-.133-1.594,2.121,2.121,0,0,1,1.2-1.2,2.268,2.268,0,0,1,1.8.249c.256.157.509.319.762.481a6.833,6.833,0,0,0,4.615,1A1.823,1.823,0,0,0-84.9.852a1.89,1.89,0,0,0,.11-1.068c-.758-1.113-2.083-1.324-3.317-1.652-4.316-1.151-4.316-1.151-5.318-2.864A6.1,6.1,0,0,1-93.7-9.25,5.354,5.354,0,0,1-90.768-12.2,9.923,9.923,0,0,1-81.971-11.047Z" transform="translate(94.529 12.74)" fill="#1bb09d"/>
        <path id="Path_846" data-name="Path 846" d="M-12.9-.356l.418-.01A1.546,1.546,0,0,1-11.41.076a16.226,16.226,0,0,1,1.243,2.873l.156.43q.244.673.486,1.347.321.893.645,1.785l.148.415.139.382.121.336a.908.908,0,0,0,.384.536l.081-.226q.423-1.177.847-2.354l.315-.876C-5.182.091-5.182.091-4.369-.322a2.775,2.775,0,0,1,1.9.166,1.95,1.95,0,0,1,.819,1.515,8.022,8.022,0,0,1-.917,2.911l-.268.647q-.43,1.036-.869,2.068l-.3.708q-.777,1.84-1.563,3.676-.346.807-.68,1.618l-.142.344q-.134.324-.266.648a5.654,5.654,0,0,1-2.363,2.97,6.423,6.423,0,0,1-4.506-.109,1.529,1.529,0,0,1-.808-.821,2.761,2.761,0,0,1,.224-1.868,1.821,1.821,0,0,1,1.507-.5q.448.046.894.1a1.425,1.425,0,0,0,1.24-.286c.286-.34.286-.34.232-.662a12.747,12.747,0,0,0-.577-1.5l-.144-.334-.308-.713q-.243-.561-.484-1.123c-.476-1.107-.954-2.213-1.446-3.314q-.281-.629-.557-1.259-.13-.293-.263-.584c-.966-2.117-.966-2.117-.715-3.24A1.857,1.857,0,0,1-12.9-.356Z" transform="translate(29.115 4.609)" fill="#1bb09d"/>
        <path id="Path_847" data-name="Path 847" d="M-70.051-5.275A4.82,4.82,0,0,1-68.36-2.016c.039.64.04,1.279.04,1.92q0,.276,0,.552,0,.575,0,1.151,0,.735,0,1.47,0,.569,0,1.138c0,.268,0,.536,0,.8,0,.164,0,.327,0,.5,0,.143,0,.287,0,.434a2.251,2.251,0,0,1-.78,1.51,2.4,2.4,0,0,1-1.793.357,2.605,2.605,0,0,1-1.152-.793,4.321,4.321,0,0,1-.235-1.845c0-.14,0-.281-.005-.425q-.008-.673-.011-1.346T-72.3,2.067q0-.416-.006-.832a4.8,4.8,0,0,0-.837-3.251,3.146,3.146,0,0,0-2.126-.266,2.626,2.626,0,0,0-1.2,1.063,3,3,0,0,0-.154,1.061l0,.409c0,.146,0,.291,0,.442q-.006.463-.011.926-.008.73-.014,1.46-.006.7-.016,1.409c0,.144,0,.289,0,.437a3.279,3.279,0,0,1-.793,2.55,2.6,2.6,0,0,1-1.793.34,2.434,2.434,0,0,1-1.328-1.063,4.281,4.281,0,0,1-.156-1.415c0-.1,0-.207,0-.313q0-.513-.005-1.026c0-.117,0-.234,0-.355q0-.93-.006-1.859,0-.958-.011-1.916-.005-.738-.005-1.477,0-.353,0-.706c0-.33,0-.661,0-.991l-.005-.291a3.248,3.248,0,0,1,.6-1.873,2.462,2.462,0,0,1,1.866-.462,1.868,1.868,0,0,1,1.322.861,2.962,2.962,0,0,1,.266.8l.224-.214A5.143,5.143,0,0,1-70.051-5.275Z" transform="translate(123.926 10.156)" fill="#1bb09d"/>
        <path id="Path_848" data-name="Path 848" d="M-70.051-5.275A4.822,4.822,0,0,1-68.36-2.149c.042.655.044,1.309.045,1.965q0,.285,0,.571,0,.6,0,1.19c0,.507,0,1.014.008,1.521q0,.588,0,1.176,0,.28,0,.561c0,.262,0,.523,0,.785,0,.148,0,.3,0,.45a2.325,2.325,0,0,1-.871,1.454,2.484,2.484,0,0,1-1.719.291,2.641,2.641,0,0,1-1.152-.789,4.539,4.539,0,0,1-.235-1.912c0-.147,0-.293-.005-.444q-.008-.7-.011-1.405t-.012-1.4q0-.435-.006-.87a4.966,4.966,0,0,0-.555-2.737,1.969,1.969,0,0,0-1.594-.59,2.053,2.053,0,0,0-1.611.581,2.128,2.128,0,0,0-.552,1.607c0,.207,0,.207,0,.418,0,.149,0,.3,0,.452q-.006.473-.011.946-.008.746-.014,1.492-.006.72-.016,1.439c0,.148,0,.3,0,.448a3.97,3.97,0,0,1-.461,2.1,2.249,2.249,0,0,1-1.852.693,2.065,2.065,0,0,1-1.378-.751A3.113,3.113,0,0,1-80.738,5.2c0-.1,0-.2,0-.309q0-.506-.005-1.011l0-.35q0-.917-.006-1.833,0-.944-.011-1.889-.005-.728-.005-1.457,0-.348,0-.7c0-.326,0-.651,0-.977l-.005-.287a3.243,3.243,0,0,1,.6-1.864,2.462,2.462,0,0,1,1.866-.462,1.868,1.868,0,0,1,1.322.861,2.962,2.962,0,0,1,.266.8l.224-.214A5.143,5.143,0,0,1-70.051-5.275Z" transform="translate(109.446 10.156)" fill="#1bb09d"/>
        <path id="Path_849" data-name="Path 849" d="M-74.794-8.32a1.865,1.865,0,0,1,.833,1.247c.041,1.152.041,1.152-.352,1.625a2.014,2.014,0,0,1-1.676.5A3.257,3.257,0,0,1-77.407-5.6a3.349,3.349,0,0,0-2.374-.409A3.141,3.141,0,0,0-81.7-4.6a4.349,4.349,0,0,0-.27,3.521A3.141,3.141,0,0,0-80.259.755,3.568,3.568,0,0,0-77.4.556Q-77.1.388-76.8.211A2.492,2.492,0,0,1-75.06-.217,2.97,2.97,0,0,1-74,.58a2.368,2.368,0,0,1-.05,1.868,6.154,6.154,0,0,1-4.193,2,7.854,7.854,0,0,1-6.078-2,7.091,7.091,0,0,1-1.9-4.127l-.028-.369a7.5,7.5,0,0,1,1.665-5.187,7.265,7.265,0,0,1,3.543-2.149l.287-.074A7.848,7.848,0,0,1-74.794-8.32Z" transform="translate(143.246 13.67)" fill="#1bb09d"/>
      </g>
    </g>
    <text id="Creator" transform="translate(2828 9231)" fill="#1bb09d" font-size="10" font-family="SansSerifCollection, Sans Serif Collection"><tspan x="0" y="0">Creator</tspan></text>
  </g>
</svg>

        )}
            </a>
           

            <div className="dropdown ms-auto">
              <FeedbackFish projectId={"0f9650767d04f4"}>
                <button className="btn bg-transparent border-0 me-2">
                  <Icon
                    icon="mingcute:question-line"
                    width={24}
                    height={24}
                    className="text-warning"
                  />
                </button>
              </FeedbackFish>
            </div>
            <div className="dropdown ">
              <a
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={readNotification}
              >
                <Icon
                  icon="mingcute:notification-line"
                  width={24}
                  height={24}
                  className="text-warning"
                />
                {newNotification && (
                  <span className="position-circle-notification">
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    ></div>
                  </span>
                )}
              </a>

              <ul className="dropdown-menu p-0">
                <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
                  <span className="text-dark">Notifications</span>
                  {/* <a href="#" className="text-muted fs-12 text-decoration-none">View All</a> */}
                </li>
                {notifications?.notifications &&
                notifications?.notifications?.length !== 0 ? (
                  notifications?.notifications?.map(
                    (notify: any, index: number) => {
                      return (
                        <div
                          key={index}
                          style={
                            notify?.Is_Seen
                              ? {}
                              : { backgroundColor: "#F0F5FF" }
                          }
                        >
                          <li>
                            <a className="dropdown-item">
                              <div className="d-flex gap-2">
                                <div className="rounded-circle flex-shrink-0 bg-circle-notification">
                                  {notify?.Notification_Icon_Type ==
                                    "new_campaign_application" && (
                                    <Icon
                                      icon="ci:add-plus"
                                      width="22"
                                      height="22"
                                      className="text-info"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_application_accepted" && (
                                    <Icon
                                      icon="mdi:tick"
                                      width="20"
                                      height="20"
                                      className="text-primary"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_post_rejected" && (
                                    <Icon
                                      icon="pepicons-pencil:exclamation"
                                      width="22"
                                      height="22"
                                      className="text-danger"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_post_approved" && (
                                    <Icon
                                      icon="mdi:tick"
                                      width="20"
                                      height="20"
                                      className="text-primary"
                                    />
                                  )}
                                  {notify?.Notification_Icon_Type ==
                                    "campaign_post_submission" && (
                                    <Icon
                                      icon="ci:add-plus"
                                      width="22"
                                      height="22"
                                      className="text-info"
                                    />
                                  )}
                                </div>
                                <div className="flex-grow-1">
                                  <p className="mb-0 fw-medium fs-12">
                                    {notify?.Title}
                                  </p>
                                  <p className="mb-0 fs-10 text-warning line-clamp-2">
                                    {notify?.Message}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>

                          <hr className="m-0 text-warning" />
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className=" mb-2 mt-2 text-center">
                    <small>No new Notifications </small>
                  </div>
                )}
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => {
                  setNewMessage(false);
                }}
              >
                <Icon
                  icon="uil:envelope"
                  width={25}
                  height={25}
                  className="text-warning"
                />
                <span className="position-circle-message">
                  {newMessage && (
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    ></div>
                  )}
                </span>
              </a>
              <ul className="dropdown-menu p-0">
                <li className="activated-subtle dropdown-header sticky-top d-flex justify-content-between">
                  <span className="text-dark">Messages</span>
                  <a
                    className="text-muted fs-12 text-decoration-none"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push("/inbox");
                    }}
                  >
                    View All
                  </a>
                </li>
                {conversationList?.conversations?.map(
                  (conversation: any, index: number) => {
                    return (
                      <div key={index}>
                        <li
                          onClick={async () => {
                            const response = await readMessage(conversation);
                            if (response) {
                              router.push(
                                `/inbox?id=${conversation?.Last_Message?.Recipient_ID}`
                              );
                            } else {
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <a
                            className="dropdown-item"
                            style={{ color: "inherit" }}
                          >
                            <div className="d-flex align-items-center cursor-pointer">
                              <img
                                src={
                                  conversation?.Profile_Image ||
                                  "https://e1cdn.social27.com/digitalevents/synnc/no-pic-synnc.jpg"
                                }
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-circle me-2 flex-shrink-0"
                              />

                              <div className="flex-grow-1">
                                <h6 className="mb-0 fs-12">
                                  {conversation?.Name}{" "}
                                </h6>
                                <small className="text-muted fs-10">
                                  {conversation?.Last_Message?.Message?.length <
                                  26
                                    ? conversation?.Last_Message?.Message
                                    : conversation?.Last_Message?.Message?.slice(
                                        0,
                                        25
                                      ) + "..."}
                                </small>
                              </div>
                              <div
                                style={{
                                  textAlign: "center",
                                  alignContent: "center",
                                }}
                              >
                                {conversation?.conversation_new_messages !==
                                  0 && (
                                  <div className="number-circle ms-auto">
                                    <span className="fs-10">
                                      {conversation?.conversation_new_messages}
                                    </span>
                                  </div>
                                )}
                                <small className="text-muted fs-10 flex-shrink-0 ms-2 w-s">
                                  {conversation?.Last_Message?.Time_Ago}
                                </small>
                              </div>
                            </div>
                          </a>
                        </li>
                        <hr className="m-0 text-warning" />
                      </div>
                    );
                  }
                )}
              </ul>
            </div>

            <div className="dropdown">
              <a
                className="btn bg-transparent dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  {userProfile?.Profile_Image || userProfile?.Company_Logo ? (
                    <div className="img-container-topHeader">
                    <img
                      src={
                        userProfile?.Profile_Image || userProfile?.Company_Logo
                      }
                      alt="user"
                     className=""
                    />
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <span className="fw-bold text-uppercase">
                        {userProfile?.Company_Name
                          ? userProfile.Company_Name.charAt(0)
                          : userProfile?.Name
                          ? userProfile.Name.charAt(0)
                          : "U"}
                      </span>
                    </div>
                  )}
                  <p className="mb-0 ms-2">
                    {userProfile?.Company_Name || userProfile?.Name}
                  </p>
                  <Icon
                    icon="prime:chevron-down"
                    className="ms-2"
                    width={20}
                    height={20}
                  />
                </div>
              </a>

              <ul className="dropdown-menu sign-out-menu p-0">
                {user?.isBuyer && (
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handlePlanUpgrade}
                    >
                      Plan Upgrade
                    </a>
                  </li>
                )}
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      router.push("/settings");
                    }}
                  >
                    <form className="d-flex" role="search">
                      <p className="mb-0">Settings</p>
                    </form>
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={navigateToSignIn}
                  >
                    <form className="d-flex" role="search">
                      <p className="mb-0">Sign Out</p>
                    </form>
                  </a>
                </li>
              </ul>
            </div>

            {/* </div> */}
          </div>
        </nav>
      </header>
    </>
  );
}
