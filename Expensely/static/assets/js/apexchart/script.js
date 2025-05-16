// Bar Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_barChart') ?? '';

    if(Chart == ""){
        return false;
    } else{
        var options = {
            chart: {
                foreColor: '#ccc',
                type: 'bar',
                toolbar: {
                    show: false,
                },
                fontFamily: 'Poppins, sans-serif'
            },
            series: [{
                name: 'Income',
                data: [80, 85, 105, 100, 92, 80, 120, 102, 98, 45, 92, 82],
            }],
            colors: ['rgba(0, 170, 93, 0.7)'],
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'right',
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return y.toFixed(0) + "K";
                    }
                }
            },
            xaxis: {
                categories: ["Jan", "Feb", "Marc", "April", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 3,
                    barHeight: "70%",
                },
            },
        }

        var chart = new ApexCharts(Chart, options);

        chart.render();
    }
})();


(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_lineChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
            }],
            chart: {
                foreColor: '#ccc',
                type: 'line',
                toolbar: {
                    show: false,
                },
                fontFamily: 'Poppins, sans-serif'
            },
            colors: ['#FFC107'],
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 5,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            grid: {
                show: true,
                borderColor: 'rgba(56, 56, 56, 0.06)',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return y.toFixed(0) + "K";
                    }
                }
            },
            xaxis: {
                categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            }
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();


// Area Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_areaChart') ?? '' ;
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [{
                    name: 'South',
                    data: [30, 80, 82, 56, 58, 130, 80, 90, 64, 27, 94, 100],
                },
                {
                    name: 'North',
                    data: [100, 20, 45, 15, 60, 5, 85, 95, 5, 34, 80, 105],
                }
            ],
            chart: {
                foreColor: '#ccc',
                type: 'area',
                stacked: true,
                toolbar: {
                    show: false,
                }
            },
            colors: ['rgba(0, 170, 93, 0.2)', 'rgba(239, 78, 78, 0.4)'],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 1,
                    opacityTo: 1,
                }
            },
            legend: {
                show: false
            },
            grid: {
                show: true,
                borderColor: 'rgba(56, 56, 56, 0.06)',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return y.toFixed(0) + "K";
                    }
                }
            },
            xaxis: {
                type: 'Month',
                categories: ["Jan", "Feb", "Marc", "April", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();

// Scatter Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_scatterChart') ?? '' ;
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [{
                name: "SAMPLE A",
                data: [
                    [16.4, 5.4],
                    [21.7, 2],
                    [25.4, 3],
                    [19, 2],
                    [10.9, 1],
                    [13.6, 3.2],
                    [10.9, 7.4],
                    [10.9, 0],
                    [10.9, 8.2],
                    [16.4, 0],
                    [16.4, 1.8],
                    [13.6, 0.3],
                    [13.6, 0]
                ]
            }, {
                name: "SAMPLE B",
                data: [
                    [36.4, 13.4],
                    [1.7, 11],
                    [5.4, 8],
                    [9, 17],
                    [1.9, 4],
                    [3.6, 12.2],
                    [1.9, 14.4],
                    [1.9, 9],
                    [1.9, 13.2],
                    [1.4, 7],
                    [6.4, 8.8],
                    [3.6, 4.3],
                    [1.6, 10],
                    [9.9, 2]
                ]
            }, {
                name: "SAMPLE C",
                data: [
                    [21.7, 3],
                    [23.6, 3.5],
                    [24.6, 3],
                    [29.9, 3],
                    [21.7, 20],
                    [23, 2],
                    [10.9, 3],
                    [28, 4],
                    [27.1, 0.3],
                    [16.4, 4],
                    [13.6, 0],
                    [19, 5],
                    [22.4, 3],
                    [24.5, 3]
                ]
            }, {
                name: "SAMPLE D",
                data: [
                    [1.9, 15.2],
                    [6.4, 16.5],
                    [0.9, 10],
                    [4.5, 17.1],
                    [10.9, 10],
                    [0.1, 14.7],
                    [9, 10],
                    [12.7, 11.8],
                    [2.1, 10],
                    [2.5, 10],
                    [27.1, 10],
                    [2.9, 11.5],
                    [7.1, 10.8],
                    [2.1, 12]
                ]
            }],
            chart: {
                foreColor: '#ccc',
                type: 'scatter',
                toolbar: {
                    show: false
                }
            },
            colors: ['#00AA5D', '#EF4E4E', '#383838', '#FFC107'],
            grid: {
                show: true,
                borderColor: 'rgba(56, 56, 56, 0.06)',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
            xaxis: {
                tickAmount: 10,
                labels: {
                    formatter: function (val) {
                        return parseFloat(val).toFixed(1)
                    }
                }
            },
            yaxis: {
                tickAmount: 7
            },
            legend: {
                show: false
            }
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();


(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_s_donutChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [35, 25, 15],
            chart: {
                foreColor: '#ccc',
                type: 'donut',
            },
            colors: ['#EF4E4E', '#00AA5D', '#383838'],
            labels: ["Refund", "Margin", "Sale"],
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'left',
            },
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();


(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_polarChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [22, 50, 28],
            chart: {
                foreColor: '#ccc',
                type: 'polarArea',
            },
            colors: ['#FFC107', '#383838', '#00AA5D'],
            stroke: {
                width: 0,
            },
            fill: {
                opacity: 1
            },
            legend: {
                show: false,
            }
        };
    
        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();

// RadialBar Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_radialBarChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [44, 55, 67, 83],
            chart: {
                foreColor: '#ccc',
                type: 'radialBar',
                fontFamily: 'Poppins, sans-serif',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            formatter: function (w) {
                                return 249
                            }
                        }
                    }
                }
            },
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            colors: ['#00AA5D', '#383838', '#FFC107', '#EF4E4E']
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();

// Donut Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_donutChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [25, 35, 25, 15],
            chart: {
                foreColor: '#ccc',
                type: 'donut',
            },
            colors: ['#FFC107', '#EF4E4E', '#00AA5D', '#383838'],
            labels: ["Refund", "Margin", "Sale"],
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'left',
            },
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();

// dashboard chart

// dashboard market cap bar chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_investment_bar_chart') ?? '';

    if(Chart == ""){
        return false;
    } else{
        var options = {
            chart: {
                foreColor: '#ccc',
                type: 'bar',
                toolbar: {
                    show: false,
                },
                fontFamily: 'Poppins, sans-serif'
            },
            series: [{
                name: 'Income',
                data: [30, 50, 75, 40, 90, 80, 40, 52, 80, 45, 92, 30],
            }],
            colors: ['rgba(0, 170, 93, 0.7)'],
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'right',
            },
            dataLabels: {
                enabled: false,
            },
            yaxis: {
                labels: {
                    formatter: function (y) {
                        return y.toFixed(0) + "K";
                    }
                }
            },
            xaxis: {
                categories: ["Jan", "Feb", "Marc", "April", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 3,
                    barHeight: "70%",
                },
            },
            style: {
                fontSize: '12px',
                fontFamily: undefined,
                colors: '#dfdfef'
              },
        }

        var chart = new ApexCharts(Chart, options);

        chart.render();
    }
})();

// Donut Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_dashboard_donutChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [25, 35, 25, 15],
            chart: {
                foreColor: 'rgba(56, 56, 56, 0.06)',
                type: 'donut',
            },
            colors: ['#FFC107', '#EF4E4E', '#00AA5D', '#383838'],
            labels: ["Refund", "Margin", "Sale"],
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'left',
            },
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();

// RadialBar Chart
(() => {
    'use strict'
    const Chart = document.querySelector('#d2c_dashboard_radialBarChart') ?? '';
    if(Chart == ""){
        return false;
    } else{
        var options = {
            series: [44, 55, 67, 83],
            chart: {
                foreColor: '#ccc',
                type: 'radialBar',
                fontFamily: 'Poppins, sans-serif',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            formatter: function (w) {
                                return 249
                            }
                        }
                    }
                }
            },
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            colors: ['#00AA5D', '#383838', '#FFC107', '#EF4E4E']
        };

        var chart = new ApexCharts(Chart, options);
        chart.render();
    }
})();