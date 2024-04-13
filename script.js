
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = 
    {   apiKey: "AIzaSyBIgjucBQT_UAWH4iD4JIBjCF79H9SeFrs",
        authDomain: "water-monitoring-1856d.firebaseapp.com",
        databaseURL: "https://water-monitoring-1856d-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "water-monitoring-1856d",
        storageBucket: "water-monitoring-1856d.appspot.com",
        messagingSenderId: "1047258254470",
        appId: "1:1047258254470:web:fcc420b6c7a3b74a885507"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const sensorRef = ref(db, 'Sensor');

// Initialize Highcharts for Water Level
Highcharts.chart('chart-level', {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Water Level'
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: 'Percentage (%)'
    }
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Water Level',
    data: []
  }]
});

// Initialize Highcharts for Hardness
Highcharts.chart('chart-hardness', {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Hardness'
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: 'ppm'
    }
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Hardness',
    data: []
  }]
});

// Function to update data and charts
function updateData() {
  onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();

    const temperature = data.temperature;
    const hardness = data.hardness;
    const level = data.level;

    document.getElementById('temperature').innerText = temperature;
    document.getElementById('hardness').innerText = hardness;
    document.getElementById('level').innerText = level;

    //Update Water Level Chart
    const levelChart = Highcharts.charts[0];
    levelChart.series[0].addPoint([Date.now(), parseFloat(level)], true, levelChart.series[0].data.length >= 20);

    // Update Hardness Chart
    const hardnessChart = Highcharts.charts[1];
    hardnessChart.series[0].addPoint([Date.now(), parseFloat(hardness)], true, hardnessChart.series[0].data.length >= 20);
  });
}
  
// Initial data update
updateData();

// Periodically update data
setInterval(updateData, 2000);
  
