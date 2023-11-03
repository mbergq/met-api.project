//URL to fetch object ID's that is mainly about or related to the artist Vincent van Gogh
const vanGoghUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van Gogh'

//Then i use this URL to to gather specific data about a specific objectID, the URL above only returns ID's that is available
const objectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
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

//Display images on pageload
addEventListener('DOMContentLoaded', () => {
  updateButtonsState();
  fetchEgyptianArt(i);
  displayImage(i);
})
//Code to iterate back to "previous" image, upon click we decrement the value / go back to previous image.
previousButton.addEventListener('click', () => {
  if (i > 0) {
    i--;
    displayImage(i);//this calls the function below and updates its "index" value of i
    updateButtonsState();
  }
})
//Code to iterate to "next" image, this value is added to the array i fetch in function below.
nextButton.addEventListener('click', () => {
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

//Egyptian art code

//URL that collects objectID's related to egyptian art with a search query which looks for id's that contains cats
const egyptianArtObjects = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Snake';

const egyptianArtPreviousButton = document.querySelector('#egyptianArtPreviousBtn');
const egyptianArtNextButton = document.querySelector('#egyptianArtNextBtn');
const egyptianArtRandomButton = document.querySelector('#egyptianArtRandomBtn');

let n = 0;

egyptianArtPreviousButton.addEventListener('click', () => {
  if (n > 0) {
    n--;
    fetchEgyptianArt(n);

  }
})
//Code to iterate to "next" image, this value is added to the array i fetch in function below.
egyptianArtNextButton.addEventListener('click', () => {
  n++;
  fetchEgyptianArt(n);

})
//Random button
egyptianArtRandomButton.addEventListener('click', () => {
  n = Math.floor(Math.random() * 1088);
  fetchEgyptianArt(n);

})


function fetchEgyptianArt(num) {
  fetch(egyptianArtObjects)
    .then((res) => res.json())
    .then((data) => {

      let egyptianArtID = data.objectIDs[num];

      fetch(objectsUrl + egyptianArtID)
        .then((res) => res.json())
        .then((data) => {

          //Temporary fix for mitigating empty primaryImage objects
          if (data.primaryImage === '' || data.message === "Not a valid object") {
            console.log('no image');
            num++;
            fetchEgyptianArt(num);
          } else {
            console.log(data.objectID);
            const egyptianArtImage = document.querySelector('#egyptianArtImage');
            egyptianArtImage.src = data.primaryImage;
            egyptianArtImage.style.width = '70%';
          }

          const objectName = document.querySelector('#objectName');
          objectName.textContent = data.objectName;

          const objectTitle = document.querySelector('#objectTitle');
          objectTitle.textContent = data.title;

          const description = document.querySelector('#description');
          description.textContent = data.medium;

          const objectDate = document.querySelector('#objectDate');
          objectDate.textContent = data.objectDate;

          const readMoreLink = document.querySelector('#readMoreLink');
          readMoreLink.innerHTML = "<a href='" + data.objectURL + "'>Read more</a>";

        })
    })
}
