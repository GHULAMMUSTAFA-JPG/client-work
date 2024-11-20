"use client";

import { fetch_dashboard_data } from "@/@api";
import Topcard from "@/components/topcard";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
function Homepage() {

    const [users, setUsers] = useState<any[]>([]);
    // const router = useRouter()
    useEffect(() => {

        fetchData()

    }, [])


    const fetchData = async () => {
        const response = await fetch_dashboard_data()
        console.log(response.data)
        setUsers(response.data?.users)
    }
    return (
        <>
            <div className="container-fluid">
                <Topcard />
            </div>
        </>
    );
}

export default withAuth(Homepage)