//URL to fetch object ID's that is mainly about or related to the artist Vincent van Gogh
const vanGoghUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van Gogh'

//Then i use this URL to to gather specific data about a specific objectID, the URL above only returns ID's that is available
const objectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const randomButton = document.querySelector('#random');

//Disable/Enable buttons
function updateButtonsState() {
  if (indexValueFromStorage > 0) {
    previousButton.disabled = false;
  } else {
    previousButton.disabled = true;
  }

  if (indexValueFromStorage === 423) {
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

//Set index value
let indexValueFromStorage = parseInt(localStorage.getItem("currentIndex"));
console.log(indexValueFromStorage);

const getData = async (index) => {
  const response = await fetch(vanGoghUrl);
  const data = await response.json();
  let vgID = data.objectIDs[index];

  const objectResponse = await fetch(objectsUrl + vgID);
  const objectData = await objectResponse.json();
  localStorage.setItem("currentIndex", index);
  localStorage.setItem("info", JSON.stringify(objectData));

  return objectData; //Return objectinfo
}

const displayData = async () => {

  let objectData;
  objectData = await getData(indexValueFromStorage);//Wait for function to return correct data and index
  updateButtonsState();

  let currentIndex = localStorage.getItem("currentIndex");
  console.log(objectData);
  const painting = document.querySelector('#imageHolderTag');
  painting.src = objectData.primaryImage;
  painting.style.width = '70%';

  const artistName = document.querySelector('#artistName');
  artistName.textContent = "Artist: " + objectData.constituents[0].name;

  const lifespan = document.querySelector('#lifespan');
  lifespan.textContent = "Born: " + objectData.artistBeginDate + " -  Passed: " + objectData.artistEndDate;

  const nationality = document.querySelector('#nationality');
  nationality.textContent = "Nationality: " + objectData.artistNationality;

  const typeOfPainting = document.querySelector('#typeOfPainting');
  typeOfPainting.textContent = "Medium: " + objectData.medium;

  const infoURL = document.querySelector('#infoURL');
  infoURL.innerHTML = "<a href='" + objectData.objectURL + "'>Additional info..</a>";

  const creditLine = document.querySelector('#creditLine');
  creditLine.textContent = "Credit line: " + objectData.creditLine;

}
displayData();//Call the function to display data on pageload

//Iterate back to previous object
previousButton.addEventListener('click', () => {
  if (indexValueFromStorage > 0) {
    indexValueFromStorage--;
    updateButtonsState();
    getData(indexValueFromStorage);
    displayData();
  }
})
//Iterate to next object
nextButton.addEventListener('click', () => {
  indexValueFromStorage++;
  updateButtonsState();
  getData(indexValueFromStorage);
  displayData()
})
//Random
randomButton.addEventListener('click', () => {
  indexValueFromStorage = Math.floor(Math.random() * 423);
  console.log(indexValueFromStorage);
  getData(indexValueFromStorage);
  displayData()
})


//User-search section
let i = 0;
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
  clearSearchField();
})
//Let user search upon pressing "Enter"
document.querySelector('#searchField').addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    keyword = searchField.value;
    fetchData(n);
    clearSearchField();
  }
})

//Clear searchfield
function clearSearchField() {
  searchField.value = null;
}

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
  //Fetch via keyword query that user inputs
  fetch(fetchObjects + keyword)
    .then((res) => res.json())
    .then((data) => {
      //Display how many objects there is available on current searchword
      let searchQueryInfo = document.querySelector('#searchQueryInfo');
      searchQueryInfo.textContent = "There is a total of " + data.total + " objects available on this searchquery for you to look at";
      //Collect ID-number to use and look at specific data in the second fetch
      let objID = data.objectIDs[num];

      //Fetch specific objectID
      fetch(objectsUrl + objID)
        .then((res) => res.json())
        .then((data) => {
          //Temporary fix for mitigating empty primaryImage objects
          if (data.primaryImage === '' || data.message === "Not a valid object") {
            console.log("Empty objects..");
          }

          const displayImageTag = document.querySelector('#displayImageTag');
          displayImageTag.src = data.primaryImage;
          displayImageTag.style.width = '70%';
          //Display data info
          const objectName = document.querySelector('#objectName');
          objectName.textContent = "Object: " + data.objectName;

          const objectTitle = document.querySelector('#objectTitle');
          objectTitle.textContent = "Title: " + data.title;

          const description = document.querySelector('#description');
          description.textContent = "Medium: " + data.medium;

          const objectDate = document.querySelector('#objectDate');
          objectDate.textContent = "Object date: " + data.objectDate;

          const readMoreLink = document.querySelector('#readMoreLink');
          readMoreLink.innerHTML = "<a href='" + data.objectURL + "'>Read more</a>";

          const searchCreditLine = document.querySelector('#searchCreditLine');
          searchCreditLine.textContent = "Credit line: " + data.creditLine;

        })
    })
}
