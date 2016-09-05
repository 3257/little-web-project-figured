$(function () {

    var $fiveDaySourceTemplate = $("#five-day-template").html(),
        fiveDayTemplateCompile = Handlebars.compile($fiveDaySourceTemplate),
        $fiveDayForecastContent = $("#five-day-forecast-content"),
        $fiveDaySideNavInput = $("#side-nav input"),
        $cityName,
        $html,
        $datesWrapper = $("#five-day-forecast-nav"),
        $namesWrap = $("#main-nav ul"),
        $cityHeader = $("#five-day-weather-info-header"),
        $cityCountry = $("#five-day-weather-country"),
        $cityLat = $("#city-latitude"),
        $cityLong = $("#city-longitude"),
        $sideNavInput = $("#side-nav input");


    //return data for sofia on page load
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=Sofia&cnt=5&mode=json&appid=a28f075ad9633624934634a4d49a37c5",
        function (data) {

            $html = fiveDayTemplateCompile(data);
            $fiveDayForecastContent.append($html);

            //Add city name as header and other city info below
            $cityHeader.html(data.city.name);
            $cityCountry.html(data.city.country);
            $cityLat.html(data.city.coord.lat.toFixed(2) + "°");
            $cityLong.html(data.city.coord.lon.toFixed(2) + "°");

            iterateOverWeatherDays();

            //initiliazing google maps simultaniuesly
            initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
        })

    //click-function for city names given in navigation
    $namesWrap.on("click", "li", function () {

        $cityName = $(this).html();
        $fiveDayForecastContent.empty();

        $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
            $cityName +
            "&cnt=5&mode=json&appid=a28f075ad9633624934634a4d49a37c5",
            function (data) {

                $html = fiveDayTemplateCompile(data);
                $fiveDayForecastContent.append($html);

                //Add city name as header and other city info below
                $cityHeader.html(data.city.name);
                $cityCountry.html(data.city.country);
                $cityLat.html(data.city.coord.lat.toFixed(2) + "°");
                $cityLong.html(data.city.coord.lon.toFixed(2) + "°");

                iterateOverWeatherDays();

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
            $fiveDayForecastContent.empty();

            $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
                $cityValue +
                "&cnt=5&mode=json&appid=a28f075ad9633624934634a4d49a37c5",
                function (data) {

                    $html = fiveDayTemplateCompile(data);
                    $fiveDayForecastContent.append($html);

                    //Add city name as header and other city info below
                    $cityHeader.html(data.city.name);
                    $cityCountry.html(data.city.country);
                    $cityLat.html(data.city.coord.lat.toFixed(2) + "°");
                    $cityLong.html(data.city.coord.lon.toFixed(2) + "°");

                    iterateOverWeatherDays();

                    //initiliazing google maps simultaniuesly
                    initializeMap(data.city.coord.lat, data.city.coord.lon, "five-day-map");
                })
        }
    })

    function iterateOverWeatherDays(){

        var $dayOne = $("#day-one"),
            $dayTwo = $("#day-two"),
            $dayThree = $("#day-three"),
            $dayFour = $("#day-four"),
            $dayFive = $("#day-five"),
            $dayOneWrapper = $("#day-one-wrapper div"),
            $dayTwoWrapper = $("#day-two-wrapper div"),
            $dayThreeWrapper = $("#day-three-wrapper div"),
            $dayFourWrapper = $("#day-four-wrapper div"),
            $dayFiveWrapper = $("#day-five-wrapper div");


        setTimeout(show_first,3000);

        function show_fifth(){
            $dayFive.siblings().slideUp("slow");
            $dayFiveWrapper.addClass("button");
            $dayFourWrapper.removeClass("button");
            $dayFive.show("slow");
            setTimeout(show_first,3000);
        }

        function show_fourth(){
            $dayFour.siblings().slideUp("slow");
            $dayFourWrapper.addClass("button");
            $dayThreeWrapper.removeClass("button");
            $dayFour.show("slow");
            setTimeout(show_fifth,3000);
        }

        function show_third(){
            $dayThree.siblings().slideUp("slow");
            $dayThreeWrapper.addClass("button");
            $dayTwoWrapper.removeClass("button");
            $dayThree.show("slow");
            setTimeout(show_fourth,3000);
        }

        function show_second(){
            $dayTwo.siblings().slideUp("slow");
            $dayTwoWrapper.addClass("button");
            $dayOneWrapper.removeClass("button");
            $dayTwo.show("slow");
            setTimeout(show_third,3000);
        }


        function show_first(){
            $dayOne.show("slow");
            $dayOneWrapper.addClass("button");
            $dayFiveWrapper.removeClass("button");
            $dayOne.siblings().slideUp("slow");
            setTimeout(show_second,3000);
        }}


    //clickable side naviagtion changing weather content
    $datesWrapper.on("click", "li", function () {

        var $dayOne = $("#day-one"),
            $dayTwo = $("#day-two"),
            $dayThree = $("#day-three"),
            $dayFour = $("#day-four"),
            $dayFive = $("#day-five"),
            $forecastContent = $("#five-day-forecast-content");


        if (this.id === "day-one-wrapper") {
            $dayOne.siblings().slideUp("slow");
            $dayOne.show("slow");

        }

        else if (this.id === "day-two-wrapper") {
            $dayTwo.siblings().slideUp("slow");
            $dayTwo.show("slow");

        }

        else if (this.id === "day-three-wrapper") {
            $dayThree.siblings().slideUp("slow");
            $dayThree.show("slow");

        }

        else if (this.id === "day-four-wrapper") {
            $dayFour.siblings().slideUp("slow");
            $dayFour.show("slow");

        }

        else if (this.id === "day-five-wrapper") {
            $dayFive.siblings().slideUp("slow");
            $dayFive.show("slow");

        }


    })


})
