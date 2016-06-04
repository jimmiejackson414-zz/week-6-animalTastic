$(document).ready(function() {


    /////////////////
    ///// ARRAY /////
    /////////////////

    //Created array of initial tv shows.
    var shows = ['Arrested Development', 'Breaking Bad', 'Lost', '30 Rock'];



    /////////////////////
    ///// FUNCTIONS /////
    /////////////////////

    //This function handles events where the button is clicked, and adds them to shows array.
    $('#addShow').on('click', function() {

        var show = $('#show-input').val().trim();

        shows.push(show);

        renderButtons();

        return false;

    })



    //Function to create buttons to page when user adds tv show.
    function renderButtons() {

        $('#buttonsView').empty();

        // Loops through the array of shows
        for (var i = 0; i < shows.length; i++) {

            var a = $('<button>')
            a.addClass('show'); // Added a class 
            a.attr('data-name', shows[i]); // Added a data-attribute
            a.text(shows[i]); // Provided the initial button text
            $('#buttonsView').append(a); // Added the button to the HTML
        }
    }

    // //Calls renderButtons() function
    renderButtons();


    //Button click function to call gifs from giphy
    $(document).on('click', ".show", function() {
        var tvShow = $(this).attr('data-name');

        

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({ url: queryURL, method: 'GET' })

        .done(function(response) {
            console.log(queryURL);
            var results = response.data;

            //Limits gif number to 10, displays rating and writes information to HTML
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="item">')

                var rating = results[i].rating;

                var p = $('<p>').text("Rating: " + rating);

                var showImage = $('<img>');
                showImage.attr('src', results[i].images.fixed_height.url);
                showImage.attr('data-animate', results[i].images.fixed_height.url);
                showImage.attr('data-still', results[i].images.fixed_height_still.url);
                console.log(results[i]);

                gifDiv.append(p)
                gifDiv.append(showImage)

                $('#gifsAppearHere').prepend(gifDiv);
            }

        });

    });


    //Pausing gifs
    $("#gifsAppearHere").on("click", function(event) {
        var state = $(event.target).attr('data-state');
        console.log(state);
        if (state == 'still') {
            $(event.target).attr('src', $(event.target).data('animate'));
            $(event.target).attr('data-state', 'animate');
        } else {
            $(event.target).attr('src', $(event.target).data('still'));
            $(event.target).attr('data-state', 'still');
        }
    })





});
