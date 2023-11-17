//URL to fetch all IDnumbers related to the searchquery
const arrayOfIds = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van Gogh'
//URL used in conjunction with an specific IDnumber to gather data such as images and other info
const searchPath = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'


const loader = document.querySelector('.la-ball-spin-clockwise-fade-rotating');
//Buttons
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const randomButton = document.querySelector('#random');

//Disable/Enable buttons for topsection
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

//Prepare no image message
const imageWrapper = document.querySelector('#imageWrapper');
const noImageMessage = document.createElement('h3');
noImageMessage.classList.add('noImageMessage');
noImageMessage.textContent =
  "Sorry, there's no image available for this object. However there might still be something interesting to find if you use the 'Additional info' link, otherwise just proceed by using the buttons";
imageWrapper.appendChild(noImageMessage);
noImageMessage.style.display = 'none';

//Collect value from storage and convert it to number
let indexValueFromStorage = parseInt(localStorage.getItem("currentIndex"));

//Fetch data and put it in localstorage
const getData = async (index) => {
  //Display loader
  loader.style.display = 'block';

  const response = await fetch(arrayOfIds);
  const data = await response.json();
  //Collect specific ID using arrayfunction and index-parameter
  let specificID = data.objectIDs[index];

  //Second fetch to get further data on current ID
  const objectResponse = await fetch(searchPath + specificID);
  const objectData = await objectResponse.json();
  localStorage.setItem("currentIndex", index);
  localStorage.setItem("info", JSON.stringify(objectData));

  return objectData;
}


const displayData = async () => {

  let objectData;
  objectData = await getData(indexValueFromStorage);
  //Hide loader when fetch is done
  loader.style.display = 'none';
  updateButtonsState();

  //Handle no image error
  if (objectData.primaryImage === '' || objectData.message === "Not a valid object") {
    noImageMessage.style.display = 'block';
  } else {
    noImageMessage.style.display = 'none';
  }

  //Display information
  const painting = document.querySelector('#imageHolderTag');
  painting.src = objectData.primaryImage;

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
  getData(indexValueFromStorage);
  displayData()
})


/*                        User-search section                                 */

//Prepare searchpath to be used in fetch in conjunction with a searchword
const searchOnWordPath = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
//Button selectors
const userPreviousButton = document.querySelector('#userPreviousBtn');
const userNextButton = document.querySelector('#userNextBtn');
const userRandomButton = document.querySelector('#userRandomBtn');

let keyword = "";
let n = 0;

let searchField = document.querySelector('#searchField');

//Update value of keyword variable using input on the searchfield
searchField.addEventListener('input', () => {
  keyword = searchField.value;
})

document.querySelector('#searchButton').addEventListener('click', () => {
  keyword = searchField.value;
  fetchData(n);
  clearSearchField();
})
//Let user search upon pressing "Enter" in the searchfield
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
  fetch(searchOnWordPath + keyword)
    .then((res) => res.json())
    .then((data) => {
      let objectIDsLength = data.objectIDs.length;
      console.log(objectIDsLength);
      n = Math.floor(Math.random() * objectIDsLength);
      console.log(n);
      fetchData(n);
    })

})

//Prepare errormessage
const userDisplayImageWrapper = document.querySelector('#userDisplayImageWrapper');
const userNoimageMessage = document.createElement('h3');
userNoimageMessage.classList.add('userNoImageMessage');
userNoimageMessage.textContent =
  "Sorry, there's no image available for this object. However there might still be something interesting to find if you use the 'Additional info' link, otherwise just proceed by using the buttons or search for something new";
userDisplayImageWrapper.appendChild(userNoimageMessage);
userNoimageMessage.style.display = 'none';

function fetchData(num) {
  //Fetch via keyword query that user inputs
  fetch(searchOnWordPath + keyword)
    .then((res) => res.json())
    .then((data) => {

      //Display how many objects there is available on current searchword
      let searchQueryInfo = document.querySelector('#searchQueryInfo');
      searchQueryInfo.textContent = "There is a total of " + data.total + " objects available on this keyword for you to look at";

      let objID = data.objectIDs[num];


      fetch(searchPath + objID)
        .then((res) => res.json())
        .then((data) => {

          //Handle no image error
          if (data.primaryImage === '' || data.message === "Not a valid object") {
            userNoimageMessage.style.display = 'block';
          } else {
            userNoimageMessage.style.display = 'none';
          }

          //Display info
          const displayImageTag = document.querySelector('#displayImageTag');
          displayImageTag.src = data.primaryImage;

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
