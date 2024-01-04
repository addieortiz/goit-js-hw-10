import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix';
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';

const selectBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loadEl = document.querySelector('.load');
const errorEl = document.querySelector('.error');

function breedSelection(data) {
  fetchBreeds(data)
    .then(data => {
      loadEl.classList.replace('loader', 'is-hidden');

      let markupOptions = data.map(({ name, id }) => {
        return `<option value='${id}'>${name}</option>`;
      });

      selectBreed.insertAdjacentHTML('beforeend', markupOptions);

      //   new SlimSelect({
      //     select: selectBreed,
      //   });

      selectBreed.classList.remove('is-hidden');
    })
    .catch(onError);
}

breedSelection();

function createMarkup(event) {
  loadEl.classList.replace('is-hidden', 'loader');
  selectBreed.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loadEl.classList.replace('loader', 'is-hidden');
      selectBreed.classList.remove('is-hidden');

      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];

      catInfo.innerHTML = `
        <img src="${url}" alt="${name}" width="400"/>
        <div class="box">
          <h2>${name}</h2>
          <p>${description}</p>
          <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
      `;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

selectBreed.addEventListener('change', createMarkup);

function onError() {
  //   selectBreed.classList.remove('is-hidden');
  //   errorEl.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
}
