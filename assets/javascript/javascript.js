$(document).ready (function () {
    let todayDateTime = $("#currentDay");

    setInterval(() => {
        const now = moment();
        const dateTime = now.format('dddd, MMMM Do, hh:mm a');
        todayDateTime.text(dateTime);
    }, 1000);

    const queryURL=""

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        
      });

});