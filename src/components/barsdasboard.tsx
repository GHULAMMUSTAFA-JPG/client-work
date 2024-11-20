import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BarsDashboard = () => {
    const data = {
        labels: ["Nov 13", "Nov 14", "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19"],
        datasets: [
            {
                label: "Impressions",
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: "#4A90E2",
                backgroundColor: "rgba(74, 144, 226, 0.2)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Clicks",
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
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
            },
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
                                    <div className='bar-chart'>
                                        <Line data={data} options={options} />
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

export default BarsDashboard;