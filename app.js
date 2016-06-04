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
    $('#addShow').on('click', function(){

        var show = $('#show-input').val().trim();

        shows.push(show);
        
        renderButtons();

        return false;

    })



    //Function to create buttons to page when user adds tv show.
    function renderButtons(){ 

        $('#buttonsView').empty();

        // Loops through the array of shows
        for (var i = 0; i < shows.length; i++){

            var a = $('<button>')
            a.addClass('show'); // Added a class 
            a.attr('data-name', shows[i]); // Added a data-attribute
            a.text(shows[i]); // Provided the initial button text
            $('#buttonsView').append(a); // Added the button to the HTML
        }
    }



    $('button').on('click', function() {
        var tvShow = $(this).attr('data-name');

        // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";
        var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + tvShow;

        $.ajax({url: queryURL, method: 'GET'})

            .done(function(response) {
                
                var results = response.data.image_original_url;

                //Limits gif number to 10, displays rating and writes information to HTML
                for (var i = 0; i < 10; i++) {
                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var showImage = $('<img>');
                    showImage.attr('src', results[i].images.fixed_height.url);

                    gifDiv.append(p)
                    gifDiv.append(showImage)

                    $('#gifsAppearHere').prepend(gifDiv);
                }

            });
    });


    // //Calls renderButtons() function
    renderButtons();


});


