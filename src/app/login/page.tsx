"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Login = () => {
    // const { login: authLogin, isAuthenticated } = useAuth(); // Use login function from AuthContext
    // const cookies = useCookies();
    const navigate = '';
    // const [isLinkedIn, setIsLinkedIn] = useState<boolean>(false);
    const [loader, setLoader] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null); // State to handle login errors
    const [linkedInError, setLinkedInError] = useState<string | null>(null); // State for LinkedIn sign-in errors
    const router = useRouter()
    // Form initial values and validation
    const initialValues = { email: '', password: '' };

    const validate = (values: Record<string, string>) => {
        const errors: Record<string, string> = {};
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    // Using custom hook for form handling
    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues,
        validate,
    });

    // Check LinkedIn Sign-in Status

    // Handle login submission
    const handleLogin = async () => {
        setLoader(true);
        setLoginError(null); // Reset previous error

        try {
            const response = await login(values); // Perform login (assumed you get user data on success)
            setLoader(false);
            if (response?.data) {
                router.push('homepage')
                localStorage.setItem('user',JSON.stringify(response?.data))
            }
        } catch (error: any) { // Catch any error that might occur during login
            console.error("Login error:", error);
            setLoader(false);
            if (error.response?.status === 401) {
                setLoginError("Incorrect email or password. Please try again.");
            } else {
                setLoginError("Failed to login. Please try again later.");
            }
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row py-5'>
                <div className='col-12'>
                    {/* <Image src="/assets/images/logo.png" alt="logo" width={100} height={30} className="img-fluid" /> */}
                    <div className='row'>
                        <div className='col-sm-8 col-md-6 col-xl-4 mx-auto'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='mb-4 text-center'>Login to Synnc</h5>
                                    {loginError && <div className="alert alert-danger">{loginError}</div>} {/* Show login error */}
                                    <form onSubmit={(e) => handleSubmit(e, handleLogin)}>
                                        <div className="mb-3 text-start">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                placeholder="name@example.com"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3 text-start">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className={`form-control form-control-sm ${errors.password ? 'is-invalid' : ''}`}
                                                id="password"
                                                placeholder="password"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-sm w-100 mb-3" disabled={loader}>
                                            {loader ? "Logging in..." : "Login"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loader && (<div className="spinner-border text-primary d-flex mx-auto mb-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>)}
        </div>
    );
}

export default Login