//URL to use with ID-nums of the array
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

const generateCardsButton = document.querySelector('#generateCardsButton');

//Array of ID's that has images
const idArray = [436526, 438722, 437998, 336327, 436527, 436531, 436530, 436532,
  436529, 436528, 436535, 437984, 436526, 438722, 437998, 336327, 436527, 436531,
  436530, 436532, 436529, 436528, 436535, 437984];

//Shuffle array function
const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let value = array[i];
    array[i] = array[j];
    array[j] = value;
  };
  return array;
}

//Shuffle the array to output cards in random order
const shuffledArray = shuffle(idArray);

//Set game states
let scoreCount = 0;
let cardCount = 24;

let activeCard = null;
let awaitingEndOfMove = false;

const generateCards = async () => {
  //Disable button to prevent user from generating while fetch is working
  generateCardsButton.disabled = true;

  //Clear cards before generating new ones
  clearCards();

  /* Setup loop before fetching since i want to fetch 24 different images
  by using my array as help to get correct ID's */
  for (let i = 0; i < 24; i++) {
    const response = await fetch(url + shuffledArray[i]);
    const data = await response.json();
    //Create img containers
    const div = document.createElement('div');
    div.classList.add('box');
    document.getElementById('container').appendChild(div);
    //Create image tags to be able to use src attribute for images later
    const img = document.createElement('img');
    img.classList.add('image');
    //Put img inside .box divs ie the containers
    document.querySelectorAll('.box')[i].appendChild(img);
    img.style.display = 'none';

    //Give img elements a picture using data from current index in the objectsID's
    document.querySelectorAll('.image')[i].src = data.primaryImageSmall;

    //Set attribute to elements to make them unique, needed to identify which card is chosen later
    //Also setting a state to "false" to be able to know if it has been clicked on or not
    document.querySelectorAll('.image')[i].setAttribute("data-name", data.objectID);
    document.querySelectorAll('.image')[i].setAttribute("data-revealed", "false");

    document.querySelectorAll('.box')[i].setAttribute("data-name", data.objectID);
    document.querySelectorAll('.box')[i].setAttribute("data-revealed", "false");

    //Add eventlisteners to each card + run "gamecheck" functions when a card is clicked
    document.querySelectorAll('.box')[i].addEventListener('click', (e) => {

      const revealed = img.getAttribute('data-revealed');
      //Checks to prevent code from executing if any of the statements below return true
      if (awaitingEndOfMove || revealed === 'true' || img === activeCard) {
        return;
      }
      //Reveal clicked card
      img.style.display = 'block';
      //Set current card to active unless there is another card active
      if (!activeCard) {
        activeCard = img;
        return;
      }

      //Get object ID from active card to use for check later
      const cardToMatch = activeCard.getAttribute('data-name');

      //Matching cards check
      if (cardToMatch === e.target.dataset.name) {
        /* Set cards to "revealed", this state is needed to prevent user from running
        gamechecks upon already revealed cards which in turn causes bugs */
        activeCard.setAttribute('data-revealed', 'true');
        img.setAttribute('data-revealed', 'true');

        awaitingEndOfMove = false;
        activeCard = null;
        scoreCount += 2;

        if (scoreCount === cardCount) {
          document.querySelector('#gameStateHeader').textContent =
            'You won! Good job. Press start to play a new game';
          document.querySelector('#gameStateHeader').style.display = 'block';
        }

        return;
      }

      //Set timeout function to hide cards again after 1 sec, if cards do not match
      awaitingEndOfMove = true;
      setTimeout(() => {
        img.style.display = 'none';
        activeCard.style.display = 'none';

        //Clear activecard and exit awaitingEndOfMove state
        awaitingEndOfMove = false;
        activeCard = null;
      }, 1000)




    });

  }
  //Enable button again after fetch is done / cards are generated
  generateCardsButton.disabled = false;
  document.querySelector('#gameStateHeader').style.display = 'block';
  document.querySelector('#gameStateHeader').textContent = 'Cards are set!';

}

generateCardsButton.addEventListener('click', () => {
  generateCards();
  document.querySelector('#gameStateHeader').style.display = 'none';
})
//Function that clears existing cards in the container, will run before generateCards function runs
function clearCards() {
  const container = document.getElementById('container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
