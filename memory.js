const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

for (let i = 0; i < 24; i++) {
  const div = document.createElement('div');
  div.classList.add('box');
  document.getElementById('container').appendChild(div);

  const img = document.createElement('img');
  img.classList.add('image');
  document.querySelectorAll('.box')[i].appendChild(img);

  const box = document.querySelectorAll('.box')[i];

  box.style.backgroundColor = 'Pink';
  box.style.height = '120px';
  box.style.width = '120px';
}

const idArray = [436526, 438722, 437998, 336327, 436527, 436531, 436530, 436532,
  436529, 436528, 436535, 437984, 436526, 438722, 437998, 336327, 436527, 436531,
  436530, 436532, 436529, 436528, 436535, 437984];

//Shuffle array
const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let value = array[i];
    array[i] = array[j];
    array[j] = value;
  };
  return array; //undefined
};


const shuffledArray = shuffle(idArray);
console.log(shuffledArray);

const getImages = async () => {
  for (let i = 0; i < 24; i++) {
    const response = await fetch(url + shuffledArray[i]);
    const data = await response.json();
    document.querySelectorAll('.image')[i].style.height = '120px';
    document.querySelectorAll('.image')[i].style.width = '120px';
    document.querySelectorAll('.image')[i].src = data.primaryImageSmall;
  }

}
getImages();

//Create img tags and append them to each box, then add images using style.src = primaryImageSmall

//create a function that shuffles the array before its used to gather images

//container.addeventlistener click, if e.target === roses && e.target === roses etc.....
