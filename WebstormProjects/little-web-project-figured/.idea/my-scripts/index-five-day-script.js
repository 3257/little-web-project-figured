$(function () {

    var $fiveDaySourceTemplate = $("#five-day-template").html(),
        fiveDayTemplateCompile = Handlebars.compile($fiveDaySourceTemplate),
        $fiveDayForecastContent = $("#five-day-forecast-content"),
        $fiveDaySideNavInput = $("#side-nav input"),
        $cityName,
        $html,
        $datesWrapper = $("#five-day-forecast-nav"),
        $namesWrap = $("#main-nav ul"),
        $cityHeader = $("#city-header h2"),
        $sideNavInput = $("#side-nav input");


    //return data for sofia on page load
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=Sofia&APPID=a28f075ad9633624934634a4d49a37c5",
        function (data) {

            $cityHeader.html("Weather in " + data.city.name);
            $html = fiveDayTemplateCompile(data);
            $fiveDayForecastContent.append($html);

            //initiliazing google maps simultaniuesly
            initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
        })

    //click-function for city names given in navigation
    $namesWrap.on("click", "li", function () {

        $cityName = $(this).html();

        $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" +
            $cityName +
            "&APPID=a28f075ad9633624934634a4d49a37c5",
            function (data) {
                $fiveDayForecastContent.empty();

                $cityHeader.html("Weather in " + data.city.name);

                $html = fiveDayTemplateCompile(data);
                $fiveDayForecastContent.append($html);

                //initiliazing google maps simultaniuesly
                initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
            })

    })

    //input-function for city names in navigation
    $sideNavInput.keydown(function (event) {
        var $key = event.which,
            $cityValue;
        if ($key === 13) {

            $cityValue = $(this).val();

            $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" +
                $cityValue +
                "&APPID=a28f075ad9633624934634a4d49a37c5",
                function (data) {

                    $fiveDayForecastContent.empty();

                    $cityHeader.html("Weather in " + data.city.name);

                    $html = fiveDayTemplateCompile(data);
                    $fiveDayForecastContent.append($html);

                    //initiliazing google maps simultaniuesly
                    initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");

                })
        }
    })

    //clickable side naviagtion changing weather content
    $datesWrapper.on("click", "li", function () {

        var $dayOne = $("#day-one"),
            $dayTwo = $("#day-two"),
            $dayThree = $("#day-three"),
            $dayFour = $("#day-four"),
            $dayFive = $("#day-five"),
            $forecastContent = $("#five-day-forecast-content");


        if (this.id === "day-one-wrapper") {
            $dayOne.show();
            $dayOne.siblings().hide();
        }

        if (this.id === "day-two-wrapper") {
            $dayTwo.show();
            $dayTwo.siblings().hide();
        }

        if (this.id === "day-three-wrapper") {
            $dayThree.show();
            $dayThree.siblings().hide();
        }

        if (this.id === "day-four-wrapper") {
            $dayFour.show();
            $dayFour.siblings().hide();
        }

        if (this.id === "day-five-wrapper") {
            $dayFive.show();
            $dayFive.siblings().hide();
        }

        $forecastContent.slideToggle("fast");

    })


})