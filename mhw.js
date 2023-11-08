
//Fetch data function
async function fetchData() {
  const url = 'https://mhw-db.com/monsters';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Create an array of all monster names, this can be used as data-labels for a chart
const monsterArray = fetchData().then(data => {
  let arr;
  for (let i = 0; i < data.length; i++) {
    arr = data.map(index => index.name);
  }
  let yValues = [55, 20, 23];
  const monstersChart = new Chart("monstersChart", {
    type: "bar",
    data: {
      labels: arr,
      datasets: [{
        backgroundColor: ["Red"],
        data: yValues
      }],
      options: {}
    }
  });
  console.log(arr);

});

//Count
fetchData().then(data => {
  console.log(data.length);
  let ancientForest = 0;
  let wildspireWaste = 0;
  let coralHighlands = 0;
  let rottenVale = 0;
  let eldersRecess = 0;
  let cavernsOfElDorado = 0;
  let confluenceOfFates = 0;
  let secludedValley = 0;
  let guidingLands = 0;
  let hoarfrostReach = 0;
  for (let i = 0; i < data.length; i++) {

    //Count which location most monsters reside
    switch (data[i].locations[0].name) {

      case "Ancient Forest":
        ancientForest++;
        break;
      case "Wildspire Waste":
        wildspireWaste++;
        break;
      case "Coral Highlands":
        coralHighlands++;
        break;
      case "Rotten Vale":
        rottenVale++;
        break;
      case "Elder's Recess":
        eldersRecess++;
        break;
      case "Caverns of El Dorado":
        cavernsOfElDorado++;
        break;
      case "Confluence of Fates":
        confluenceOfFates++;
        break;
      case "Secluded Valley":
        secludedValley++;
        break;
      case "Guiding Lands":
        guidingLands++;
        break;
      case "Hoarfrost Reach":
        hoarfrostReach++;
        break;

    }

  }
  //Values to use and compare in chart
  console.log(ancientForest);
  console.log(wildspireWaste);
  console.log(coralHighlands);
  console.log(rottenVale);
  console.log(eldersRecess);
  console.log(cavernsOfElDorado);
  console.log(confluenceOfFates);
  console.log(secludedValley);
  console.log(guidingLands);
  console.log(hoarfrostReach);

})
