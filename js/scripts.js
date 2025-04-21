// Function to retrieve income and expenses for each month
function getMonthlyData() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const data = months.map(month => {
        const income = parseFloat(document.getElementById(`${month}-income`).value) || 0;
        const expenses = parseFloat(document.getElementById(`${month}-expenses`).value) || 0;
        return { month, income, expenses };
    });

    return data;
}

// Initialize the bar chart
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            datasets: [{
                label: 'Income',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Automatically update the chart when the "Charts" tab is shown
    document.querySelector('#charts-tab').addEventListener('shown.bs.tab', () => {
        const monthlyData = getMonthlyData();

        // Update the chart data
        barChart.data.datasets[0].data = monthlyData.map(data => data.income); // Update income
        barChart.data.datasets[1].data = monthlyData.map(data => data.expenses); // Update expenses

        // Refresh the chart
        barChart.update();
    });
});

// Function to download the canvas as an image
function downloadCanvasAsImage(canvasId, fileName) {
    const canvas = document.getElementById(canvasId);
    const image = canvas.toDataURL("image/png"); // Convert canvas to data URL (PNG format)

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = image;
    link.download = fileName; // Set the file name for the download
    link.click(); // Trigger the download
}

// input with id "username" on change
document.getElementById("username").addEventListener("input", function () {
    const username = this.value; // Get the value of the input field
    // regular expression to check if the username has at least 1 capital letter, 1 special character, 1 number, and is at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?~`~-])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?~`~-]{8,}$/;
    if (!regex.test(username)) { // If the username does not match the regex, set the username input boarder color to red
        this.style.borderColor = "red"; // Set the border color to red
        return; // Exit the function
    }
    // If the username matches the regex, set the username input boarder color to green
    this.style.borderColor = "green"; // Set the border color to green
    
});





// Add event listener to the "Download" button
document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("download-btn");
    downloadButton.addEventListener("click", function () {
        downloadCanvasAsImage("barChart", "chart.png"); // Download the bar chart as "chart.png"
    });
});