$(function () {

    var $namesWrap = $("#main-nav ul"),
        sourceTemplate = $("#main-template").html(),
        templateCompile = Handlebars.compile(sourceTemplate),
        $cityName,
        $html,
        $mainWrapper = $("#main-wrapper"),
        $sideNavInput = $("#side-nav input");

    //return data for sofia on page load
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Sofia&APPID=a28f075ad9633624934634a4d49a37c5",
        function (data) {

            console.log(data);

            $html = templateCompile(data);
            $mainWrapper.append($html);

            //initiliazing google maps simultaniuesly
            initializeMap(data.coord.lat, data.coord.lon, "map");

        })


    //click-function for city names given in navigation
    $namesWrap.on("click", "li", function () {

        $cityName = $(this).html();
        $mainWrapper.empty();

        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" +
            $cityName +
            "&APPID=a28f075ad9633624934634a4d49a37c5",
            function (data) {

                $html = templateCompile(data);
                $mainWrapper.append($html);

                initializeMap(data.coord.lat, data.coord.lon, "map");
            })

    })

    //using side navigation to get city name on pressing enter
    $sideNavInput.keydown(function (event) {
        var $key = event.which,
            $cityValue;
        if ($key === 13) {
            $cityValue = $(this).val();

            $mainWrapper.empty();

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" +
                $cityValue +
                "&APPID=a28f075ad9633624934634a4d49a37c5",
                function (data) {

                    $html = templateCompile(data);
                    $mainWrapper.append($html);

                    initializeMap(data.coord.lat, data.coord.lon, "map");

                })
        }
    })
})

//Handlebars helpers start
Handlebars.registerHelper("fixTemperatureDisplay", function (temperatureNumber) {

    return (temperatureNumber / 10).toFixed(1)
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
            '<a href="http://nadido.site88.net/index-five-day.html">' +
            '5-DAY FORECAST' +
            '</a>' +
            '</p>' +
            '<p class="infoWindowNotice">' +
            '<a href="http://nadido.site88.net/">' +
            'CURRENT WEATHER' +
            '</a>' +
            '</p>' +
            '<p class="infoWindowNotice">' +
            '<a href="http://nadido.site88.net/index-full-weather-map.html">' +
            'FULL WEATHER MAP' +
            '</a>' +
            '</p>'

    infowindow = new google.maps.InfoWindow({
        content: contentString

    });

    infowindow.open(map, mapMarker);

}