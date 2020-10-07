function dynamicFunction(){
    const year = document.getElementById("season").value;
    //console.log("app.js",year);
    if( (year < 2008) || (year > 2019) ){
        alert("Please, Enter the year in between 2008 and 2019.");
    }else{
      fetch(`/season/${year}`)
      .then((resp) => resp.json())
      .then((resp) => { visualizeData(resp);
        function visualizeData(data) {
          //console.log(data);
          let seriesData = [];
          for (let key in data){
            seriesData.push([key, data[key]]);
          }
          //console.log(seriesData);
          Highcharts.chart("number-of-matches-played-in-each-stadium", {
            chart: {
              type: "column"
            },
            title: {
              text: `Number of Matches played in Each stadium in year ${year}`
            },
            subtitle: {
              text:
                'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
            },
            xAxis: {
              type: "category"
            },
            yAxis: {
              min: 0,
              title: {
                text: "Matches"
              }
            },
            series: [
              {
                name : "Stadium",
                data: seriesData
              }
            ]
          });
        }
      });
    }
}