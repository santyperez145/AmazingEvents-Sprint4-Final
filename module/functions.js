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

// Funcion para filtrar la capacidad
export function filteredCapacity(events){
  return events.sort( (a,b) => a.capacity - b.capacity)
}

// Funcion para filtrar la asistencia
export function filteredAssistance(events) {
  let eventsAssistance = events.filter(event => event.assistance)
  let eventsAssistanceSort = [...eventsAssistance].sort((a, b) => a.assistance - b.assistance)
  return eventsAssistanceSort
}


// Funcion para filtrar el porcentaje de la asistencia
export function filteredPercentageAssistance(events){
  let result = []
  events.map( event => {
       let arrayEvents = {
            event: event.name,
            percentage: ( event.assistance * 100 / event.capacity ).toFixed(2)
       }
  result.push(arrayEvents)
  }) 
  return result.sort( (a,b) => a.percentage - b.percentage)
}

// Funcion para filtrar las ganancias
export function filteredRevenues (arrayA, arrayB){
  let eventsRevenues = []
  for( let categories of arrayA){
       let categ = arrayB.filter( event => event.category === categories)
       let revenues = categ.reduce( (acumulador, event) => acumulador + (event.assistance? event.assistance * event.price : event.estimate * event.price), 0)
       let percentages = (categ.reduce( (acumulador, event) => acumulador + ( (event.assistance? event.assistance * 100 / event.capacity : event.estimate * 100 / event.capacity) ), 0) / categ.length).toFixed(2)
       eventsRevenues.push( {
            category: `${categories}`,
            revenue: revenues,
            percentage: percentages
       })
  }
  return eventsRevenues
}

// Funcion para crear la primer tabla
export function renderTable1(arrayA, arrayB) {
  let HighPercent = arrayA.pop()
  let LowPercent = arrayA.shift()
  let HighCapacity = arrayB.pop()
  table1.innerHTML = `
  <th colspan="3">Event statistics</th>
  <tr> 
       <td>Events with the highest Percentage of attendance</td>
       <td>Events with the lowest Percentage of attendance</td>
       <td>Event with larger capacity</td>
  </tr>
  <tr>
       <td>${HighPercent.event} ${HighPercent.percentage}%</td>
       <td>${LowPercent.event} ${LowPercent.percentage}%</td>
       <td>${HighCapacity.name} ${(HighCapacity.capacity).toLocaleString()}</td>
  </tr>
  `
}


// Funcion para crear las otras tablas
export function renderTables2(array,element){
  array.forEach(event => {
       element.innerHTML += `
       <tr>
            <td>${event.category}</td>
            <td>$ ${(event.revenue).toLocaleString()}</td>
            <td>${event.percentage}%</td>
       </tr>
       `
  });
}
    
