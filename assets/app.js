

var gifNames = ["Rick and Morty", "Its alsways Sunny", "Game of Thrones", "wilfred ", "Dragon Ball Super",]

// adding first buttons from the array above
function renderButtons() {

  $("#start").empty();

  for (let i = 0; i < gifNames.length; i++) {

    var gifDiv = $("<button>");

    gifDiv.text(gifNames[i]);

    gifDiv.attr("data-gif", gifNames[i])

    $("#start").append(gifDiv);

    console.log(gifNames[i]);


  }
}

// clearing gifs on the screen

$("#clearGifs").on("click", function () {
  $("#start").empty();
  $("#gif-goes-here").html("");
  renderButtons();
});

// crating the gifs from the api and pushing them to the dom
$(document).on("click", "button", function () {

  var gif = $(this).attr("data-gif");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";



  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {

      $("#gif-goes-here").html("");

      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div class='gifdiv' >");


        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifImage.attr("class", "gif");

        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gif-goes-here").prepend(gifDiv);
      }
    });
});

//function to animate the gifs
$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state");

  if (state === "still") {
    var newState = $(this).attr("data-animate");
    $(this).attr("src", newState);
    $(this).attr("data-state", "animate");

  }

  else if (state === "animate") {
    var newState = $(this).attr("data-still");
    $(this).attr("src", newState);
    $(this).attr("data-state", "still");

  }
});

//function to add the new gifs to the page
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  if ($("#user-input").val() === "") {

  }
  else {
    // This lne grabs the input from the textbox
    var userGif = $("#user-input").val().trim();

    // The movie from the textbox is then added to our array
    gifNames.push(userGif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

    $("#user-input").val("");
  }
});

// calling the function to display the gif buttons

renderButtons();




