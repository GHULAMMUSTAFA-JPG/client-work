
"use client"
import { login } from '@/@api';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Icon } from "@iconify/react/dist/iconify.js";
import Topcard from '@/components/topcard';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartsDashboard = () => {
    const data = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                data: [100, 0],
                backgroundColor: ["#49a9de", "#E0E0E0"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "90%",
        plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
        },
    };

    return (
        <>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body p-4'>
                            <div className='row align-items-center'>
                                <div className='col-md'>
                                    <h5>Campaign Success Score</h5>
                                    <p className='text-muted'>This is a simple score based on the success of your campaigns.</p>
                                    <button className='btn btn-outline-primary'>View insights</button>
                                </div>
                                <div className='col-md-auto'>
                                    <div className='doughnut-chart'>
                                        <Doughnut data={data} options={options} />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            100%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChartsDashboard;