import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Icon } from "@iconify/react";
// Register the necessary components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VerticalBarChart = () => {
    const data: any = {
        labels: ["Nov 13", "Nov 14", "Nov 15", "Nov 16"], // Your 4 labels
        datasets: [
            {
                label: "Impressions",
                data: [5, 10, 15, 18],
                backgroundColor: "#15ab63", // Solid color for bars
                borderRadius: 20, // Rounded corners on both sides
                borderWidth: 0, // Remove borders of bars
                barThickness: 16, // Bar thickness
            },
        ],
    };

    const options: any = {
        responsive: true,
        indexAxis: "x", // Make the chart vertical (default)
        plugins: {
            legend: {
                display: false, // Hide legend for a clean look
            },
        },
        scales: {
            x: {
                position: "bottom", // Position x-axis at the bottom
                ticks: {
                    font: {
                        weight: "bold", // Make x-axis labels bold
                    },
                },
                grid: {
                    display: false, // Hide x-axis grid (vertical grid line)
                },
                borderWidth: 0, // Remove the border on the x-axis
            },
            y: {
                position: "left", // Position y-axis labels on the left
                ticks: {
                    crossAlign: "center", // Center-align labels and bars
                    padding: 10, // Add space between bars and labels
                    autoSkip: false, // Ensure all labels are shown
                    font: {
                        weight: "bold", // Make y-axis labels bold
                    },
                },
                grid: {
                    display: false, // Hide y-axis grid (horizontal grid line)
                },
                beginAtZero: true, // Start the scale from zero
                borderWidth: 0, // Remove the border line of the y-axis
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
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 w-50">Profile Metrics</h5>
                                    <select className="form-select charts-select" aria-label="Default select example">
                                        <option selected>Select</option>
                                        <option value="1">Last 7 Days</option>
                                        <option value="2">Last 14 Days</option>
                                        <option value="3">1 Month</option>
                                    </select>
                                </div>
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

export default VerticalBarChart;
