// fetch all data from api
const fetchAllDataFromApi = () => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => showElementsToUi(data.data.tools));
};

const showElementsToUi = aitools => {
  const uiArea = document.getElementById('uiarea-for-ai');
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
            <p class="ms-1 my-auto">11/01/2022</p>
          </div>
        </div>
        <div
          class="col d-flex justify-content-end align-items-center"
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
  });
};

fetchAllDataFromApi();
