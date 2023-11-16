
//Fetch data function
async function fetchData() {
  const url = 'https://mhw-db.com/monsters';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Use fetched data
const monsterArray = fetchData().then(data => {

  //Declare variables to later count species
  let herbivore = 0;
  let fangedWyvern = 0;
  let wingdrake = 0;
  let neopteron = 0;
  let fish = 0;
  let birdWyvern = 0;
  let bruteWyvern = 0;
  let piscineWyvern = 0;
  let flyingWyvern = 0;
  let elderDragon = 0;
  let relict = 0;
  let fangedBeast = 0;

  for (let i = 0; i < data.length; i++) {
    //Count species
    switch (data[i].species) {

      case "herbivore":
        herbivore++;
        break;
      case "fanged wyvern":
        fangedWyvern++;
        break;
      case "wingdrake":
        wingdrake++;
        break;
      case "neopteron":
        neopteron++;
        break;
      case "fish":
        fish++;
        break;
      case "bird wyvern":
        birdWyvern++;
        break;
      case "brute wyvern":
        bruteWyvern++;
        break;
      case "piscine wyvern":
        piscineWyvern++;
        break;
      case "flying wyvern":
        flyingWyvern++;
        break;
      case "elder dragon":
        elderDragon++;
        break;
      case "relict":
        relict++;
        break;
      case "fanged beast":
        fangedBeast++
        break;

    }

  }
  //Setup random numbers to use for rgb colors
  const randomRgbColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };
  let setRandomColor = [];

  //Put values of the variables in an array
  let specieValues = [
    herbivore,
    fangedWyvern,
    wingdrake,
    neopteron,
    fish,
    birdWyvern,
    bruteWyvern,
    piscineWyvern,
    flyingWyvern,
    elderDragon,
    relict,
    fangedBeast];
  console.log(specieValues.length);

  for (let i = 0; i < specieValues.length; i++) {
    setRandomColor.push(randomRgbColor());
  }

  //Get all specienames
  let specieLabels = data.map(index => index.species)
  //Filter out duplicate names and put them into an array
  specieLabels = [... new Set(specieLabels)];

  const monstersChart = new Chart("monstersChart", {
    type: "bar",
    data: {
      labels: specieLabels,
      datasets: [{
        label: "Amount of monsters in this category",
        backgroundColor: setRandomColor,
        data: specieValues
      }],
      options: {}
    }
  });

});
