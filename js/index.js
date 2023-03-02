// fetch all data from api
const fetchAllDataFromApi = () => {
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => showElementsToUi(data.data.tools));
};

const showElementsToUi = aitools => {};

fetchAllDataFromApi();
