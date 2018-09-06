$(document).ready(function () {
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyCMmGu1NxQPsmNbK59i71ZJqDZLs2dFg68",
        authDomain: "train-schedule-dd327.firebaseapp.com",
        databaseURL: "https://train-schedule-dd327.firebaseio.com",
        projectId: "train-schedule-dd327",
        storageBucket: "train-schedule-dd327.appspot.com",
        messagingSenderId: "129255531046"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    //Button for adding a train 
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
        //grabbing train inof 
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstDeparture = $("#first-depart").val().trim();
        var frequency = $("#frequency").val().trim();
        // var nextArrival;
        // var minutesAway;

        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstDeparture: firstDeparture,
            frequency: frequency,
        };

        database.ref().push(newTrain);
        console.log(newTrain);

        //clearing text boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-depart").val("");
        $("#frequency").val("");
    });

    database.ref().on("child_added", function (Snapshot) {
        console.log(Snapshot.val());

        var newTrain = Snapshot.val().trainName;
        var destination = Snapshot.val().destination;
        var firstDepart = Snapshot.val().firstDeparture;
        var frequency = Snapshot.val().frequency;

        console.log(newTrain);
        console.log(destination);
        console.log(firstDepart);
        console.log(frequency);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(newTrain),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            // $("<td>").text(nextArrival),
            // $("<td>").text(minutesAway)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    })
})