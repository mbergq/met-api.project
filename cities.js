addEventListener('DOMContentLoaded', () => {
  fetch('https://avancera.app/cities/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //Create elements with data from API
      for (let i = 0; i < data.length; i++) {
        //Create containers for data info
        let div = document.createElement('div');
        div.classList.add('dataContainer');
        document.getElementById('container').appendChild(div);

        //Append data info to containers
        let name = document.createElement('p');
        let population = document.createElement('p');

        name.textContent = data[i].name;
        population.textContent = data[i].population;

        document.querySelectorAll('.dataContainer')[i].appendChild(name);
        document.querySelectorAll('.dataContainer')[i].appendChild(population);

      }

    })
})

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //Get value of first field
  const getNameValue = document.querySelector('#cityName').value;
  //Get value from second inputfield and convert it to a number
  let getPopulationValue = document.querySelector('#population').value * 1;


  console.log(getPopulationValue);

  //Put values into an object
  const data = {
    name: getNameValue,
    population: getPopulationValue
  }


  fetch('https://avancera.app/cities/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //Convert our JavaScript value into JSON value before posting
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => console.log(data))
})
