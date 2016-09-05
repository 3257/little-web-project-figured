$(function () {

    var $namesWrap = $("#main-nav ul"),
        sourceTemplate = $("#main-template").html(),
        templateCompile = Handlebars.compile(sourceTemplate),
        $cityName,
        $html,
        $mainWrapper = $("#main-wrapper"),
        $sideNavInput = $("#side-nav input"),
        $loaderDiv = $("<div class='loader'><div></div><div></div><div></div><div></div></div>"),
        MISTAKE_MESSAGE = "Well:) Try again with a valid city name!!";

    $mainWrapper.append($loaderDiv);

    // Return data for sofia on page load.
    promise("Sofia").done(function (data) {

        $html = templateCompile(data);
        $loaderDiv.remove();
        $mainWrapper.append($html);

        initializeMap(data.coord.lat, data.coord.lon, "map");
    });

    // Return message if promise fails.
    promise("Sofia").fail(function () {
        $loaderDiv.remove();
        $mainWrapper.append("<p class=\"something-wrong\">"+MISTAKE_MESSAGE+"</p>");
    })


    // Click-function for city names given in navigation.
    $namesWrap.on("click", "li", function () {

        $cityName = $(this).html();
        $mainWrapper.empty();
        $mainWrapper.append($loaderDiv);

        // Return city data on success
        promise($cityName).done(function (data) {

            $html = templateCompile(data);
            $loaderDiv.remove();
            $mainWrapper.append($html);

            initializeMap(data.coord.lat, data.coord.lon, "map");
        });

        // Return message on failure
        promise($cityName).fail(function () {
            $loaderDiv.remove();
            $mainWrapper.append("<p class=\"something-wrong\">"+MISTAKE_MESSAGE+"</p>");
        })

    })

    // Using side navigation to get city name on pressing enter.
    $sideNavInput.keydown(function (event) {
        var $key = event.which,
            $cityValue;
        if ($key === 13) {

            $cityValue = $(this).val();
            $mainWrapper.empty();
            $mainWrapper.append($loaderDiv);

            // Check if value is a valid string and not a number
            if (!$cityValue || /^\s*$/.test($cityValue)||!isNaN($cityValue)) {
                $loaderDiv.remove();
                $mainWrapper.empty();
                $mainWrapper.append("<p class=\"something-wrong\">"+MISTAKE_MESSAGE+"</p>");
            }else{

                // Return city data on success
                promise($cityValue).done(function (data) {

                    $html = templateCompile(data);
                    $loaderDiv.remove();
                    $mainWrapper.append($html);

                    initializeMap(data.coord.lat, data.coord.lon, "map");
                });

                // Return message on failure
                promise($cityValue).fail(function () {
                    $loaderDiv.remove();
                    $mainWrapper.append("<p class=\"something-wrong\">"+MISTAKE_MESSAGE+"</p>");
                })
            }
        }
    })

    // promise function to get data
    function promise(nameOfCityAsString) {

        return $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + nameOfCityAsString + "&units=metric&APPID=a28f075ad9633624934634a4d49a37c5");
    };

})

//Handlebars helpers start
Handlebars.registerHelper("fixTemperatureDisplay", function (temperatureNumber) {

    return (temperatureNumber).toFixed(1)
})

Handlebars.registerHelper("dateDisplayFix", function (dateInUnix) {

    return (new Date(dateInUnix * 1000)).toUTCString().substr(0, 16)
})

Handlebars.registerHelper("numberToOneDigitDisplayFix", function (numberToBeFixed) {

    return Number(numberToBeFixed).toFixed(1)
})

Handlebars.registerHelper("displayWeatherIcon", function (iconNumber) {

    return ("http://openweathermap.org/img/w/" + iconNumber + ".png")
})

//Handlebars helpers finish

function initializeMap(langitude, longitude, idSelector) {
    var myCenter = new google.maps.LatLng(langitude, longitude),
        mapProp = {
            center: myCenter,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(document.getElementById(idSelector), mapProp),

        mapMarker = new google.maps.Marker({
            position: myCenter,
            map: map
        }),
        contentString = '<p class="infoWindowNotice">' +
            '<span class="square">' +
            '<a class="third after" href="http://nadido.site88.net/index-five-day.html">' +
            '-> 5-DAY FORECAST' +
            '</a>' +
            '</span>' +
            '</p>' +
            '<p class="infoWindowNotice">' +
            '<span class="square">' +
            '<a lass="third after" href="http://nadido.site88.net/">' +
            '-> CURRENT WEATHER' +
            '</a>' +
            '</span>' +
            '</p>' +
            '<p class="infoWindowNotice">' +
            '<span class="square">' +
            '<a lass="third after" href="http://nadido.site88.net/index-full-weather-map.html">' +
            '-> FULL WEATHER MAP' +
            '</a>' +
            '</span>' +
            '</p>'

    infowindow = new google.maps.InfoWindow({
        content: contentString,
        width: 100

    });

    infowindow.open(map, mapMarker);

}