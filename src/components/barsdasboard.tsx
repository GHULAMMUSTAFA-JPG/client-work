import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BarsDashboard = () => {
    const data:any = {
        labels: ["Nov 13", "Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19"],
        datasets: [
            {
                label: "Accepted",
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: "#15ab63",
                backgroundColor: "transparent",
                tension: 0.4,
                fill: true,
                borderWidth: 4, // Thicker line
                borderCapStyle: "round", // Rounded ends
                pointRadius: 0, // No points
                pointHoverRadius: 0, // No hover points
            },
            {
                label: "My Company",
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: "#49a9de",
                backgroundColor: "transparent",
                tension: 0.4,
                fill: true,
                borderWidth: 4, // Thicker line
                borderCapStyle: "round", // Rounded ends
                pointRadius: 0, // No points
                pointHoverRadius: 0, // No hover points
            },
        ],
    };

    const options:any= {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "bottom",
            },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                grid: { drawBorder: false },
                ticks: {
                    maxTicksLimit: 6,
                },
            },
        },
    };

    return (
        <>
            <div className='card'>
                <div className='card-body p-4'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='bar-chart'>
                                <h5>Campaign Insights</h5>
                                <Line data={data} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BarsDashboard;