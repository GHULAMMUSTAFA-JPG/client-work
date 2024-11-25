"use client";

import { fetch_dashboard_data } from "@/@api";
import Topcard from "@/components/topcard";
import withAuth from "@/utils/withAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import ChartsDashboard from "@/components/chartsdashboard";
import BarsDashboard from "@/components/barsdasboard";
import ProgressDashboardBuyer from "@/components/progressdashboardbuyer";
import VerticalBarChart from "@/components/verticalbarchart";
import CardsDashboardBuyer from "@/components/cardsdashboardbuyer";
function homepagebuyer() {

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
                <div className="row graphs g-3">
                    <div className="col-md-6">
                        <BarsDashboard />
                    </div>
                    <div className="col-md-6">
                        <ProgressDashboardBuyer />
                    </div>
                </div>
                <div className="row my-3">
                    <CardsDashboardBuyer />
                </div>
            </div>
        </>
    );
}

export default homepagebuyer