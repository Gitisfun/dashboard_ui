const lines = {
    series: [],
    chartOptions: {
        chart: {
            height: 350,
            type: "area",
            toolbar: {
                show: false
            },
            foreColor: "grey",
        },
        legend: {
            show: false,
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
        type: "text",
        categories: [],
        labels: {
            style: {
                fontSize: "9px",
                fontWeight: 400,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: ["grey"],
                    fontSize: "12px",
                    fontWeight: 400,
                },
                formatter: function (value) { return "€ " + value }
            },
        },

        fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
              inverseColors: true,
              opacityFrom: 0.9,
              opacityTo: 0.9,
              stops: [0, 0, 100],
              colorStops: []
            }
        }
    },
};

export default lines;
