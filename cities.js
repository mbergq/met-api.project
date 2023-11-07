addEventListener('DOMContentLoaded', () => {
  fetch('https://avancera.app/cities/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data.length);
      console.log(document.querySelectorAll('.dataContainer')[3]);

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

  const info = new FormData(form);
  console.log(info);

  fetch('https://avancera.app/cities/', {
    body: info,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => console.log(data))
})
