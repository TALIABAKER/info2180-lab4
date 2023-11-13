// Ensure that the window loads before executing code
window.addEventListener('load', function () {
  const searchButton = document.getElementById('search');
  searchButton.addEventListener('click', loadPHP);
});

/**
* @param {object|string} data 
*/
function displayHeroes(data) {
  const result = document.getElementById('result');


  removeErrorClass(result);

  if (typeof data === 'string') {
      // If the data doesn't contain a hero or is empty
      insertErrorClass(data, result);
      result.innerHTML = data;
  } else {
      displayHeroData(data, result);
  }
}

/**
* @param {string} data The hero not found message
* @param {HTMLElement} targetDiv The div the class is being added to
*/
function insertErrorClass(data, targetDiv) {
  if (data.toLowerCase().includes('hero not found')) {
      targetDiv.classList.add('error');
  }
}

/**
* @param {HTMLElement} targetDiv
*/
function removeErrorClass(targetDiv) {
  targetDiv.classList.remove('error');
}

/**
* Fetches data based on the input entered in the form
* @param {string} formData The data entered in the form
* @returns {Promise<string>} The response 
*/
async function fetchData(formData) {
  const response = await fetch(`superheroes.php?query=${formData}`);

  if (!response.ok) {
      throw new Error(`An error has occurred: ${response.status}`);
  }

  // Returns the response 
  return response.text();
}

/**
* Retrieve data from the server after a query is made to the form
* @param {Event} event
*/
async function loadPHP(event) {
  event.preventDefault();
  const form = document.getElementById('superhero');

  try {
      const phpData = await fetchData(form.value);
      const processedData = handleJSON(phpData);
      console.log(processedData);
      displayHeroes(processedData);
  } catch (error) {
      console.log('There was an error: ' + error);
  }
}

/**
* @param {string} data
* @returns {object|string} 
*/
function handleJSON(data) {
  try {
      return JSON.parse(data);
  } catch (error) {
      return data;
  }
}
