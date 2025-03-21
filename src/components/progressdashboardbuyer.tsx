import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Icon } from "@iconify/react/dist/iconify.js";
// Register the necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProgressDashboardBuyer = () => {
    const data: any = {
        labels: ["20 Campaigns Created", "In progress Campaigns", "Completed Campaigns", "Interviewing Campaigns"], // Your 4 labels
        datasets: [
            {
                label: "Impressions",
                data: [5, 10, 15, 18],
                backgroundColor: "#49a9de", // Solid color for bars
                borderRadius: 20, // Rounded corners on both sides
                borderWidth: 0, // Remove borders of bars
                barThickness: 12, // Bar thickness
            },
        ],
    };

    const options: any = {
        responsive: true,
        indexAxis: "y", // Make the chart horizontal
        plugins: {
            legend: {
                display: false, // Hide legend for a clean look
            },
        },
        scales: {
            x: {
                display: false, // Remove x-axis labels
                grid: {
                    display: false, // Hide x-axis grid and vertical border
                },
            },
            y: {
                position: "right", // Position y-axis labels on the right
                ticks: {
                    // crossAlign: "center", // Center-align labels and bars
                    padding: 10, // Add space between bars and labels
                    autoSkip: false, // Ensure all labels are shown
                    font: {
                        weight: "bold", // Set the font weight to bold
                    },
                },
                grid: {
                    display: false, // Hide y-axis grid (no vertical grid line)
                },
                beginAtZero: true, // Start the scale from zero
            },
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
            },
        },
        elements: {
            bar: {
                borderRadius: 8, // Apply rounded corners to both sides of bars
                borderWidth: 0, // Remove border width from bars
                barPercentage: 0.9, // Adjust bar width relative to space available
                categoryPercentage: 1.0, // Ensure bars occupy full space of each category
            },
        },
    };

    return (
        <>
            <div className="card">
                <div className="card-body p-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="bar-chart">
                                <h5>Campaign Overview</h5>
                                <Bar data={data} options={options} />
                                <div className="card bg-primary-subtle">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <Icon icon="ph:lightbulb" width={32} height={32} className='text-primary' />
                                            <p className="mb-0 fw-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
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

export default ProgressDashboardBuyer;
