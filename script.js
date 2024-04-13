
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

  
function writeToSheet() {
    // Replace 'YOUR_FIREBASE_URL' with your Firebase database URL
    var firebaseUrl = 'https://water-monitoring-1856d-default-rtdb.asia-southeast1.firebasedatabase.app';
    
    // Replace 'YOUR_SHEET_ID' with your Google Sheet ID
    var sheetId = 'https://docs.google.com/spreadsheets/d/15BihzVfACBSfCYOj2qW1XxWeK8PQt9hYUP4GyLrI_L0/edit?usp=sharing';
    
    // Get the Firebase data
    var response = UrlFetchApp.fetch(firebaseUrl);
    var data = JSON.parse(response.getContentText());
    
    // Open the Google Sheet
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Append the data to the sheet
    sheet.appendRow([data.temperature, data.hardness, data.level, new Date()]);
  }
}

// Initial data update
updateData();

// Periodically update data
setInterval(updateData, 2000);

  
  // Optional: Create a time-driven trigger to run the script periodically
  function createTrigger() {
    ScriptApp.newTrigger('writeToSheet')
      .timeBased()
      .everySeconds(5) // Adjust the interval as needed
      .create();
  }

  createTrigger();
  
