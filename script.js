
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// // Your web app's Firebase configuration
// const firebaseConfig = 
//     {   apiKey: "AIzaSyBIgjucBQT_UAWH4iD4JIBjCF79H9SeFrs",
//         authDomain: "water-monitoring-1856d.firebaseapp.com",
//         databaseURL: "https://water-monitoring-1856d-default-rtdb.asia-southeast1.firebasedatabase.app",
//         projectId: "water-monitoring-1856d",
//         storageBucket: "water-monitoring-1856d.appspot.com",
//         messagingSenderId: "1047258254470",
//         appId: "1:1047258254470:web:fcc420b6c7a3b74a885507"
//     };

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBUTb6lmztNxl_ZR2ryeu4Cx0uAu_HrpTE",
    authDomain: "tds-sensor-ce7f0.firebaseapp.com",
    databaseURL: "https://tds-sensor-ce7f0-default-rtdb.firebaseio.com",
    projectId: "tds-sensor-ce7f0",
    storageBucket: "tds-sensor-ce7f0.appspot.com",
    messagingSenderId: "845308357837",
    appId: "1:845308357837:web:6715bc4900adfaee010d84",
    measurementId: "G-PMZV98SVXT"
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
  plotOptions: {
    series: {
      maxPointWidth: 10 // Adjust this value to fit your design
    }
  },
  scrollbar: {
    enabled: true
  },
  series: [{
    name: 'Water Level',
    data: [],
    turboThreshold: 0 // Disable initial series threshold
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
  plotOptions: {
    series: {
      maxPointWidth: 10 // Adjust this value to fit your design
    }
  },
  scrollbar: {
    enabled: true
  },
  series: [{
    name: 'Hardness',
    data: [],
    turboThreshold: 0 // Disable initial series threshold
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
    //document.getElementById('level').innerText = level;

    //Update Water Level Chart
    const levelChart = Highcharts.charts[0];
    levelChart.series[0].addPoint([Date.now(), parseFloat(level)], true, levelChart.series[0].data.length >= 20 );

    // Update Hardness Chart
    const hardnessChart = Highcharts.charts[1];
    hardnessChart.series[0].addPoint([Date.now(), parseFloat(hardness)], true, hardnessChart.series[0].data.length >= 20);
  });
}
  
// Initial data update
document.addEventListener("DOMContentLoaded", function() {
  // Get the checkbox element
  var checkbox = document.querySelector('.toggle');

  // Add event listener for the 'change' event
  checkbox.addEventListener('change', function() {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If checked, call the updateData function
      updateData();
      setInterval(updateData, 2000);
    }
    else {
      // If unchecked, clear the interval
      clearInterval(intervalId);
    }
  });
});

// Periodically update data

  
