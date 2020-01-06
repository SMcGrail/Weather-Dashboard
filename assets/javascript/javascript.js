$(document).ready(function () {
    let todayDateTime = $("#currentDay");
    let todayDate = $("#todayDate");

    setInterval(() => {
        const now = moment();
        const dateTime = now.format('dddd, MMMM Do, hh:mm a');
        const date = now.format('MM/DD/YYYY');
        todayDateTime.text(dateTime);
        todayDate.text(date);
    }, 1000);

    let citySearch;
    const queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + ",us&mode=json&units=imperial&appid=a2120d1ed5f7642121209ff5a7dc902b";
    const apiKey = "a2120d1ed5f7642121209ff5a7dc902b";


    $(".searchBtn").on("click", function () {
        event.preventDefault()
        citySearch = $(this).prev().val();
        console.log(citySearch);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".cityName").text((response.name) + " " + ((response.main.temp).toFixed(0)) + "°");
            $(".cityTemp").text(((response.main.temp).toFixed(0)) + "°");
            $(".todayHumid").text((response.main.humidity) + "%");
            $(".todayWind").text((response.wind.speed) + "mph");

        });

    });

});