"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { url } from 'inspector';

const Login = () => {
    // const { login: authLogin, isAuthenticated } = useAuth(); // Use login function from AuthContext
    // const cookies = useCookies();
    const navigate = '';
    // const [isLinkedIn, setIsLinkedIn] = useState<boolean>(false);
    const [loader, setLoader] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null); // State to handle login errors
    const [linkedInError, setLinkedInError] = useState<string | null>(null); // State for LinkedIn sign-in errors
    const params = useParams()
    const codes = params?.code
    const queryParams = new URLSearchParams(window.location.search);
    const codess = queryParams.get('code');

    const { loginUser } = useAuth()
    // Form initial values and validation
    const initialValues = { email: '', password: '' };
    const [code, setCode] = useState<any>("")
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

            const response: any = await login(values); // Perform login (assumed you get user data on success)
            setLoader(false);
            if (response?.data) {
                loginUser(response?.data)
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



    useEffect(()=>{
     
        setCode(codess)
        codess && getToken(codess)
    },[codess])


    const signInWithLinkedIn = async (e: any) => {
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

        const redirectUri = 'https://adapted-tour-bracelets-indie.trycloudflare.com/login';
        const clientId = '86kqbx17og1eeb';
        const state = 'foobar';
        const scope = 'email%20openid%20profile'; 
        const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
        window.location.href = authorizationUrl;
    }

    const getToken = async (code:any) =>{
        const response = await axios.get(`https://synncapi.onrender.com/linkedin/portal_generate_oauth_token?code=${code}`)
     
    if (response.status == 200) {
            console.log(response,"aagaya reponse")
        }
        else{
            console.log(response,"ni aata reponse")
        }
    }


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12'>
                    {/* <Image src="/assets/images/logo.png" alt="logo" width={100} height={30} className="img-fluid" /> */}
                    <div className='row align-items-center vh-100'>
                        <div className='col-sm-8 col-md-6 col-xl-4 mx-auto'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='mb-4 text-center '>Login to Synnc</h5>
                                    {loginError && <div className="alert alert-danger">{loginError}</div>} {/* Show login error */}
                                    <form onSubmit={(e) => handleSubmit(e, handleLogin)}>
                                        <div className="mb-3 text-start">
                                            <label htmlFor="email" className="form-label ">Email address</label>
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
                                            <label htmlFor="password" className="form-label ">Password</label>
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
                                        <button type="submit" className="btn btn-info w-100 mb-3" disabled={loader}>
                                            {loader ? "Logging in..." : "Login"}
                                        </button>

                                    </form>
                                    <button className='btn btn-info w-100 d-flex align-items-center justify-content-center' onClick={signInWithLinkedIn}>
                                        <Icon icon="mdi:linkedin" width={18} height={18} className='me-2' />
                                        Continue with LinkedIn
                                    </button>
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