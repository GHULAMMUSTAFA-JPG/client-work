"use client"
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import { login } from '@/@api';

const AuthPage = () => {
    const [userType, setUserType] = useState<'brand' | 'creator'>('creator');
    const [isLogin, setIsLogin] = useState(true);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [linkedInError, setLinkedInError] = useState<string | null>(null);
    const router = useRouter();
    const { loginUser } = useAuth();

    // Form initial values and validation
    const signupInitialValues = {
        firstName: '',
        lastName: '',
        companyName: '',
        companyEmail: '',
        companyWebsite: '',
        password: ''
    };

    const loginInitialValues = {
        email: '',
        password: ''
    };

    const validateSignup = (values: Record<string, string>) => {
        const errors: Record<string, string> = {};

        if (!values.firstName) errors.firstName = 'First name is required';
        if (!values.lastName) errors.lastName = 'Last name is required';

        if (!values.companyName) errors.companyName = 'Company name is required';

        if (!values.companyEmail) {
            errors.companyEmail = 'Company email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.companyEmail)) {
            errors.companyEmail = 'Email address is invalid';
        }

        if (!values.companyWebsite) {
            errors.companyWebsite = 'Company website is required';
        } else if (!/^https?:\/\/.*/.test(values.companyWebsite)) {
            errors.companyWebsite = 'Website must start with http:// or https://';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        return errors;
    };

    const validateLogin = (values: Record<string, string>) => {
        const errors: Record<string, string> = {};

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }

        if (!values.password) errors.password = 'Password is required';

        return errors;
    };

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues: isLogin ? loginInitialValues : signupInitialValues,
        validate: isLogin ? validateLogin : validateSignup,
    });

    const handleAuth = async () => {
        setLoader(true);
        setError(null);

        try {
            if (isLogin) {
                const response: any = await login(values);
                setLoader(false);
                if (response?.data) {
                    loginUser(response?.data);
                    router.push('/dashboard');
                }
            } else {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...values, userType }),
                });

                const data = await response.json();
                setLoader(false);
                if (data) {
                    loginUser(data);
                    router.push('/dashboard');
                }
            }
        } catch (error: any) {
            console.error(isLogin ? "Login error:" : "Signup error:", error);
            setLoader(false);
            
            if (error.response?.status === 401) {
                setError("Incorrect email or password. Please try again.");
            } else {
                setError(error.response?.data?.message || `Failed to ${isLogin ? 'login' : 'create account'}. Please try again later.`);
            }
        }
    };

    const toggleAuthMode = () => {
        if (userType === 'creator') {
            setUserType('brand');
            setIsLogin(false);
        } else {
            setIsLogin(!isLogin);
        }
        setError(null);
        setLinkedInError(null);
    };

    const toggleUserType = () => {
        setUserType(userType === 'brand' ? 'creator' : 'brand');
        setError(null);
        setLinkedInError(null);
        // Always set isLogin to true when switching to creator
        if (userType === 'brand') {
            setIsLogin(true);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center login-container py-5">
            <div className="position-absolute top-0 start-0 p-3">
                <Image
                    src="/assets/images/synnc-logo.svg"
                    alt="Synnc"
                    width={120}
                    height={40}
                    className="img-fluid"
                />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="text-center mb-4">
                            <div className="btn-group mb-4">
                                <button
                                    className={`btn ${userType === 'creator' ? 'btn-dark' : 'btn-outline-dark'}`}
                                    onClick={() => toggleUserType()}
                                >
                                    Creator
                                </button>
                                <button
                                    className={`btn ${userType === 'brand' ? 'btn-dark' : 'btn-outline-dark'}`}
                                    onClick={() => toggleUserType()}
                                >
                                    Brand
                                </button>
                            </div>
                            <h1 className="h3 fw-medium mb-2">
                                {userType === 'brand' ? 'Brand' : 'Creator'} Sign {userType === 'creator' || isLogin ? 'In' : 'Up'}
                            </h1>
                            <p className="text-muted fs-16">
                                Sign {userType === 'creator' || isLogin ? 'in to' : 'up for'} Synnc for {userType === 'brand' ? 'brands' : 'creators'}
                            </p>
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

                        <form onSubmit={(e) => handleSubmit(e, handleAuth)}>
                            {(!isLogin && userType === 'brand') && (
                                <>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="firstName" className="form-label fs-14">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter your first name"
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                                value={values.firstName || ''}
                                                onChange={handleChange}
                                            />
                                            {errors.firstName && (
                                                <div className="invalid-feedback">{errors.firstName}</div>
                                            )}
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="lastName" className="form-label fs-14">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter your last name"
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                                value={values.lastName || ''}
                                                onChange={handleChange}
                                            />
                                            {errors.lastName && (
                                                <div className="invalid-feedback">{errors.lastName}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="companyName" className="form-label fs-14">Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Enter your company name"
                                            className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                                            value={values.companyName || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.companyName && (
                                            <div className="invalid-feedback">{errors.companyName}</div>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="mb-3">
                                <label htmlFor={isLogin ? "email" : "companyEmail"} className="form-label fs-14">
                                    {isLogin ? "Email" : (userType === 'brand' ? "Company Email" : "Email")}
                                    {(!isLogin && userType === 'brand') && <span className="text-muted">(must match site domain)</span>}
                                </label>
                                <input
                                    type="email"
                                    name={isLogin ? "email" : "companyEmail"}
                                    placeholder={isLogin ? "Enter your email" : (userType === 'brand' ? "Enter your company email" : "Enter your email")}
                                    className={`form-control ${errors[isLogin ? "email" : "companyEmail"] ? 'is-invalid' : ''}`}
                                    value={values[isLogin ? "email" : "companyEmail"] || ''}
                                    onChange={handleChange}
                                />
                                {errors[isLogin ? "email" : "companyEmail"] && (
                                    <div className="invalid-feedback">{errors[isLogin ? "email" : "companyEmail"]}</div>
                                )}
                            </div>

                            {(!isLogin && userType === 'brand') && (
                                <div className="mb-3">
                                    <label htmlFor="companyWebsite" className="form-label fs-14">
                                        Company Website <span className="text-muted">(must match email domain)</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text fs-14">https://</span>
                                        <input
                                            type="text"
                                            name="companyWebsite"
                                            placeholder="Enter your company website"
                                            className={`form-control ${errors.companyWebsite ? 'is-invalid' : ''}`}
                                            value={values.companyWebsite || ''}
                                            onChange={handleChange}
                                        />
                                        {errors.companyWebsite && (
                                            <div className="invalid-feedback">{errors.companyWebsite}</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label fs-14">
                                    Password
                                    {!isLogin && <span className="text-muted">(min 8 letters, numbers, and symbols required)</span>}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    value={values.password || ''}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark btn-lg w-100 mb-3 d-flex align-items-center justify-content-center"
                                disabled={loader}
                            >
                                {loader ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Create an Account")}
                                <Icon icon="material-symbols:arrow-forward" className="ms-2" width={20} height={20} />
                            </button>

                            {userType === 'creator' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setLoader(true);
                                        setLinkedInError(null);
                                        // Here you would typically initiate LinkedIn OAuth flow
                                        // For example:
                                        // window.location.href = 'your-linkedin-oauth-url'
                                    }}
                                    className="btn btn-outline-info btn-lg w-100 mb-4 d-flex align-items-center justify-content-center"
                                    disabled={loader}
                                >
                                    <Icon icon="mdi:linkedin" width={20} height={20} className="me-2 text-info" />
                                    Continue with LinkedIn
                                </button>
                            )}

                            <div className="text-center mb-4 d-flex justify-content-center align-items-center gap-3">
                                <span className="text-muted small fs-14">
                                    {userType === 'creator' && isLogin ? "Need an account as a brand? " : (isLogin ? "Don't have an account? " : "Have an account? ")}
                                </span>
                                <button
                                    onClick={toggleAuthMode}
                                    className="btn btn-link text-dark p-0 small text-decoration-none fs-16 fw-medium"
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </button>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;