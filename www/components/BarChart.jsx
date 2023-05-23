const BarChart = (props) => {
    let {title, caption, labels, data,id, maks, keteranganData} = props;
    //labels dan data adalah array 
    const setupChart = ()=>{ 
        let backgroundColor = ['#4e73df', '#1cc88a', '#36b9cc', '#a629cc', '#baa1a4', '#a229a7'];
        
        const chartX = document.getElementById(id);

        var myBarChartKomplainMasuk = new Chart(chartX, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: keteranganData,
                backgroundColor: color.PRIMARY,
                hoverBackgroundColor: "#2e59d9",
                borderColor: "#4e73df",
                data: data,
              }],
            },
            options: {
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 10,
                  right: 25,
                  top: 25,
                  bottom: 0
                }
              },
              scales: {
                xAxes: [{
                  time: {
                    unit: 'month'
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false
                  },
                  ticks: {
                    maxTicksLimit: 10 //ini untuk jumlah bar yang ditampilin
                  },
                  maxBarThickness: 25,
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: maks, //ini untuk jumlah maksimal bar
                    maxTicksLimit: 7,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                      return '' + number_format(value);
                    }
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                  }
                }],
              },
              legend: {
                display: false
              },
              tooltips: {
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
                callbacks: {
                  label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
                  }
                }
              },
            }
          }); 
    }

    useEffect(()=>{
        setupChart()
    },[])
    return(
        <div className="card shadow mb-4 mt-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
            </div>
            <div className="card-body">
                <div className="chart-bar">
                <canvas id={id}>

                </canvas>
                </div>
                <hr/>
            {caption}
            </div>
        </div>
    )

}