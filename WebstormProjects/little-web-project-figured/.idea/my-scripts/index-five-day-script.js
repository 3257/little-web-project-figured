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
            $dayFiveWrapper = $("#day-five-wrapper div"),
            $allWeatherDaysWrapped = $(".weather-days div");

        setTimeout(fadeIn_first,3000);

        function fadeIn_fifth(){
            $dayFive.siblings().fadeOut("slow");
            $dayFive.delay(800).fadeIn("slow");
            setTimeout(fadeIn_first,4000);

        }

        function fadeIn_fourth(){
            $dayFour.siblings().fadeOut("slow");
            $dayFour.delay(800).fadeIn("slow");
            setTimeout(fadeIn_fifth,4000);

        }

        function fadeIn_third(){
            $dayThree.siblings().fadeOut("slow");
            $dayThree.delay(800).fadeIn("slow");
            setTimeout(fadeIn_fourth,4000);

        }

        function fadeIn_second(){
            $dayTwo.siblings().fadeOut("slow");
            $dayTwo.delay(800).fadeIn("slow");
            setTimeout(fadeIn_third,4000);

        }

        function fadeIn_first(){
            $dayOne.delay(800).fadeIn("slow");
            $dayOne.siblings().fadeOut("slow");
            setTimeout(fadeIn_second,4000);

        }

        $namesWrap.on("click", function () {
            console.log($(this));
            $(this).data("clicked",true);
        })

        if($namesWrap.data("clicked")){

            return;
        }
    };


    //clickable side naviagtion changing weather content
    $datesWrapper.on("click", "li", function () {

        var $dayOne = $("#day-one"),
            $dayTwo = $("#day-two"),
            $dayThree = $("#day-three"),
            $dayFour = $("#day-four"),
            $dayFive = $("#day-five"),
            $forecastContent = $("#five-day-forecast-content");


        if (this.id === "day-one-wrapper") {
            $dayOne.siblings().fadeOut("slow");
            $dayOne.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-two-wrapper") {
            $dayTwo.siblings().fadeOut("slow");
            $dayTwo.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-three-wrapper") {
            $dayThree.siblings().fadeOut("slow");
            $dayThree.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-four-wrapper") {
            $dayFour.siblings().fadeOut("slow");
            $dayFour.delay(800).fadeIn("slow");

        }

        else if (this.id === "day-five-wrapper") {
            $dayFive.siblings().fadeOut("slow");
            $dayFive.delay(800).fadeIn("slow");

        }


    })


})
