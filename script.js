    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
    import { getDatabase ,onValue, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = 
    {   apiKey: "AIzaSyBIgjucBQT_UAWH4iD4JIBjCF79H9SeFrs",
        authDomain: "water-monitoring-1856d.firebaseapp.com",
        databaseURL: "https://water-monitoring-1856d-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "water-monitoring-1856d",
        storageBucket: "water-monitoring-1856d.appspot.com",
        messagingSenderId: "1047258254470",
        appId: "1:1047258254470:web:fcc420b6c7a3b74a885507"
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log("Firebase Initialized!");

    const db = getDatabase(app);
    console.log(db);

    const sensorRef = ref(db, 'Sensor');

    function updateData(){
        

        onValue(sensorRef, (snapshot) => {
                const data = snapshot.val();

                const temperature = data.temperature;
                const Hardness = data.hardness;
                const level = data.level;

                document.getElementById('temperature').innerText = temperature;
                document.getElementById('hardness').innerText = Hardness;
                document.getElementById('level').innerText = level;

                
            });
        
        

}

updateData();



setInterval(updateData, 1500);