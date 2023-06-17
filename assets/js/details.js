import { renderDetails } from "../../module/functions.js";



let card = document.getElementById("details-div"); 

const params = new URLSearchParams(location.search)

const id = params.get('id')



fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    const eventFinded = data.events.find(event => event._id == id);
      renderDetails(eventFinded, card);
    })
  .catch(error => console.error(error));