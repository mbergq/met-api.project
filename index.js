let vanGoghUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Vincent Van Gogh'
let objectsUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

let i = 0;

//Code to iterate back to "previous" image, upon click we decrement the value / go back to previous image.
document.querySelector('#previous').addEventListener('click', () => {
  if (i > 0) {
    i--;
    displayImage(i);//this calls the function below and updates its "index" value of i
  }
})
//Code to iterate to "next" image, this value is added to the array i fetch in function below.
document.querySelector('#next').addEventListener('click', () => {
  i++;
  displayImage(i);//this calls the function below and updates its "index" value of i
})

/* First i fetch ID's of all Vincent Van Gogh artwork available from the api, then i use those ID's to
fetch unique objects where i then can access the image and display them */
function displayImage(index) {
  fetch(vanGoghUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.objectIDs[index]);
      const vgID = data.objectIDs[index];
      fetch(objectsUrl + vgID)
        .then((res) => res.json())
        .then((data) => {
          if (data.primaryImage === "") {
            console.log("No img available"); //TODO: Use this if statement to display something when this happens
          }
          if (data.message === "Not a valid object") { //TODO: Use this if statement to display something when this happens
            console.log("404 Error here");
          }
          let painting = document.querySelector('#imageHolderTag');
          painting.src = data.primaryImage;
          painting.style.width = '70%';
        })
        .catch((error) => console.error("Error fetching object details:", error));
    })
    .catch((error) => console.error("Error fetching Van Gogh data:", error));
}
