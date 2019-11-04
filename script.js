'use strict';

const apiKey = "f3ksetw2zaOr83QnxaxW89Ae1xyeDCgx6VrU4IGO";
const url = "https://developer.nps.gov/api/v1/parks?";

function createUrl(url, apiKey){
  let state = "stateCode=" + $(".stateCode").val();
  let count = "limit=" + $(".maxCount").val();
  let api = "api_key=";

  return url + state + "&" + count + "&" + api + apiKey;
}

function searchResults(responseJson){
  console.log(responseJson);
  
  let num = responseJson.data.length;
  let contentHtml = "";
  let userNum = $(".maxCount").val();

  if(num >= userNum){
    num = userNum;
  }

  for (let i = 0; i < num; i++){
    contentHtml =  contentHtml + '<div><p>Park Name: ' + responseJson.data[i].fullName + '</p><p>Park Description: ' + responseJson.data[i].description + '</p><p>Park Website: <a href="' + responseJson.data[i].url + '" target="_blank">' + responseJson.data[i].url +'</a></p></div>';
  }

  $(".results").removeClass("hidden").html(contentHtml);
}

function handleError(){
  let myError = {};
  myError.message = "There may be no parks here or the state/territory code is wrong";
  throw myError;
}

function getInformation(){
  let newUrl = createUrl(url, apiKey);

  fetch(newUrl)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      if(responseJson.data.length != 0){
        searchResults(responseJson)
      }
      else{
        handleError();
      }
    })
    .catch(err => {
       $(".errorMessage").removeClass("hidden").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
  $(".submit").click(function(event){
    event.preventDefault();
    $(".errorMessage").addClass("hidden");
    $(".results").empty();
    getInformation();

  });
}

$(watchForm);