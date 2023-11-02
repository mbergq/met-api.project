//URL to fetch object ID's that is mainly about or related to the artist Vincent van Gogh
let vanGoghUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van Gogh'

//Then i use this URL to to gather specific data about a specific objectID, the URL above only returns ID's that is available
let objectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

let previousButton = document.querySelector('#previous');
let nextButton = document.querySelector('#next');
let i = 0;


function updateButtonsState() {
  if (i > 0) {
    previousButton.disabled = false;
  } else {
    previousButton.disabled = true;
  }

  if (i === 423) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

//Add message to display whenever there is no image available to display
const imageWrapper = document.querySelector('#imageWrapper');
const noImageMessage = document.createElement('h2');
noImageMessage.classList.add('noImageMessage');
noImageMessage.textContent = "No image available..";
imageWrapper.appendChild(noImageMessage);
noImageMessage.style.display = 'none';


//Function which displays the first image of the array
addEventListener('DOMContentLoaded', () => {
  updateButtonsState();
  displayImage(i);
})
//Code to iterate back to "previous" image, upon click we decrement the value / go back to previous image.
document.querySelector('#previous').addEventListener('click', () => {
  if (i > 0) {
    i--;
    displayImage(i);//this calls the function below and updates its "index" value of i
    updateButtonsState();
  }
})
//Code to iterate to "next" image, this value is added to the array i fetch in function below.
document.querySelector('#next').addEventListener('click', () => {
  i++;
  displayImage(i);//this calls the function below and updates its "index" value of i
  updateButtonsState();
})


function displayImage(index) {
  fetch(vanGoghUrl)
    .then((res) => res.json())
    .then((data) => {

      let vgID = data.objectIDs[index];

      //Second fetch using vgID and an arrayfunction to iterate to next object
      fetch(objectsUrl + vgID)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.objectID);

          //Function to display a errormessage when there is no img available to dsisplay
          if (data.primaryImage === "") {
            document.querySelector('.noImageMessage').style.display = 'block';
          } else {
            document.querySelector('.noImageMessage').style.display = 'none';
          }

          if (data.message === "Not a valid object") { //TODO: Use this if statement to display something when this happens
            console.log("404 Error here");
          }

          let painting = document.querySelector('#imageHolderTag');
          painting.src = data.primaryImage;
          painting.style.width = '70%';

          let artistName = document.querySelector('#artistName');
          artistName.textContent = data.constituents[0].name;

          let lifespan = document.querySelector('#lifespan');
          lifespan.textContent = "Born: " + data.artistBeginDate + " -  Passed: " + data.artistEndDate;

          let nationality = document.querySelector('#nationality');
          nationality.textContent = "Nationality: " + data.artistNationality;

          let typeOfPainting = document.querySelector('#typeOfPainting');
          typeOfPainting.textContent = "Medium: " + data.medium;

          let infoURL = document.querySelector('#infoURL');
          infoURL.innerHTML = "<a href='" + data.objectURL + "'>Additional info..</a>";


        })

    })

}

//Egyptian art section
