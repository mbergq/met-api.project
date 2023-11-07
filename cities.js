addEventListener('DOMContentLoaded', () => {
  fetch('https://avancera.app/cities/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //Create elements with data from API
      for (let i = 0; i < data.length; i++) {
        //Create containers for data info
        const div = document.createElement('div');
        div.classList.add('dataContainer');
        document.getElementById('container').appendChild(div);

        //Append data info to containers
        const name = document.createElement('h3');
        const population = document.createElement('p');
        const id = document.createElement('p');

        name.textContent = data[i].name;
        population.textContent = "Population: " + data[i].population;
        id.textContent = "Id: " + data[i].id;

        document.querySelectorAll('.dataContainer')[i].appendChild(name);
        document.querySelectorAll('.dataContainer')[i].appendChild(population);
        document.querySelectorAll('.dataContainer')[i].appendChild(id);

      }

    })
})

//POST function
const putForm = document.querySelector('#postForm');

putForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Get value of first field
  const getNameValueToPost = document.querySelector('#cityNamePOST').value;
  //Get value from second inputfield and convert it to a number
  const getPopulationValue = document.querySelector('#populationPOST').value * 1;


  //Put values into an object
  const postData = {
    name: getNameValueToPost,
    population: getPopulationValue
  }


  fetch('https://avancera.app/cities/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //Convert our JavaScript value into JSON value before posting
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(data => console.log(data))
})

//PUT function
const postForm = document.querySelector('#putForm');

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const getNameValueToPut = document.querySelector('#cityNamePUT').value;

  const getPopulationValueToPut = document.querySelector('#populationPUT').value * 1;

  const getCityIdToPut = document.querySelector('#cityIdPUT').value;

  console.log(getCityIdToPut);

  const putData = {
    id: getCityIdToPut,
    name: getNameValueToPut,
    population: getPopulationValueToPut
  }

  fetch('https://avancera.app/cities/' + `${getCityIdToPut}`, {
    body: JSON.stringify(putData),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  })
    .then(res => console.log(res));
})

//DELETE function
const deleteForm = document.querySelector('#deleteForm');

deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const getCityIdToDelete = document.querySelector('#delete').value;

  fetch('https://avancera.app/cities/' + `${getCityIdToDelete}`, {
    method: 'DELETE'
  }).then(res => console.log(res));

})
