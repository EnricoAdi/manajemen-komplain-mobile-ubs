const DoughnutChart = (props) => {
    let {title, caption, labels, data, id} = props;
    //labels dan data adalah array 
    const setupChart = ()=>{ 
        let backgroundColor = ['#4e73df', '#1cc88a', '#36b9cc', '#a629cc', '#baa1a4', '#a229a7'];
        for (let i = 0; i < data.length - 6 ; i++) {
            backgroundColor.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
          }
        const chartX = document.getElementById(id);

        var donutChartDivisi = new Chart(chartX, {
            type: 'doughnut',
            data: {
              labels: labels,
              datasets: [{
                data: data,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
              }],
            },
  
            options: {
              maintainAspectRatio: false,
              tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
              },
              legend: {
                display: true
              },
              cutoutPercentage: 80,
            },
          });
      
       
      Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
      Chart.defaults.global.defaultFontColor = '#858796'; 
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