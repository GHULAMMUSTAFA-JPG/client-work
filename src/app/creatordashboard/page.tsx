"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import Homepage from '@/app/homepage/page';


function CreatorDashboard() {

    return (
        <>
            <Homepage />
        </>
    );
}

export default CreatorDashboard