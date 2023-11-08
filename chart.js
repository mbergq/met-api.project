
const ctx = document.getElementById('myChart');

//Fetch block

addEventListener('DOMContentLoaded', () => {
  fetch('https://mhw-db.com/monsters')
    .then((res) => res.json())
    .then((data) => {

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


        //Count where monsters most often occur
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
})

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
