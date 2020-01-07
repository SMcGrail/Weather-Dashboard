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

    navigator.geolocation.getCurrentPosition(function (position) {

        const loadLat = (position.coords.latitude).toFixed(0);
        const loadLon = (position.coords.longitude).toFixed(0);
        console.log(loadLat, loadLon);
        const loadURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + loadLat + "&lon=" + loadLon + "&mode=json&units=imperial&appid=a2120d1ed5f7642121209ff5a7dc902b";

        $.ajax({
            url: loadURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".cityName").text((response.name) + " " + ((response.main.temp).toFixed(0)) + "°");
            $(".cityTemp").text(((response.main.temp).toFixed(0)) + "°");
            $(".todayHumid").text((response.main.humidity) + "%");
            $(".todayWind").text((response.wind.speed) + "mph");

            const weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            $(".weatherIcon").append(weatherImage);

            const lat = response.coord.lat;
            const lon = response.coord.lon;
            const uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=88ac7af34cb90d87533bbf879a2bb928&lat=" + loadLat + "&lon=" + loadLon;

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (uvResponse) {
                console.log(uvResponse);
                $(".todayUv").text(uvResponse.value);
            })
        });

    });

    let citySearch;
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    console.log(searchHistory);
    // const apiKey = "a2120d1ed5f7642121209ff5a7dc902b";

    $(".searchBtn").on("click", function () {
        event.preventDefault();
        citySearch = $(".cityInput").val();
        console.log(citySearch);

        searchHistory.unshift(citySearch);
        searchHistory.splice(5);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        for (let i = 0; i < searchHistory.length; i++) {
            $(".recentListItem").empty(); 
            const recentListItem = $("<li>");
            recentListItem.text(searchHistory[i]);
            recentListItem.addClass("recentCity");
            $(".recentList").append(recentListItem);
        }


        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + ",us&mode=json&units=imperial&appid=a2120d1ed5f7642121209ff5a7dc902b";



        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);





            $(".cityName").text((response.name) + " " + ((response.main.temp).toFixed(0)) + "°");
            $(".cityTemp").text(((response.main.temp).toFixed(0)) + "°");
            $(".todayHumid").text((response.main.humidity) + "%");
            $(".todayWind").text((response.wind.speed) + "mph");

            const weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            $(".weatherIcon").html(weatherImage);

            const lat = response.coord.lat;
            const lon = response.coord.lon;
            const uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=88ac7af34cb90d87533bbf879a2bb928&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (uvResponse) {
                console.log(uvResponse);
                $(".todayUv").text(uvResponse.value);
            });

        });


    });



});



