$(function () {

    var $fiveDaySourceTemplate = $("#five-day-template").html(),
        fiveDayTemplateCompile = Handlebars.compile($fiveDaySourceTemplate),
        $fiveDayForecastContent = $("#five-day-forecast-content"),
        $fiveDaySideNavInput = $("#side-nav input"),
        $cityNameData,
        $htmlFromTemplate,
        $fiveDatesWrapper = $("#five-day-forecast-nav"),
        $cityNamesFromMainNavigation = $("#main-nav ul"),
        $cityHeaderInResult = $("#five-day-weather-info-header"),
        $cityCountryInResult = $("#five-day-weather-country"),
        $cityLatInResult = $("#city-latitude"),
        $cityLongInResult = $("#city-longitude"),
        $fiveWeatherDatesResult,
        $allDaysNamesDivsOnSide = $(".weather-days div"),
        $dayOneNameDivOnSide = $("#day-one-wrapper div"),
        $dayTwoNameDivOnSide = $("#day-two-wrapper div"),
        $dayThreeNameDivOnSide = $("#day-three-wrapper div"),
        $dayFourNameDivOnSide = $("#day-four-wrapper div"),
        $dayFiveNameDivOnSide = $("#day-five-wrapper div"),
        $sideNavInput = $("#side-nav input"),
        $mainPageWrapper = $("#main-wrapper"),
        $loaderDiv = $("<div class='loader'><div></div><div></div><div></div><div></div></div>"),
        MISTAKE_MESSAGE = "Well:) Try again with a valid city name!!",
        TRANSPARENT_COLOR = "rgba(255, 255, 255, .6)",
        FLORALWHITE_COLOR = "floralwhite";

    $mainPageWrapper.append($loaderDiv);

    // Return data for sofia on page load.
    promiseFiveDays("Sofia").done(function (data) {

        $htmlFromTemplate = fiveDayTemplateCompile(data);
        $loaderDiv.remove();
        $fiveDayForecastContent.append($htmlFromTemplate);

        // Add city name as header and other city info below.
        $cityHeaderInResult.html(data.city.name);
        $cityCountryInResult.html(data.city.country);
        $cityLatInResult.html(data.city.coord.lat.toFixed(2) + "°");
        $cityLongInResult.html(data.city.coord.lon.toFixed(2) + "°");

        // Get all five dates as an array.
        $fiveWeatherDatesResult = $(".five-weather-date");

        // Change the color of the first element.
        $dayOneNameDivOnSide.css({color: TRANSPARENT_COLOR});

        // Correct the inner html of all side dates to actual date representation.
        // Need to be done just one because dates do not when receiving data for other cities.
        $dayOneNameDivOnSide.html($fiveWeatherDatesResult.eq(0).html());
        $dayTwoNameDivOnSide.html($fiveWeatherDatesResult.eq(1).html());
        $dayThreeNameDivOnSide.html($fiveWeatherDatesResult.eq(2).html());
        $dayFourNameDivOnSide.html($fiveWeatherDatesResult.eq(3).html());
        $dayFiveNameDivOnSide.html($fiveWeatherDatesResult.eq(4).html());

        // iterateOverWeatherDays();

        initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
    });

    // Click-function for city names returned from main navigation.
    $cityNamesFromMainNavigation.on("click", "li", function () {

        $cityNameData = $(this).html();
        $fiveDayForecastContent.empty();
        $mainPageWrapper.append($loaderDiv);

        // Return city data on success.
        promiseFiveDays($cityNameData).done(function (data) {

            $htmlFromTemplate = fiveDayTemplateCompile(data);
            $loaderDiv.remove();
            $fiveDayForecastContent.append($htmlFromTemplate);

            // Add city name as header and other city info below.
            $cityHeaderInResult.html(data.city.name);
            $cityCountryInResult.html(data.city.country);
            $cityLatInResult.html(data.city.coord.lat.toFixed(2) + "°");
            $cityLongInResult.html(data.city.coord.lon.toFixed(2) + "°");

            // Reset all dates to floralwhite similar to page-load initial state.
            $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
            // Reset the color of the first date on side to transparent.
            $dayOneNameDivOnSide.css({color: TRANSPARENT_COLOR});

            // iterateOverWeatherDays();

            initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
        });

        // Return message on failure.
        promiseFiveDays($cityValue).fail(function () {
            $loaderDiv.remove();
            $fiveDayForecastContent.append("<p class=\"something-wrong\">" + MISTAKE_MESSAGE + "</p>");
        })
    })

    // Input-function for city names returned from side navigation.
    $sideNavInput.keydown(function (event) {
        var $key = event.which,
            $cityValue;
        if ($key === 13) {

            $cityValue = $(this).val();
            $fiveDayForecastContent.empty();
            $mainPageWrapper.append($loaderDiv);

            // Check if value is a valid string and not a number.
            if (!$cityValue || /^\s*$/.test($cityValue) || !isNaN($cityValue)) {
                $loaderDiv.remove();
                $fiveDayForecastContent.empty();
                $fiveDayForecastContent.append("<p class=\"something-wrong\">" + MISTAKE_MESSAGE + "</p>");
            } else {

                // Return city data on success.
                promiseFiveDays($cityValue).done(function (data) {

                    $htmlFromTemplate = fiveDayTemplateCompile(data);
                    $loaderDiv.remove();
                    $fiveDayForecastContent.append($htmlFromTemplate);

                    //Add city name as header and other city info below.
                    $cityHeaderInResult.html(data.city.name);
                    $cityCountryInResult.html(data.city.country);
                    $cityLatInResult.html(data.city.coord.lat.toFixed(2) + "°");
                    $cityLongInResult.html(data.city.coord.lon.toFixed(2) + "°");

                    // Reset all dates to floralwhite similar to page-load initial state.
                    $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
                    // Reset the color of the first date on side to transparent.
                    $dayOneNameDivOnSide.css({color: TRANSPARENT_COLOR});

                    // iterateOverWeatherDays();

                    initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
                });

                // Return message on failure.
                promiseFiveDays($cityValue).fail(function () {
                    $loaderDiv.remove();
                    $fiveDayForecastContent.append("<p class=\"something-wrong\">" + MISTAKE_MESSAGE + "</p>");
                })
            }
        }
    })

    // Promise function to get data.
    function promiseFiveDays(nameOfCityAsString) {

        return $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="
            + nameOfCityAsString +
            "&cnt=5&mode=json&units=metric&appid=a28f075ad9633624934634a4d49a37c5");
    };

    // Clickable side navigation for the five-day info returned changing which day is shown.
    $fiveDatesWrapper.on("click", "li", function () {

        var $dayOne = $("#day-one"),
            $dayTwo = $("#day-two"),
            $dayThree = $("#day-three"),
            $dayFour = $("#day-four"),
            $dayFive = $("#day-five");


        if (this.id === "day-one-wrapper") {
            $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
            $dayOneNameDivOnSide.css({color: TRANSPARENT_COLOR});
            $dayOne.siblings().fadeOut("slow");
            $dayOne.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-two-wrapper") {
            $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
            $dayTwoNameDivOnSide.css({color: TRANSPARENT_COLOR});
            $dayTwo.siblings().fadeOut("slow");
            $dayTwo.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-three-wrapper") {
            $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
            $dayThreeNameDivOnSide.css({color: TRANSPARENT_COLOR});
            $dayThree.siblings().fadeOut("slow");
            $dayThree.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-four-wrapper") {
            $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
            $dayFourNameDivOnSide.css({color: TRANSPARENT_COLOR});
            $dayFour.siblings().fadeOut("slow");
            $dayFour.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-five-wrapper") {
            $allDaysNamesDivsOnSide.css({color: FLORALWHITE_COLOR});
            $dayFiveNameDivOnSide.css({color: TRANSPARENT_COLOR});
            $dayFive.siblings().fadeOut("slow");
            $dayFive.delay(800).fadeIn("slow");

        }
    })

    // Iterating over days removed for now.
    // Automatic change for weather days day by day.
    // function iterateOverWeatherDays(){
    //
    //     var $dayOne = $("#day-one"),
    //         $dayTwo = $("#day-two"),
    //         $dayThree = $("#day-three"),
    //         $dayFour = $("#day-four"),
    //         $dayFive = $("#day-five"),
    //         $dayOneWrapper = $("#day-one-wrapper div"),
    //         $dayTwoWrapper = $("#day-two-wrapper div"),
    //         $dayThreeWrapper = $("#day-three-wrapper div"),
    //         $dayFourWrapper = $("#day-four-wrapper div"),
    //         $dayFiveWrapper = $("#day-five-wrapper div"),
    //         $allWeatherDaysWrapped = $(".weather-days div");
    //
    //     setTimeout(fadeIn_first,3000);
    //
    //     function fadeIn_fifth(){
    //         $dayFive.siblings().fadeOut("slow");
    //         $dayFive.delay(800).fadeIn("slow");
    //         setTimeout(fadeIn_first,4000);
    //
    //     }
    //
    //     function fadeIn_fourth(){
    //         $dayFour.siblings().fadeOut("slow");
    //         $dayFour.delay(800).fadeIn("slow");
    //         setTimeout(fadeIn_fifth,4000);
    //
    //     }
    //
    //     function fadeIn_third(){
    //         $dayThree.siblings().fadeOut("slow");
    //         $dayThree.delay(800).fadeIn("slow");
    //         setTimeout(fadeIn_fourth,4000);
    //
    //     }
    //
    //     function fadeIn_second(){
    //         $dayTwo.siblings().fadeOut("slow");
    //         $dayTwo.delay(800).fadeIn("slow");
    //         setTimeout(fadeIn_third,4000);
    //
    //     }
    //
    //     function fadeIn_first(){
    //         $dayOne.delay(800).fadeIn("slow");
    //         $dayOne.siblings().fadeOut("slow");
    //         setTimeout(fadeIn_second,4000);
    //
    //     }
    //
    //     // // Break function in case any other day is clicked
    //     // $cityNamesFromMainNavigation.on("click", function () {
    //     //     console.log($(this));
    //     //     $(this).data("clicked",true);
    //     // })
    //     //
    //     // if($cityNamesFromMainNavigation.data("clicked")){
    //     //     return;
    //     // }
    // };
})
