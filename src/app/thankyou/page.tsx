"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";

// Loading component for the thank you page
const ThankYouLoader = () => (
  <div className="container">
    <div className="card">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Loading payment confirmation...</p>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
      }
      .card {
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
    `}</style>
  </div>
);

// Main content component
const ThankYouContent = () => {
  const router = useRouter();
  const { user, loginUser } = useAuth();
  const searchParams = useSearchParams();
  const checkoutSession = searchParams.get("checkoutsession");

  // useEffect(() => {
  //   if (checkoutSession) {
  //     const updatedUser = {
  //       ...user,
  //       stripe_customer_id: checkoutSession,
  //       subscription_status: {
  //         has_active_subscription: true,
  //         requires_payment: false
  //       }
  //     };

  //     // Store updated user data
  //     loginUser(updatedUser);
  //     localStorage.setItem('checkoutSession', checkoutSession);
  //     console.log('Updated user data:', updatedUser);

  //   }
  // }, [checkoutSession, loginUser, user]);

  // If no checkout session, show error or redirect
  if (!checkoutSession) {
    return (
      <div className="container">
        <div className="card">
          <h1 style={{ color: "#dc3545" }}>Invalid Session</h1>
          <p>No valid checkout session found.</p>
          <a href="/" className="button">
            Go to Home
          </a>
        </div>
        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }

          .card {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            text-align: center;
          }

          h1 {
            color: #4caf50;
          }

          p {
            color: #333;
            margin: 10px 0;
          }

          .button {
            display: inline-block;
            padding: 10px 20px;
            color: #fff;
            background: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }

          .button:hover {
            background: #45a049;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Thank You!</h1>
        <p>Your payment has been received successfully.</p>
        <p>We appreciate your business and will process your order shortly.</p>
        <p>You will be redirected to dashboard in 5 seconds...</p>
        <a
          href={user?.isBuyer ? "/homepagebuyer" : "/homepage"}
          className="button"
        >
          Back to Dashboard
        </a>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }

        .card {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          text-align: center;
        }

        h1 {
          color: #4caf50;
        }

        p {
          color: #333;
          margin: 10px 0;
        }

        .button {
          display: inline-block;
          padding: 10px 20px;
          color: #fff;
          background: #4caf50;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
        }

        .button:hover {
          background: #45a049;
        }
      `}</style>
    </div>
  );
};

// Main page component with Suspense
export default function ThankYou() {
  return (
    <Suspense fallback={<ThankYouLoader />}>
      <ThankYouContent />
    </Suspense>
  );
}
