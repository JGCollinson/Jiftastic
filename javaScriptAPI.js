var topics = ["Jifs", "Star Wars", "Simpsons", "Star Trek", "Futurama"];

function showButton() {
  $("#buttonDiv").empty();
  for (var i = 0; i < topics.length; i++) {
    var button = $("<button class ='btn btn-primary btn-lg m-2'>");
    button.text(topics[i]);
    button.addClass("topics");
    button.attr("topic-name", topics[i]);
    $("#buttonDiv").append(button);
  }
}

$("#executeSearch").on("click", function (event) {
  event.preventDefault();
  var character = $("#searchLabel").val().trim();
  if (!character) {
    alert("EmptySearch Error");
  } else {
    topics.push(character);
    showButton();
    jifMethod();
  }
});

function jifMethod() {
  $("button").on("click", function () {
    $("#jifGrid").empty();
    var buttonText = $(this).text();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      buttonText +
      "&api_key=DxDENWDds1OGZtB9v5uLLLB1JNoPyPFy&limit=12";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var j = 0;
        var jifDiv = $("<div class='card bg-dark text-white col-md-2 m-3'>");
        var jifObject = $("<img class='card-img'>");
        var newRow = $("<div class='row justify-content-center text-center'>");
        jifObject.attr("src", results[i].images.original_still.url);
        jifObject.attr("image", results[i].images.original_still.url);
        jifObject.attr("jif", results[i].images.fixed_height.url);
        jifObject.attr("toggle", "off");

        jifDiv.append(jifObject);
        if (i % 4 === 0) {
          newRow.attr("id", "rowNum" + j);
          newRow.append(jifDiv);
          $("#jifGrid").prepend(newRow);
          j++;
        } else {
          $("#rowNum" + j).prepend(jifDiv);
        }
      }
    });
  });
}

$(document).on("click", ".card-img", function () {
  var state = $(this).attr("toggle");
  var on = $(this).attr("jif");
  var off = $(this).attr("image");
  if (state === "off") {
    $(this).attr("src", on);
    $(this).attr("toggle", "on");
  } else {
    $(this).attr("src", off);
    $(this).attr("toggle", "off");
  }
});
showButton();
jifMethod();