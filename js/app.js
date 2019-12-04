drawChart();

async function drawChart() {
    const data = await getData();
    let ctx = document.getElementById('data-chart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xYear,
            datasets: [
                {
                    label: 'Global temprature in °C',
                    data: data.globalData,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Northern Hemispheric temprature in °C',
                    data: data.northernData,
                    backgroundColor: "#2196f38c",
                    borderColor: "#2196f38c",
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Southern Hemispheric temprature in °C',
                    data: data.southernData,
                    backgroundColor: "#2196f38c",
                    borderColor: "#cc65fe",
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '°C';
                        }
                    }
                }]
            }
        }
    });
}

async function getData() {
    const xYear = [];
    const globalData = [];
    const northernData = [];
    const southernData = [];

    const glbResponse = await fetch('data/ZonAnn.Ts+dSST.csv');
    const glbData = await glbResponse.text();
    const glbRows = glbData.split('\n').slice(1);

    const nhResponse = await fetch('data/NH.Ts+dSST.csv');
    const nhData = await nhResponse.text();
    const nhRows = nhData.split('\n').slice(2);

    const shResponse = await fetch('data/SH.Ts+dSST.csv');
    const shData = await shResponse.text();
    const shRows = shData.split('\n').slice(2);

    glbRows.forEach(row => {
        const elem = row.split(',');
        const year = elem[0];
        const temp = elem[1];

        xYear.push(year);
        globalData.push(parseFloat(temp) + 14);
    });

    nhRows.forEach(row => {
        const elem = row.split(',');
        const year = elem[0];
        const temp = elem[1];

        northernData.push(parseFloat(temp) + 14);
    });

    shRows.forEach(row => {
        const elem = row.split(',');
        const year = elem[0];
        const temp = elem[1];

        southernData.push(parseFloat(temp) + 14);
    });
    return { xYear, globalData, northernData, southernData }
}