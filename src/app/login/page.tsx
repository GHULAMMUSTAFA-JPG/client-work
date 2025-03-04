"use client";

import { Suspense } from "react";

import useForm from "@/hooks/useForm";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { apiController } from "@/@api/baseUrl";
import { login, newLogin } from "@/@api";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const [userType, setUserType] = useState<"brand" | "creator">("creator");
  const { loginUser, user, setIsLoading, setIsAuthenticated, setUser } =
    useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(
    null
  );
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState<
    string | null
  >(null);

  const handleForgotPassword = async () => {
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null);
    if (!forgotPasswordEmail) {
      setForgotPasswordError("Email is required");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          email: forgotPasswordEmail,
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        setForgotPasswordSuccess(
          "Password reset link has been sent to your email"
        );
      } else {
        setForgotPasswordError(
          "Failed to send password reset link. Please try again later."
        );
      }
    } catch (error) {
      setIsLoading(false);
      setForgotPasswordError("An error occurred. Please try again later.");
    }
  };
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [linkedInError, setLinkedInError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const codess = searchParams.get("code");
  const getToken = async (code: any) => {
    const response = await apiController.get(
      `${process.env.NEXT_PUBLIC_API_URL}/linkedin/portal_generate_oauth_token?code=${code}`,
      {
        headers: {
          Origin: window.location.origin,
        },
      }
    );
    if (response.status == 200) {
      setIsLoading(false);
      const profileData = response?.data?.profile_data;
      localStorage.setItem("token", response?.data?.oauth_token);
      localStorage.setItem("id", profileData?._id);
      const data = {
        email: profileData?.Email,
        Is_Creator: profileData?.Is_Creator,
        name: profileData?.Name,
        Profile_Image: profileData?.Profile_Image || "",
        uuid: profileData?._id,
      };
      if (
        response?.data?.profile_data.subscription_status.requires_payment ==
        true
      ) {
        router.push("/stripe");
        return;
      }
      loginUser(data);
    } else {
      setIsLoading(false);
    }
  };

  const initialValues = { email: "", password: "" };
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const signupInitialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    companyEmail: "",
    companyWebsite: "",
    password: "",
  };

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const validateSignup = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};

    if (!values.first_name) errors.first_name = "First name is required";
    if (!values.last_name) errors.last_name = "Last name is required";

    if (!values.company_name) errors.company_name = "Company name is required";

    if (!values.email) {
      errors.email = "Company email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.company_website) {
      errors.company_website = "Company website is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  };

  const validateLogin = (values: Record<string, string>) => {
    const errors: Record<string, string> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.password) errors.password = "Password is required";

    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: isLogin ? loginInitialValues : signupInitialValues,
    validate: isLogin ? validateLogin : validateSignup,
  });

  const handleAuth = async () => {
    setError(null);
    try {
      if (isLogin) {
        if (values?.email == "" && values?.password == "")
          toast.warn("Email and password cannot be empty");
        else if (values?.email == "") toast.warn("Email cannot be empty");
        else if (values?.password == "") toast.warn("Password cannot be empty");
        else {
          setIsLoading(true);
          setLoader(true);
          const response: any = await newLogin({
            email: values?.email,
            password: values?.password,
          });
          setLoader(false);
          if (response.data.subscription_status.requires_payment == true) {
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("checkoutisbuyer", response?.data.isBuyer);
            const userData = response?.data;
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(userData);
            setIsAuthenticated(true);
            router.push("/stripe");
          } else if (response?.data) {
            const userData = {
              ...response.data,
              subscription_status: response.data.subscription_status,
            };
            loginUser(userData);
            localStorage.setItem("id", response?.data?._id);
            localStorage.setItem("checkoutisbuyer", response?.data?.isBuyer);
            if (response.data.isBuyer) {
              if (
                !response.data.subscription_status?.has_active_subscription &&
                response.data.subscription_status?.requires_payment
              ) {
                router.push("/stripe");
              } else {
                router.push("/homepagebuyer");
              }
            } else {
              router.push("/homepage");
            }
          } else {
            setIsLoading(false);
          }
        }
      } else {
        if (values.first_name == "" || !values.first_name) {
          toast.warn("First name cannot be empty");
        } else if (values?.last_name == "" || !values?.last_name) {
          toast.warn("Last name cannot be empty");
        } else if (values?.company_name == "" || !values?.company_name) {
          toast.warn("Company name cannot be empty");
        } else if (values?.email == "") {
          toast.warn("Email cannot be empty");
        } else if (values?.company_website == "") {
          toast.warn("Company website cannot be empty");
        } else if (values?.password == "") {
          toast.warn("Password name cannot be empty");
        } else if (values?.first_name?.trim() === "") {
          toast.warn("Empty spaces are not allowed in name");
        } else if (values?.last_name?.trim() === "") {
          toast.warn("Empty spaces are not allowed in name");
        } else if (values?.company_name?.trim() === "") {
          toast.warn("Empty spaces are not allowed in Company name");
        } else {
          setLoader(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/buyer/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...values, userType }),
            }
          );

          const data = await response.json();
          if (data?.detail) {
            toast.warn(data?.detail);
          } else {
            localStorage.setItem("id", data?.data._id);
            localStorage.setItem("checkoutisbuyer", data?.data.isBuyer);
            const userData = data?.data.session_response;
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setIsAuthenticated(true);
            router.push("/stripe");
          }
          setLoader(false);
        }
      }
    } catch (error: any) {
      setLoader(false);

      if (error.response?.status === 401) {
      } else {
        setError(
          error.response?.data?.message ||
            `Failed to ${
              isLogin ? "login" : "create account"
            }. Please try again later.`
        );
      }
    }
  };

  const toggleAuthMode = () => {
    if (userType === "creator") {
      setUserType("brand");
      setIsLogin(true);
    } else {
      setIsLogin(!isLogin);
    }
    setError(null);
    setLinkedInError(null);
  };

  const toggleUserType = () => {
    setUserType(userType === "brand" ? "creator" : "brand");
    setError(null);
    setLinkedInError(null);
    if (userType === "brand") {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    codess && !user?.email && getToken(codess);
  }, [codess]);

  const signInWithLinkedIn = async (e: any) => {
    const redirectUri = `${window.location.origin}/login`;
    const clientId = "86kqbx17og1eeb";
    const state = "foobar";
    const scope = "email%20openid%20profile";
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;
    window.location.href = authorizationUrl;
  };

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  function handleForgotPasswordClick(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void {
    event.preventDefault();
    setShowForgotPassword(true);
  }

  return codess ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="min-vh-100 d-flex align-items-center justify-content-center login-container py-5">
      <div className="position-absolute top-0 start-0 p-3">
        <img
          src="/assets/images/synnc-logo-new.png"
          alt="Synnc"
          width={120}
          height={40}
          className="img-fluid"
        />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="bg-white rounded-2 shadow-lg py-3 max-w-28rem max-w-md">
            <div className="box-content-wrapper">
              <div className="text-center mb-4">
                <div className="mb-4 tabs-box">
                  <button
                    className={`${
                      userType === "creator"
                        ? "btn-tab-selected"
                        : "btn-tab-Nselected"
                    }`}
                    onClick={() => toggleUserType()}
                  >
                    Creator
                  </button>
                  <button
                    className={` ${
                      userType === "brand"
                        ? "btn-tab-selected"
                        : "btn-tab-Nselected"
                    }`}
                    onClick={() => toggleUserType()}
                  >
                    Brand
                  </button>
                </div>

                {userType !== "creator" && isLogin && (
                  <div className="mb-4  forgetpasswordSection">
                    <div className="back-to-login">
                      <a
                        onClick={() => {
                          setIsLogin(true);
                          const forgetPasswordSection = document.querySelector(
                            ".forgetpasswordSection"
                          );
                          if (forgetPasswordSection) {
                            forgetPasswordSection.classList.remove(
                              "showforgetpasswordSection"
                            );
                          }
                        }}
                        className="Link-Txt fs-14 d-flex cursor"
                      >
                        <Icon
                          icon="material-symbols:arrow-back"
                          className="me-2"
                          width={20}
                          height={20}
                        />
                        Back to Sign In
                      </a>
                    </div>
                    <div className="content-area text-center">
                      <h1 className="headingtxt mt-5 mb-3">
                        Reset Your Password
                      </h1>
                      <div className="sub-headingtxt text-center mb-4">
                        Check your email for a link to reset your password.
                      </div>
                      <input
                        type="email"
                        name="forgotPasswordEmail"
                        placeholder="Enter your email"
                        className={`form-control ${
                          forgotPasswordError ? "is-invalid" : ""
                        }`}
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                      {forgotPasswordError && (
                        <div className="invalid-feedback">
                          {forgotPasswordError}
                        </div>
                      )}
                      {forgotPasswordSuccess && (
                        <div
                          className="alert alert-success py-2 small mt-2"
                          role="alert"
                        >
                          {forgotPasswordSuccess}
                        </div>
                      )}
                      <button
                        type="button"
                        className="SignIN-btn mb-3 mt-3"
                        onClick={handleForgotPassword}
                      >
                        Send Reset Link
                      </button>
                      {forgotPasswordSuccess && (
                        <div
                          className="alert alert-success py-2 small mt-2"
                          role="alert"
                          style={{
                            backgroundColor: "#f0fdfa",
                            border: "1px solid  #99f6e4",
                          }}
                        >
                          <div className="resetpassword-content">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-mail text-teal-500 mr-3 mt-0.5 flex-shrink-0"
                            >
                              <rect
                                width="20"
                                height="16"
                                x="2"
                                y="4"
                                rx="2"
                              ></rect>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                            <div className="result-contentbox">
                              <p>Email Sent</p>
                              <p>
                                We've sent a password reset link to your email
                                address. Please check your inbox and follow the
                                instructions to reset your password.
                              </p>
                              <p>
                                Didn't receive an email? Check your spam folder
                                or try again.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <h1 className="headingtxt mt-5 mb-3">
                  {userType === "brand" ? "Brand" : "Creator"} Sign{" "}
                  {userType === "creator" || isLogin ? "In" : "Up"}
                </h1>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {error}
                </div>
              )}

              {linkedInError && (
                <div className="alert alert-danger py-2 small" role="alert">
                  {linkedInError}
                </div>
              )}

              {userType !== "creator" && (
                <>
                  {showForgotPassword ? (
                    <div className="content-area text-center">
                      <div className="back-to-login">
                        <a
                          onClick={() => setShowForgotPassword(false)}
                          className="Link-Txt fs-14 d-flex cursor"
                        >
                          <Icon
                            icon="material-symbols:arrow-back"
                            className="me-2"
                            width={20}
                            height={20}
                          />
                          Back to Sign In
                        </a>
                      </div>
                      <h1 className="headingtxt mt-5 mb-3">
                        Reset Your Password
                      </h1>
                      <div className="sub-headingtxt text-center mb-4">
                        Check your email for a link to reset your password.
                      </div>
                      <input
                        type="email"
                        name="forgotPasswordEmail"
                        placeholder="Enter your email"
                        className={`form-control ${
                          forgotPasswordError ? "is-invalid" : ""
                        }`}
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      />
                      {forgotPasswordError && (
                        <div className="invalid-feedback">
                          {forgotPasswordError}
                        </div>
                      )}
                      {forgotPasswordSuccess && (
                        <div
                          className="alert alert-success py-2 small mt-2"
                          role="alert"
                        >
                          {forgotPasswordSuccess}
                        </div>
                      )}
                      <button
                        type="button"
                        className="SignIN-btn mb-3 mt-3"
                        onClick={handleForgotPassword}
                      >
                        Send Reset Link
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e, handleAuth);
                      }}
                    >
                      <div className="sub-headingtxt text-center mb-4">
                        {isLogin
                          ? "Find and hire top LinkedIn creators to grow your business."
                          : userType === "brand"
                          ? "Ready to connect with LinkedIn influencers? Set up your brand account below."
                          : "Email"}
                        {!isLogin && userType === "brand"}
                      </div>
                      {!isLogin && (
                        <>
                          <div className="row mb-3">
                            <div className="col-6">
                              <label
                                htmlFor="first_name"
                                className="form-label fs-14"
                              >
                                First Name
                              </label>
                              <input
                                type="text"
                                name="first_name"
                                placeholder="Enter your first name"
                                className={`form-control ${
                                  errors.first_name ? "is-invalid" : ""
                                }`}
                                value={values.first_name || ""}
                                onChange={handleChange}
                              />
                              {errors.first_name && (
                                <div className="invalid-feedback">
                                  {errors.first_name}
                                </div>
                              )}
                            </div>
                            <div className="col-6">
                              <label
                                htmlFor="last_name"
                                className="form-label fs-14"
                              >
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="last_name"
                                placeholder="Enter your last name"
                                className={`form-control ${
                                  errors.last_name ? "is-invalid" : ""
                                }`}
                                value={values.last_name || ""}
                                onChange={handleChange}
                              />
                              {errors.last_name && (
                                <div className="invalid-feedback">
                                  {errors.last_name}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="company_name"
                              className="form-label fs-14"
                            >
                              Company Name
                            </label>
                            <input
                              type="text"
                              name="company_name"
                              placeholder="Enter your company name"
                              className={`form-control ${
                                errors.company_name ? "is-invalid" : ""
                              }`}
                              value={values.company_name || ""}
                              onChange={handleChange}
                            />
                            {errors.company_name && (
                              <div className="invalid-feedback">
                                {errors.company_name}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <div className="mb-3">
                        <label
                          htmlFor={isLogin ? "email" : "email"}
                          className="form-label fs-14"
                        >
                          {isLogin
                            ? "Email"
                            : userType === "brand"
                            ? "Company Email"
                            : "Email"}
                          {!isLogin && userType === "brand"}
                        </label>
                        <input
                          type="email"
                          name={"email"}
                          placeholder={
                            isLogin
                              ? "Enter your email"
                              : userType === "brand"
                              ? "Enter your company email"
                              : "Enter your email"
                          }
                          className={`form-control ${
                            errors[isLogin ? "email" : "email"]
                              ? "is-invalid"
                              : ""
                          }`}
                          value={values[isLogin ? "email" : "email"] || ""}
                          onChange={handleChange}
                        />
                        {errors[isLogin ? "email" : "email"] && (
                          <div className="invalid-feedback">
                            {errors[isLogin ? "email" : "email"]}
                          </div>
                        )}
                      </div>

                      {!isLogin && (
                        <div className="mb-3">
                          <label
                            htmlFor="company_website"
                            className="form-label fs-14"
                          >
                            Company Website
                          </label>
                          <div className="input-group">
                            <span className="input-group-text fs-14">
                              https://
                            </span>
                            <input
                              type="text"
                              name="company_website"
                              placeholder="Enter your company website"
                              className={`form-control ${
                                errors.company_website ? "is-invalid" : ""
                              }`}
                              value={values.company_website || ""}
                              onChange={handleChange}
                            />
                            {errors.company_website && (
                              <div className="invalid-feedback">
                                {errors.company_website}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <label
                            htmlFor="password"
                            className="form-label fs-14"
                          >
                            Password
                            {!isLogin}
                          </label>
                          <a
                            className="Link-Txt fs-14 cursor mb-2"
                            onClick={handleForgotPasswordClick}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <div className="position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder={
                              isLogin
                                ? "Enter your password"
                                : "Create a password"
                            }
                            className={`form-control ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            value={values.password || ""}
                            onChange={handleChange}
                          />
                          {!showPassword ? (
                            <Icon
                              icon="solar:eye-outline"
                              width={20}
                              height={20}
                              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor text-secondary"
                              onClick={() => setShowPassword(true)}
                            />
                          ) : (
                            <Icon
                              icon="mage:eye-off"
                              width={20}
                              height={20}
                              className="position-absolute top-50 end-0 translate-middle-y me-3 cursor text-secondary"
                              onClick={() => setShowPassword(false)}
                            />
                          )}
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="SignIN-btn mb-3 mt-3"
                        disabled={loader}
                      >
                        {loader
                          ? isLogin
                            ? "Signing In..."
                            : "Creating Account..."
                          : isLogin
                          ? "Sign In"
                          : "Create an Account"}
                        <Icon
                          icon="material-symbols:arrow-forward"
                          className="ms-2"
                          width={20}
                          height={20}
                        />
                      </button>

                      <div className="text-center mb-3 mt-3 d-flex justify-content-center align-items-center gap-1">
                        <span className="text-muted small fs-14">
                          {isLogin
                            ? "Need an account as a Brand? "
                            : isLogin
                            ? "Don't have an account? "
                            : "Have an account? "}
                        </span>
                        <span
                          onClick={toggleAuthMode}
                          className="Link-Txt fs-14 cursor"
                        >
                          {isLogin ? "Sign up" : "Sign in"}
                        </span>
                      </div>
                    </form>
                  )}
                </>
              )}

              {userType === "creator" && (
                <>
                  <div className="sub-headingtxt text-center mb-4" role="alert">
                    Showcase your LinkedIn influence and earn through brand
                    collaborations.
                  </div>
                  <button
                    type="button"
                    onClick={(e: any) => {
                      signInWithLinkedIn(e);
                    }}
                    className="SignIN-linkedINbtn mb-3 mt-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.999"
                      height="21"
                      viewBox="0 0 20.999 21"
                    >
                      <path
                        id="Icon_corebrands-linkedin-in"
                        data-name="Icon corebrands-linkedin-in"
                        d="M6.2,21H1.847V6.979H6.2ZM4.022,5.067A2.534,2.534,0,1,1,6.543,2.522,2.543,2.543,0,0,1,4.022,5.067ZM22.5,21H18.152V14.175c0-1.627-.033-3.713-2.264-3.713-2.264,0-2.611,1.767-2.611,3.6V21H8.928V6.979H13.1V8.892h.061a4.574,4.574,0,0,1,4.119-2.264c4.406,0,5.216,2.9,5.216,6.67V21Z"
                        transform="translate(-1.5)"
                        fill="#fff"
                      />
                    </svg>
                    Continue with LinkedIn
                  </button>
                  <div className="fs-14 py-2 text-center">
                    We use LinkedIn to verify your professional profile and
                    gather campaign analytics.
                  </div>
                  <div className="text-center mb-3 mt-3 d-flex justify-content-center align-items-center gap-1">
                    <span className="text-muted small fs-14">
                      {isLogin
                        ? "Not a Creator?"
                        : isLogin
                        ? "Don't have an account? "
                        : "Have an account? "}
                    </span>
                    <span
                      onClick={toggleAuthMode}
                      className="Link-Txt fs-14 cursor"
                    >
                      {isLogin ? "Sign in as a Brand" : "Sign in"}
                    </span>
                  </div>
                </>
              )}
              <div className="footer-pannel fs-12 text-center">
                By signing in, you agree to our &nbsp;
                <a href="/terms" className="Link-Txt fs-14 cursor">
                  Terms
                </a>
                &nbsp; and &nbsp;
                <a href="/privacy" className="Link-Txt fs-14 cursor">
                  Privacy Policy
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function AuthPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
// export default AuthPage;
