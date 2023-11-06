addEventListener('DOMContentLoaded', () => {
  fetch('https://avancera.app/cities/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data.length);
      console.log(document.querySelectorAll('.dataContainer')[3]);

      for (let i = 0; i < data.length; i++) {
        let name = document.createElement('p');
        let population = document.createElement('p');
        name.textContent = data[i].name;
        population.textContent = data[i].population;

        document.querySelectorAll('.dataContainer')[i].appendChild(name);
        document.querySelectorAll('.dataContainer')[i].appendChild(population);

      }

    })
})
