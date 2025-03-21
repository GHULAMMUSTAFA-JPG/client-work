"use client";
import { AuthProvider } from "@/contexts/AuthContext"; // Import the provider
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style-global.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "@/components/Main";
import "@/styles/globals.css";
import SocketProvider from "@/components/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    if (typeof document !== undefined) {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
      AOS.init();
    }
  }, []);

  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setShowTip(false);
    } else {
      setShowTip(true);
    }
  });
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DBPKSCN6LE"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DBPKSCN6LE');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "qk2mfyjujk");
            `,
          }}
        />
      </head>

      <body>
        {/* <AuthProvider>
          {" "}
          <Main>{children}</Main>
        </AuthProvider> */}
        <AuthProvider>
          <SocketProvider> {/* Add SocketProvider here */}
            <Main>{children}</Main>
            <ToastContainer position="top-right" autoClose={5000} />
          </SocketProvider>
        </AuthProvider>
        {/* <ToastContainer /> */}

        {/* Navigation Tip Alert */}
        {/* {showTip && (
          <div
            className="position-fixed bottom-0 end-0 p-3"
            style={{
              zIndex: 1050,
              transform: "translateX(100%)",
              animation: "slideIn 0.5s ease-out 1s forwards",
            }}
          >
            <style jsx>{`
              @keyframes slideIn {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
            `}</style>
            <div
              className="alert alert-info alert-dismissible fade show d-flex align-items-start"
              role="alert"
            >
              <Icon
                icon="ph:lightbulb"
                width={24}
                height={24}
                className="text-info flex-shrink-0"
              />
              <div className="ms-2">
                <strong>Quick Navigation Tip</strong>
                <p className="mb-0">
                  Use keyboard shortcuts to navigate faster! Press '?' to see
                  all available shortcuts and enhance your productivity.
                </p>
              </div>
              <div
                className="d-flex align-items-center justify-content-center bg-info-subtle rounded-circle cursor-pointer ms-auto"
                style={{
                  width: "24px",
                  height: "24px",
                  minWidth: "24px",
                  minHeight: "24px",
                }}
                onClick={() => setShowTip(false)}
                role="button"
                aria-label="Close"
              >
                <Icon
                  icon="ph:x-bold"
                  width={16}
                  height={16}
                  className="text-info"
                />
              </div>
            </div>
          </div>
        )} */}
      </body>
    </html>
  );
}

export default RootLayout;
