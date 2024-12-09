"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import { toast } from 'react-toastify';
const Authentication = () => {
    const searchParams = useSearchParams()
    let didRequest = true;
    const search = searchParams.get('code')
    const [isAuthenticated, setIsAuthenticated] = useState<number>(0)
    const updateAuthCode = async () => {
        return new Promise(async (res: any, rej: any) => {
            if (isAuthenticated == 0) {
                try {
                    const response = await axios.get(`https://synncapi.onrender.com/linkedin/generate_oauth_token?code=${search}`)
                    toast.success('Authentication successfull')
                    setIsAuthenticated(1)
                    console.log(response, "response")
                    window.close()
                    return res
                } catch (error) {
                    toast.warn('Authentication failed.')
                    setIsAuthenticated(2)
                    console.log(error, "error")
                    return rej
                }
            }
            else {
                return rej
            }
        })


    }

    useEffect(() => {
        const name = async () => {
            console.log(search, "search")
            if (search && search !== "" && isAuthenticated == 0) {
                didRequest = false
                const response: any = await updateAuthCode()
                console.log(response, "resonse")
                setIsAuthenticated(response)
            }
        }
        didRequest && name()
    }, [])
    return (
        <div className='container-fluid'>
            {isAuthenticated == 0 ? "Authentication in progress" : isAuthenticated == 1 ? "Authentication is successfull" : "Authentication failed"}
        </div>
    );
}

export default Authentication;