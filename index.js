//URL to fetch object ID's that is mainly about or related to the artist Vincent van Gogh
const vanGoghUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van Gogh'

//Then i use this URL to to gather specific data about a specific objectID, the URL above only returns ID's that is available
const objectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
let i = 0;

//Disable/Enable buttons
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

//Display message when there is no img available
const imageWrapper = document.querySelector('#imageWrapper');
const noImageMessage = document.createElement('h2');
noImageMessage.classList.add('noImageMessage');
noImageMessage.textContent = "No image available..";
imageWrapper.appendChild(noImageMessage);
noImageMessage.style.display = 'none';

//Display images on pageload
addEventListener('DOMContentLoaded', () => {
  updateButtonsState();
  displayImage(i);
})
//Iterate back to previous object
previousButton.addEventListener('click', () => {
  if (i > 0) {
    i--;
    displayImage(i);
    updateButtonsState();
  }
})
//Iterate to next object
nextButton.addEventListener('click', () => {
  i++;
  displayImage(i);
  updateButtonsState();
})

function displayImage(index) {
  fetch(vanGoghUrl)
    .then((res) => res.json())
    .then((data) => {

      //Collect specific objectID to use for next fetch
      let vgID = data.objectIDs[index];

      //Fetch specific data, this enables us to reach img and other info
      fetch(objectsUrl + vgID)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.objectID);

          //Handle event if no image is available
          if (data.primaryImage === "") {
            document.querySelector('.noImageMessage').style.display = 'block';
          } else {
            document.querySelector('.noImageMessage').style.display = 'none';
          }

          if (data.message === "Not a valid object") {
            console.log("404 Error here");
          }

          //Display objectinfo
          const painting = document.querySelector('#imageHolderTag');
          painting.src = data.primaryImage;
          painting.style.width = '70%';

          const artistName = document.querySelector('#artistName');
          artistName.textContent = data.constituents[0].name;

          const lifespan = document.querySelector('#lifespan');
          lifespan.textContent = "Born: " + data.artistBeginDate + " -  Passed: " + data.artistEndDate;

          const nationality = document.querySelector('#nationality');
          nationality.textContent = "Nationality: " + data.artistNationality;

          const typeOfPainting = document.querySelector('#typeOfPainting');
          typeOfPainting.textContent = "Medium: " + data.medium;

          const infoURL = document.querySelector('#infoURL');
          infoURL.innerHTML = "<a href='" + data.objectURL + "'>Additional info..</a>";


        })

    })

}


//User-search section

let keyword = "";

addEventListener('DOMContentLoaded', () => {
  keyword = "Snake";
  fetchData(i);
})


let searchField = document.querySelector('#searchField');

//Update value of keyword variable using input on the searchfield
searchField.addEventListener('input', () => {
  keyword = searchField.value;
  console.log(keyword);
})

document.querySelector('#searchButton').addEventListener('click', () => {
  keyword = searchField.value;
  fetchData(n);
})

const fetchObjects = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';

const userPreviousButton = document.querySelector('#userPreviousBtn');
const userNextButton = document.querySelector('#userNextBtn');
const userRandomButton = document.querySelector('#userRandomBtn');

//Set starting index, n is used for iterating in an array
let n = 0;

//Iterate back to previous objectID
userPreviousButton.addEventListener('click', () => {
  if (n > 0) {
    n--;
    fetchData(n);

  }
})

//Iterate to next objectID
userNextButton.addEventListener('click', () => {
  n++;
  fetchData(n);

})

//Random button that outputs a random objectID available from user keyword
userRandomButton.addEventListener('click', () => {
  //Fetch array.length to use as roof for randombutton
  fetch(fetchObjects + keyword)
    .then((res) => res.json())
    .then((data) => {
      let objectIDsLength = data.objectIDs.length;
      console.log(objectIDsLength);
      n = Math.floor(Math.random() * objectIDsLength);
      console.log(n);
      fetchData(n);
    })

})


function fetchData(num) {
  fetch(fetchObjects + keyword)
    .then((res) => res.json())
    .then((data) => {

      //Collect ID-number to use and look at specific data in the second fetch
      let objID = data.objectIDs[num];

      //Fetch specific objectID
      fetch(objectsUrl + objID)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.objectID);
          //Temporary fix for mitigating empty primaryImage objects
          if (data.primaryImage === '' || data.message === "Not a valid object") {
            console.log('no image');
            num++;
            fetchData(num);
          } else {
            console.log(data.objectID);
            const displayImageTag = document.querySelector('#displayImageTag');
            displayImageTag.src = data.primaryImage;
            displayImageTag.style.width = '70%';
          }
          //Display data info
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
