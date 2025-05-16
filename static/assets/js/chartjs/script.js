(() => {
    'use strict'
    const chart = document.querySelector('#barChart') ?? '';

    if(chart == ""){
        return false;
    } else{
        new Chart(chart, {
        type: 'bar',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                datasets: [{
                    label: 'chart',
                    data: [20,40,60,80,100,11,36,47,83,45,92,62,53,78,60],
                    backgroundColor: [
                        'rgba(0, 170, 93, 0.7)',
                    ],
                    borderColor: [
                        'rgba(0, 170, 93, 0.7)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
})();

(() => {
    'use strict'
    const chart = document.querySelector('#lineChart') ?? '';

    if(chart == ""){
        return false;
    } else{
        new Chart(chart, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                datasets: [{
                    label: 'Line',
                    data: [20,40,60,80,62,11,36,47,83,45,92,62,53,78,60],
                    fill: false,
                    borderColor: '#FFC107',
                    tension: 0.1,
                    borderWidth: 2,
                }]
            },
            options: {
                animations: {
                    tension: {
                    duration: 1000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
})();


(() => {
    'use strict'
    const chart = document.querySelector('#areaChart') ?? '';

    if(chart == ""){
        return false;
    } else{
        new Chart(chart, {
            type: 'line',
            data: {
                labels: [1,2,3,4,5,6,7,8],
                datasets: [{
                    label: 'Series 1',
                    data: [100, 20, 45, 15, 60, 58, 85, 95],
                    fill: true,
                    borderColor: 'rgba(0, 170, 93)',
                    backgroundColor: 'rgba(0, 170, 93, 0.2)',
                    borderWidth: 1
                },
                {
                    label: 'Series 2',
                    data: [30, 80, 82, 56, 58, 5, 80, 100],
                    fill: true,
                    borderColor: 'rgba(239, 78, 78)',
                    backgroundColor: 'rgba(239, 78, 78, 0.4)',
                    borderWidth: 1
                }]
            },
            options: {
                animations: {
                    tension: {
                    duration: 3000,
                    easing: 'linear',
                    from: 0,
                    to: 1,
                    loop: true
                    }
                },
                plugins: {
                    filler: {
                        propagate: true
                    }
                }
            }
        });
    }
})();


(() => {
    'use strict'
    const chart = document.querySelector('#bubbleChart') ?? '';

    if(chart == ""){
        return false;
    } else{
        new Chart(bubbleChart, {
            type: 'bubble',
            data: {datasets: [{
                label: 'Dataset',
                data: [
                    { x: 20, y: 30, r: 15 },
                    { x: 40, y: 10, r: 10 },
                    { x: 25, y: 50, r: 20 },
                    { x: 10, y: 15, r: 8 },
                    { x: 60, y: 80, r: 25 },
                    { x: 35, y: 70, r: 18 },
                    { x: 45, y: 30, r: 12 },
                    { x: 15, y: 40, r: 18 },
                    { x: 55, y: 20, r: 14 },
                    { x: 70, y: 60, r: 22 },
                    { x: 30, y: 25, r: 10 },
                    { x: 50, y: 45, r: 16 },
                    { x: 80, y: 30, r: 12 },
                    { x: 25, y: 10, r: 8 },
                    { x: 65, y: 45, r: 15 },
                    { x: 22, y: 18, r: 7 },
                    { x: 48, y: 62, r: 21 },
                    { x: 33, y: 27, r: 9 },
                    { x: 58, y: 53, r: 17 },
                    { x: 75, y: 40, r: 13 }
                ],
                backgroundColor: ['#00AA5D', '#EF4E4E', '#383838', '#FFC107']
            }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            },
        });
    }
})();  

(() => {
    'use strict'
    const chart = document.querySelector('#polarChart') ?? '';

    if(chart == ""){
        return false;
    } else{
        new Chart(doughnutChart, {
            type: 'doughnut',
            data: {
                labels: [
                    'Sales',
                    'New User'
                ],
                datasets: [{
                    label: 'Dughnut Dataset',
                    data: [300, 50],
                    backgroundColor: [
                        '#EF4E4E', 
                        '#00AA5D', 
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                animations: {
                    tension: {
                    duration: 3000,
                    easing: 'linear',
                    from: 0,
                    to: 1,
                    loop: true
                    }
                }
            }
        });
    }
})(); 

(() => {
    'use strict'
    const chart = document.querySelector('#doughnutChart') ?? '';

    if(chart == ""){
        return false;
    } else{
        new Chart(polarChart, {
            type: 'polarArea',
            data: {
                labels: [
                    'Series 1',
                    'Series 2',
                    'Series 3',
                ],
                datasets: [{
                    label: 'Polar Dataset',
                    data: [11, 16, 7],
                    backgroundColor: [
                        '#FFC107', 
                        '#383838', 
                        '#00AA5D'
                    ]
                }]
            },
            maintainAspectRatio: false,
            options: {
                animations: {
                    tension: {
                        duration: 3000,
                        easing: 'linear',
                        from: 0,
                        to: 1,
                        loop: true
                    }
                },
            }
        });
    }
})(); 