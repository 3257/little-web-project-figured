/**
 * Created by dido on 20.08.16.
 */
$(function () {

    var $namesWrap = $("#main-nav ul"),
        sourceTemplate = $("#main-template").html(),
        templateCompile = Handlebars.compile(sourceTemplate),
        $cityName,
        $html,
        $mainWrapper = $("#main-wrapper"),
        $spinner = $("<div/>", {class: "spinner"}),
        $cube1 = $("<div/>", {class: "cube1"}).appendTo($spinner),
        $cube2 = $("<div/>", {class: "cube2"}).appendTo($spinner),
        $sideNavInput = $("#side-nav input"),
        $logo = $("#logo");

    // $mainWrapper.append($spinner);

    //return data for sofia on page load
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Sofia&APPID=a28f075ad9633624934634a4d49a37c5',
        function (data) {

            //change background on load depending on weather type
            changeBackGround(data.weather[0].description);

            //compiling the html template and appending the template itself
            $html = templateCompile(data);
            $mainWrapper.append($html);

            displayWeatherIcon($("#weather-icon"), data.weather[0].icon);

            temperatureFix($(".temperature"));

            dateFix($("#weather-date"),data);


            //initiliazing google maps simultaniuesly
            initializeMap(data.coord.lat, data.coord.lon, "map");

        })


    //click-function for city names given in navigation
    $namesWrap.on('click', 'li', function () {

        $cityName = $(this).html();
        $mainWrapper.empty();
        // $mainWrapper.append($spinner);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
            $cityName +
            '&APPID=a28f075ad9633624934634a4d49a37c5',
            function (data) {
                changeBackGround(data.weather[0].description);
                $html = templateCompile(data);
                // $spinner.remove();
                $mainWrapper.append($html);

                displayWeatherIcon($("#weather-icon"), data.weather[0].icon);

                temperatureFix($(".temperature"));

                dateFix($("#weather-date"),data);

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
            // $mainWrapper.append($spinner);

            $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' +
                $cityValue +
                '&APPID=a28f075ad9633624934634a4d49a37c5',
                function (data) {
                    changeBackGround(data.weather[0].description);
                    $html = templateCompile(data);
                    // $spinner.remove();
                    $mainWrapper.append($html);

                    displayWeatherIcon($("#weather-icon"), data.weather[0].icon);

                    temperatureFix($(".temperature"));

                    dateFix($("#weather-date"),data);

                    initializeMap(data.coord.lat, data.coord.lon, "map");

                })
        }
    })

    function initializeMap(langitude, longitude, selector) {
        var mapProp = {
            center: new google.maps.LatLng(langitude, longitude),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById(selector), mapProp);
    }

    function changeBgToClouds() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://img08.deviantart.net/e679/i/2012/046/b/f/storm_clouds_stock_by_mysticmorning-d4puqek.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function changeBgToFewClouds() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://il2.picdn.net/shutterstock/videos/16907806/thumb/1.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function changeBgToScatteredClouds() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"http://freebie.photography/background/sunset.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }

    function changeBgToBrokenClouds() {
        $("body").fadeTo("slow", 0.9, "linear", function () {

            $(this).css({
                "background": "url(\"https://upload.wikimedia.org/wikipedia/commons/5/5b/Clouds_over_Africa.jpg\") no-repeat center center fixed",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "-webkit-transition": "background 0.5s ease",
                "-moz-transition": "background 0.5s ease",
                "-o-transition": "background 0.5s ease",
                "transition": "background 0.5s ease"
            })
        })
    }


    function changeBackGround(weatherWord) {

        function changeBgToSun() {
            $("body").fadeTo("slow", 0.9, "linear", function () {

                $(this).css({
                    "background": "url(\"https://cdn.cloudpix.co/images/sunny/background-blue-dark-paper-sky-sunny-sunrise-wallpaper-wallpaper-sky-e1c63cfd6e6cd431bdc3be9b3cbb23fe-large-1130435.jpg\") no-repeat center center fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover",
                    "-webkit-transition": "background 0.5s ease",
                    "-moz-transition": "background 0.5s ease",
                    "-o-transition": "background 0.5s ease",
                    "transition": "background 0.5s ease"
                })
            })
        }

        function changeBgToRain() {
            $("body").fadeTo("slow", 0.9, "linear", function () {

                $(this).css({
                    "background": "url(\"http://images4.alphacoders.com/831/83196.jpg\") no-repeat center center fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover",
                    "-webkit-transition": "background 0.5s ease",
                    "-moz-transition": "background 0.5s ease",
                    "-o-transition": "background 0.5s ease",
                    "transition": "background 0.5s ease"
                })
            })
        }

        function changeBgToMist() {
            $("body").fadeTo("slow", 0.9, "linear", function () {

                $(this).css({
                    "background": "url(\"https://img0.etsystatic.com/000/0/5540808/il_fullxfull.243505014.jpg\") no-repeat center center fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover",
                    "-webkit-transition": "background 0.5s ease",
                    "-moz-transition": "background 0.5s ease",
                    "-o-transition": "background 0.5s ease",
                    "transition": "background 0.5s ease"
                })
            })
        }

        function changeBgToThunder() {
            $("body").fadeTo("slow", 0.9, "linear", function () {

                $(this).css({
                    "background": "url(\"http://wallpapercave.com/wp/8M5Odq4.jpg\") no-repeat center center fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover",
                    "-webkit-transition": "background 0.5s ease",
                    "-moz-transition": "background 0.5s ease",
                    "-o-transition": "background 0.5s ease",
                    "transition": "background 0.5s ease"
                })
            })
        }

        function changeBgToSnow() {
            $("body").fadeTo("slow", 0.9, "linear", function () {

                $(this).css({
                    "background": "url(\"http://images.all-free-download.com/images/graphiclarge/elements_of_winter_with_snow_backgrounds_vector_522942.jpg\") no-repeat center center fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover",
                    "-webkit-transition": "background 0.5s ease",
                    "-moz-transition": "background 0.5s ease",
                    "-o-transition": "background 0.5s ease",
                    "transition": "background 0.5s ease"
                })
            })
        }

        function imageTemplate() {
            $("body").fadeTo("slow", 0.9, "linear", function () {

                $(this).css({
                    "background": "url(\"http://www.mbagusi.com/i/hurricane-widescreen-wallpaper.jpg\") no-repeat center center fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover",
                    "-webkit-transition": "background 0.5s ease",
                    "-moz-transition": "background 0.5s ease",
                    "-o-transition": "background 0.5s ease",
                    "transition": "background 0.5s ease"
                })
            })
        }

        if (weatherWord.indexOf("few clouds") >= 0) {
            changeBgToFewClouds();
        }
        else if (weatherWord.indexOf("scattered clouds") >= 0){
            changeBgToScatteredClouds();
        }

        else if (weatherWord.indexOf("broken clouds") >= 0){
            changeBgToBrokenClouds();
        }
        else if (weatherWord.indexOf("clear") >= 0) {
            changeBgToSun();
        }
        else if (weatherWord.indexOf("rain") >= 0) {
            changeBgToRain();
        }
        else if (weatherWord.indexOf("thunderstorm") >= 0){
            changeBgToThunder();
        }
        else if (weatherWord.indexOf("snow") >= 0){
            changeBgToSnow();
        }
        else if(weatherWord.indexOf("mist") >= 0){
            changeBgToMist();
        }
    }

    //http://openweathermap.org/img/w/1 + {weather icon} + .png template
    function displayWeatherIcon($selectorID, weatherIcon) {
        $selectorID.css({
            "backgroundImage": "url(\"http://openweathermap.org/img/w/" + weatherIcon + ".png\") ",

        })
    }

    function temperatureFix($selector){

        var $tempClass = $selector,
            InlineTempNumber = $tempClass.html();
        $tempClass.html((InlineTempNumber/10).toFixed(1));

    }

    function dateFix($selector,data){
        var $dateDiv = $selector;
        $dateDiv.html((new Date(data.dt * 1000)).toUTCString().substr(0,16));
    }

})
