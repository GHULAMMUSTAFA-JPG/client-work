"use client";

import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ConnectStripeLoader = () => (
  <div className="container">
    <div className="card">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>Connecting your Stripe account...</p>
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

const ConnectStripeContent = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/settings");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="container">
      <div className="card">
        <h1>Stripe Account Linked!</h1>
        <p>Your Stripe account has been successfully connected.</p>
        <p>Thank you for linking your payment method.</p>
        <p>You will be redirected to your dashboard shortly...</p>
        <a href="/settings" className="button">
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

export default function ConnectStripe() {
  return (
    <Suspense fallback={<ConnectStripeLoader />}>
      <ConnectStripeContent />
    </Suspense>
  );
}
