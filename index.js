import { pintarCheckbox, renderCards, filterCards } from "./module/functions.js";

let card = document.getElementById("box-cards");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {

    //carga de checkboxes y categorias
    const checkboxesdiv = document.getElementById('search');
    const categories = data.events.map(event => event.category);
    const categoriesSinRepetidos = new Set(categories);
    const arrayCategoriesSinRepetidos = Array.from(categoriesSinRepetidos);
    pintarCheckbox(arrayCategoriesSinRepetidos, checkboxesdiv);

    //carga de los eventos
    renderCards(data.events, card);

    //declaraciones para los filtros
    const selectedCategories = [];
    let searchInput = document.getElementById("search-input");
    const checkboxes = checkboxesdiv.querySelectorAll('input[type="checkbox"]');

    //filtros
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        selectedCategories.length = 0; // Vaciar el arreglo antes de cada filtrado
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedCategories.push(checkbox.labels[0].innerText.toLowerCase());
          }
        });
        const searchInput = document.getElementById("search-input").value.toLowerCase().trim();
        filterCards(data.events, selectedCategories, searchInput, card);
      });
    });
    
    searchInput.addEventListener("keyup", () => {
      const searchQuery = searchInput.value.toLowerCase().trim();
      filterCards(data.events, selectedCategories, searchQuery, card);
    });
  })
  .catch((error) => console.error(error));
