"use client";

import { Suspense } from "react";

import useForm from "@/hooks/useForm";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { url } from "inspector";
import { apiController } from "@/@api/baseUrl";
import { login, newLogin } from "@/@api";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const [userType, setUserType] = useState<"brand" | "creator">("creator");
  const { loginUser, user, setIsLoading, setIsAuthenticated, setUser } =
    useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null); // State to handle login errors
  const [linkedInError, setLinkedInError] = useState<string | null>(null); // State for LinkedIn sign-in errors
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const codess = searchParams.get("code");
  const getToken = async (code: any) => {
    // setIsLoading(true)
    const response = await apiController.get(
      `${process.env.NEXT_PUBLIC_API_URL}/linkedin/portal_generate_oauth_token?code=${code}`,
      {
        headers: {
          Origin: window.location.origin,
        },
      }
    );
    console.log("Origin", window.location.origin);
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
      // router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  };

  // const queryParams = new URLSearchParams(window.location.search);
  // const codess = queryParams.get('code');

  // Form initial values and validation
  const initialValues = { email: "", password: "" };
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Form initial values and validation
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
          // console.log("loginresponse", response);
          setLoader(false);
          if (response.data.subscription_status.requires_payment == true) {
            localStorage.setItem("id", response.data._id);
            localStorage.setItem("checkoutisbuyer", response?.data.isBuyer);
            // console.log("isbuyer from email", data);
            const userData = response?.data;
            // console.log("userData", userData);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(userData);
            // localStorage.setItem(
            //   "user",
            //   JSON.stringify(data?.session_response)
            // );
            setIsAuthenticated(true);
            router.push("/stripe");
          } else if (response?.data) {
            // Store subscription status in localStorage along with other user data
            const userData = {
              ...response.data,
              subscription_status: response.data.subscription_status,
            };
            loginUser(userData);
            localStorage.setItem("id", response?.data?._id);
            localStorage.setItem("checkoutisbuyer", response?.data?.isBuyer);
            // Check if user is a buyer and handle subscription
            if (response.data.isBuyer) {
              // console.log(
              //   "Subscription status:",
              //   response.data.subscription_status
              // );
              if (
                !response.data.subscription_status?.has_active_subscription &&
                response.data.subscription_status?.requires_payment
              ) {
                router.push("/stripe");
              } else {
                router.push("/homepagebuyer");
              }
            } else {
              // Handle creator login

              router.push("/homepage");
            }
            // toast.success("Login successful");
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
          console.log("data", data);
          if (data?.detail) {
            toast.warn(data?.detail);
          } else {
            localStorage.setItem("id", data?.data._id);
            localStorage.setItem("checkoutisbuyer", data?.data.isBuyer);
            // console.log("isbuyer from email", data);
            const userData = data?.data.session_response;
            // console.log("userData", userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            // localStorage.setItem(
            //   "user",
            //   JSON.stringify(data?.session_response)
            // );
            setIsAuthenticated(true);
            // loginUser(data);
            router.push("/stripe");
          }
          setLoader(false);
        }
      }
    } catch (error: any) {
      console.error(isLogin ? "Login error:" : "Signup error:", error);
      setLoader(false);

      if (error.response?.status === 401) {
        // setError("Incorrect email or password. Please try again.");
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
    // Always set isLogin to true when switching to creator
    if (userType === "brand") {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    codess && !user?.email && getToken(codess);
  }, [codess]);

  const signInWithLinkedIn = async (e: any) => {
    // setIsLoading(true)
    // e.preventDefault()
    // // const result = await getAccessToken()
    // // console.log(result,"token aagya")
    // setLoader(true)
    // const apiKey = '86kqbx17og1eeb';
    // const redirectUri = 'https://synncportal.vercel.app/login';

    // // Construct the URL for the request
    // // const url = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code` +
    // //     `&client_id=${apiKey}` +
    // //     `&scope=email%20openid%20profile` +
    // //     `&redirect_uri=${redirectUri}`;

    // const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86kqbx17og1eeb&redirect_uri=${redirectUri}&state=foobar&scope=email%20openid%20profile`
    // axios.get(url).then(response => {
    //     console.log('Response Data:', response.data);
    // }).catch(error => {
    //     console.error('Error:', error.response ? error.response.data : error.message);
    // });
    const redirectUri = `${window.location.origin}/login`;
    const clientId = "86kqbx17og1eeb";
    const state = "foobar";
    const scope = "email%20openid%20profile";
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}`;
    window.location.href = authorizationUrl;
  };

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
                      userType === "creator" ? "btn-tab-selected" : "btn-tab-Nselected"
                    }`}
                    onClick={() => toggleUserType()}
                  >
                    Creator
                  </button>
                  <button
                    className={` ${
                      userType === "brand" ? "btn-tab-selected" : "btn-tab-Nselected"
                    }`}
                    onClick={() => toggleUserType()}
                  >
                    Brand
                  </button>
                </div>
                <h1 className="headingtxt mt-5 mb-3">
                  {userType === "brand" ? "Brand" : "Creator"} Sign{" "}
                  {userType === "creator" || isLogin ? "In" : "Up"}
                </h1>
     {/*            <p className="sub-headingtxt">
                  Sign {userType === "creator" || isLogin ? "in to" : "up for"}{" "}
                  Synnc for {userType === "brand" ? "brands" : "creators"}
                </p> */}
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
                        errors[isLogin ? "email" : "email"] ? "is-invalid" : ""
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
                        <span className="input-group-text fs-14">https://</span>
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
                    <label htmlFor="password" className="form-label fs-14">
                      Password
                      {!isLogin}
                    </label>
                    <a href="#" className="Link-Txt fs-14 cursor mb-2">
                      Forgot password?  </a>
                      </div>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder={
                          isLogin ? "Enter your password" : "Create a password"
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

                  {/* <hr className="my-4 text-warning" /> */}

                  {/* <div className="text-center">
                                <div className="d-flex justify-content-center gap-3 small text-muted">
                                    <a href="#" className="text-decoration-none text-muted">Terms of service</a>
                                    <span>•</span>
                                    <a href="#" className="text-decoration-none text-muted">Privacy policy</a>
                                </div>
                            </div> */}
                </form>
              )}

              {userType === "creator" && (
                <>
                 <div className="sub-headingtxt text-center mb-4" role="alert">Showcase your LinkedIn influence and earn through brand collaborations.</div>
                  <button
                    type="button"
                    onClick={(e: any) => {
                      // setLoader(true);
                      signInWithLinkedIn(e);
                      // Here you would typically initiate LinkedIn OAuth flow
                      // For example:
                      // window.location.href = 'your-linkedin-oauth-url'
                    }}
                    className="SignIN-linkedINbtn mb-3 mt-3"
                    // disabled={loader}
                  >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin "><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    Continue with LinkedIn
                  </button>
                  <div className="fs-14 py-2 text-center">We use LinkedIn to verify your professional profile and gather campaign analytics.</div>
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
                <a href="/terms" className="Link-Txt fs-14 cursor">Terms</a> 
                &nbsp; and  &nbsp;
                <a href="/privacy" className="Link-Txt fs-14 cursor">Privacy Policy</a>.
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
