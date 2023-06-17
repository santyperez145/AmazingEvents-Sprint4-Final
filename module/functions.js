const checkboxesdiv = document.getElementById('search')


// Funcion para crear un checkbox con una categoria dada
export function crearCheck(category) {
    const div = document.createElement('DIV') 
  
    const input = document.createElement('INPUT') 
    input.type = "checkbox"
    input.className = "form-check-input"
    input.value = category
    input.id = `${category}-check`
    input.name = "category"
  
    const label = document.createElement('LABEL')
    label.className = "form-check-label"
    label.setAttribute('for', `${category}-check`)
    label.textContent = category
  
    div.appendChild(input)
    div.appendChild(label)
  
    return div 
  }
  
  // Funcion para agregar los checkboxes al DOM
export function pintarCheckbox(categories, elemento) {
    const fragment = document.createDocumentFragment()
  
    for (const category of categories) {
      const div = crearCheck(category)
      fragment.appendChild(div)
    }
  
    elemento.appendChild(fragment)
  }
  
  // Funcion para crear el HTML de una tarjeta de evento
export function createCards(event) {
    return `<div class="card" style="width: 16rem;">
            <img class="img-box" src="${event.image}" class="card-img-top" alt="${event.name}">
              <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <h6>Date: ${event.date}</h6>
                <div class="price-div">
                  <h5>$${event.price}</h5>
                  <a href="details.html?id=${event._id}" class="btn btn-primary">More Details</a>
                </div>
              </div>
            </div>`;
  }
  
  // renderizo las tarjetas de eventos en el div box-cards
  export function renderCards(events, card) {
    card.innerHTML = '';
    let template = "";
    for (let event of events) {
      template += createCards(event);
    }
    card.innerHTML = template;
  }
  
  
  
  // Funcion para filtrar los eventos segun las categorias seleccionadas y la busqueda
  export function filterCards(array, selectedCategories, searchQuery, card) {
    const filteredEvents = array.filter((event) => {
      const categoryNameMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category.toLowerCase());
      const nameMatch = event.name.toLowerCase().includes(searchQuery);
      const descriptionMatch = event.description.toLowerCase().includes(searchQuery);
      return categoryNameMatch && (nameMatch || descriptionMatch);
    });
    renderCards(filteredEvents, card);

    const noResultsMessage = document.getElementById("no-results-message");
    if (filteredEvents.length === 0) {
      noResultsMessage.style.display = "block";
    } else {
      noResultsMessage.style.display = "none";
    }
  }


//details

// Funcion para renderizar los detalles

export function renderDetails(object, card){

  card.innerHTML = `<div class="card" style="width: 30rem;">
<img src="${object.image}" class="card-img-top" alt="${object.name}">
  <div class="card-body">
    <h5 class="card-title">${object.name}</h5>
    <p class="card-text">${object.description}</p>
    <h6>Category: ${object.category}</h6>
    <h6>Place: ${object.place}</h6>
    <h6>Capacity: ${object.capacity}</h6>
    <h6>Date: ${object.date}</h6>
    <h5>Price: $${object.price}</h5>
  </div>
</div>`
}



//stats

// Función para filtrar la capacidad
export function filteredCapacity(events) {
  return events.sort((a, b) => a.capacity - b.capacity);
}

// Función para filtrar la asistencia y el porcentaje de asistencia
export function filteredAssistanceAndPercentage(events) {
  return events
    .filter(event => event.assistance)
    .map(event => ({
      event: event.name,
      percentage: (event.assistance * 100 / event.capacity).toFixed(2)
    }))
    .sort((a, b) => a.percentage - b.percentage);
}

// Función para filtrar las ganancias
export function filteredRevenues(arrayA, arrayB) {
  return arrayA.map(category => {
    const categ = arrayB.filter(event => event.category === category);
    const revenues = categ.reduce((accumulator, event) => {
      const attendance = event.assistance || event.estimate;
      return accumulator + (attendance * event.price);
    }, 0);
    const percentages = (
      categ.reduce((accumulator, event) => {
        const attendance = event.assistance || event.estimate;
        return accumulator + (attendance * 100 / event.capacity);
      }, 0) / categ.length
    ).toFixed(2);
    return {
      category: category,
      revenue: revenues,
      percentage: percentages
    };
  });
}

// Función para crear la primera tabla
export function renderTable1(arrayA, arrayB, table) {
  const highPercent = arrayA[arrayA.length - 1];
  const lowPercent = arrayA[0];
  const highCapacity = arrayB[arrayB.length - 1];
  
  table.innerHTML = `
    <th colspan="3">Event statistics</th>
    <tr> 
      <td>Events with the highest Percentage of attendance</td>
      <td>Events with the lowest Percentage of attendance</td>
      <td>Event with larger capacity</td>
    </tr>
    <tr>
      <td>${highPercent.event} ${highPercent.percentage}%</td>
      <td>${lowPercent.event} ${lowPercent.percentage}%</td>
      <td>${highCapacity.name} ${highCapacity.capacity.toLocaleString()}</td>
    </tr>
  `;
}

// Función para crear las otras tablas
export function renderTables2(array, element) {
  const rows = array.map(event => `
    <tr>
      <td>${event.category}</td>
      <td>$ ${event.revenue.toLocaleString()}</td>
      <td>${event.percentage}%</td>
    </tr>
  `);
  
  element.innerHTML = rows.join('');
}