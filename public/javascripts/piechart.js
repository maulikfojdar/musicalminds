google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Centre',   40.21],
          ['Midlands', 35.16],
          ['North',  36.35],
          ['North Ireland', 43.05],
          ['Northern Ireland',    36.33],
          ['South',36.40]
        ]);

        var options = {
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
      }