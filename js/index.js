// fetch all data from api

const fetchAllDataFromApi = (showall, sortdate) => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => showElementsToUi(data.data.tools, showall, sortdate));
};

const showElementsToUi = (aitools, showall, sortdate) => {
  const uiArea = document.getElementById('uiarea-for-ai');
  uiArea.innerHTML = '';
  // see more functionality
  if (!showall) {
    aitools.splice(6);
  } else {
    const seeMoreBtn = document.getElementById('see-more-btn');
    seeMoreBtn.classList.add('d-none');
  }
  if (sortdate === true) {
    sortByDate(aitools);
  }
  aitools.forEach(aitool => {
    const createCol = document.createElement('div');
    createCol.classList.add('col');
    let li = '';
    // creating dynamic features
    aitool.features.forEach(elm => {
      li += `<li>${elm}</li>`;
    });
    createCol.innerHTML = `
    <div class="card">
    <img src="${aitool.image}" class="card-img-top p-3 card-image-hight" alt="..." />
    <div class="card-body">
      <h5 class="card-title fs-3">Features</h5>
      <ol class="text-secondary">
        ${li}
      </ol>
      <hr class="mb-4" />
      <div class="row row-cols-2">
        <div class="col">
          <h4>${aitool.name}</h4>
          <div class="d-flex align-items-center text-secondary">
            <i class="fa-solid fa-calendar-days"></i>
            <p class="ms-1 my-auto">${aitool.published_in}</p>
          </div>
        </div>
        <div
          class="col d-flex justify-content-end align-items-center" data-bs-toggle="modal" data-bs-target="#AiModal" onclick="modalIdFetch('${aitool.id}')"
        >
          <div
            class="btn-arrow d-flex align-items-center justify-content-center"
          >
            <i class="fa-solid fa-arrow-right text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  </div> 
    
    `;
    uiArea.appendChild(createCol);
    loadingFunction(false);
  });
};

let allItem = false;
// see all item function
const seeAllItem = () => {
  loadingFunction(true);
  allItem = true;
  fetchAllDataFromApi(allItem, false);
};
// sort item to ui
const sortDataToUi = () => {
  loadingFunction(true);
  fetchAllDataFromApi(allItem, true);
};
const sortByDate = aitools => {
  aitools.sort((a, b) => {
    return new Date(a.published_in) - new Date(b.published_in);
  });
};
// loading function
const loadingFunction = state => {
  const loadingIcon = document.getElementById('loading');
  if (state === true) {
    loadingIcon.classList.remove('d-none');
  } else {
    loadingIcon.classList.add('d-none');
  }
};
fetchAllDataFromApi();
loadingFunction(true);
//home page coding ended
// modal coding started
const modalIdFetch = id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showModalToUi(data.data));
};
const showModalToUi = data => {
  const selectModal = document.getElementById('modal-ui');
  selectModal.innerHTML = '';
  const createFirstCol = document.createElement('div');
  createFirstCol.classList.add('col');
  console.log(data);

  // set dynamic features element
  let features = '';
  for (elm in data.features) {
    features += `<li>${data.features[elm].feature_name}</li>`;
  }
  // set dynamic Integrations
  let integrations = '';
  if (data.integrations !== null) {
    data.integrations.forEach(element => {
      integrations += `<li>${element}</li>`;
    });
  } else {
    integrations = 'No data Found';
  }
  createFirstCol.innerHTML = `
  
  
  <div class="card modal-card-1">
  <div class="card-body">
    <h3 class="mb-4">${data.description}
    </h3>
    <div class="d-flex mb-4 mt-5 flex-column flex-md-row">
      <div class="card-1-info p-2 mx-3 text-success">
        <h4>${data.pricing !== null ? data.pricing[0].price : 'free of cost'} ${
    data.pricing !== null ? data.pricing[0].plan : '/basic'
  }</h4>
      </div>
      <div class="card-1-info p-2  my-2 mx-3 mx-md-0 text-warning">
      <h4>${data.pricing !== null ? data.pricing[1].price : 'free of cost'} ${
    data.pricing !== null ? data.pricing[1].plan : '/Pro'
  }</h4>
      </div>
      <div class="card-1-info p-2 mx-3 text-danger">
      <h4>${data.pricing !== null ? data.pricing[2].price : 'free of cost'} ${
    data.pricing !== null ? data.pricing[2].plan : '/Enterprise'
  }</h4>
      </div>
    </div>
    <div class="d-flex mt-5 flex-column flex-md-row"">
      <div>
        <h3>Features</h3>
        <ul class="text-secondary">
          ${features}
        </ul>
      </div>
      <div class="ms-md-5">
        <h3>Integrations</h3>
        <ul class="text-secondary">
          ${integrations}
        </ul>
      </div>
    </div>
  </div>
</div>
  
  `;
  selectModal.appendChild(createFirstCol);

  // modal section 2 start here
  const createSecondCol = document.createElement('div');
  createSecondCol.classList.add('col');
  createSecondCol.innerHTML = `
  
  <div class="card modal-card-2">
    <div class="card-body">
        <div class="text-center position-relative mb-5">
            <img class="img-fluid" src="${data.image_link[0]}" alt="" />
              <p class="text-white position-absolute" id="accuracy">
                ${data.accuracy.score * 100}% accuracy
              </p>
              <h1 class="mt-4" id="input-example">Can you give any example?</h1>
              <p class="mt-2 text-secondary" id="output-example">
                No! Not Yet! Take a break!!!
              </p>
        </div>
      </div>
  </div>
  
  `;
  selectModal.appendChild(createSecondCol);

  // set accuracy to ui
  const accuracySection = document.getElementById('accuracy');
  if (data.accuracy.score === null) {
    accuracySection.classList.add('d-none');
  }
  // set input and output examples to ui
  const inputExample = document.getElementById('input-example');
  const outputExample = document.getElementById('output-example');
  if (data.input_output_examples !== null) {
    inputExample.innerHTML = data.input_output_examples[0].input;
    outputExample.innerHTML = data.input_output_examples[0].output;
  }
};
