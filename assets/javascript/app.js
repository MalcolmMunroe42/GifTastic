$(document).ready(function() {

    var sports = [ "Basketball", "Baseball", "Football" ];

    function showGifs() {
        var sport = $(this).attr("sport-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=01xgv0CY3EncQbIOHVTsg41QfK1NnRBP&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            $("#sports").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var sportDiv = $("<div class='userSport'>");

                var rating = results[i].rating;
                var pRate = $("<p>").text("Rating: " + rating);

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                var gif = $("<img>").addClass("gif").attr("src", urlStill).attr("data-still", urlStill).attr("data-animate", urlPlay).attr("data-state", "still");

                sportDiv.append(gif);
                sportDiv.append(pRate);

                $("#sports").append(sportDiv);
            }

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }

            });
        });

    }

    function makeButtons() {

        $("#sportButtons").empty();

        for (var i = 0; i < sports.length; i++) {

            var sportRender = $("<button>");

            sportRender.addClass("sport");
            sportRender.attr("sport-name", sports[i]);
            sportRender.text(sports[i]);
            $("#sportButtons").append(sportRender);
        }
    }

    $("#addSport").on("click", function(event) {
        event.preventDefault();
        var sport = $("#sport-input").val().trim();

        sports.push(sport);
            $("#sport-input").val(" ");
        makeButtons();
    });

    $(document).on("click", ".sport", showGifs);

    makeButtons();

});