// Ensure that the window loads before executing code
window.addEventListener('load', function(){
  let searchButton = document.getElementById('search');
  searchButton.addEventListener('click', loadPHP);
});

/**
* 
* @param {*} heroData 
* @param {*} targetDiv 
*/
function displayHeroData(heroData, targetDiv){
  // Clear innerHTML if data is already there
  if(targetDiv.innerHTML !== ''){
      targetDiv.innerHTML = '';
  }
  // Create the necessary HTML elements if the data is not a string
  if(typeof(heroData) !== 'string'){
      let nameHeader = document.createElement('h3');
      let name = document.createTextNode(heroData.alias.toUpperCase());
      nameHeader.appendChild(name);
      targetDiv.appendChild(nameHeader);
      let aliasHeader = document.createElement('h4');
      let alias = document.createTextNode(`A.K.A ${heroData.name}`.toUpperCase());
      aliasHeader.appendChild(alias);
      targetDiv.appendChild(aliasHeader);
      let biographyArea = document.createElement('p');
      let biography = document.createTextNode(heroData.biography);
      biographyArea.appendChild(biography);
      targetDiv.appendChild(biographyArea);
  }
}

/**
* Inserts the error class when the hero has not be found
* @param {string} data The hero not found message
* @param {*} targetDiv The div the class is being added to
*/
function insertErrorClass(data, targetDiv){
  if(data.includes('Hero not found'.toLowerCase())){
      targetDiv.classList.add('error');
  }
}

/**
* Removes the  class from the document
* @param {*} targetDiv The div the class is being removed from
*/
function removeErrorClass(targetDiv){
  if (targetDiv.classList.contains('error')) {
      targetDiv.classList.remove('error');
  }
}
/**
* Displays the respective data based on the data passed in
* @param {object, string} data The data of the hero entered into the form. 
* If a hero was entered, a JSON object representing the hero's data is passed into the function.
*/
function displayHeroes(data){
  result = document.getElementById('result');
  // Removing the error class from previous queries
  removeErrorClass(result);
  if(typeof(data) === 'string'){
      // If the data doesn't contain a hero or is empty, we insert the error class
      insertErrorClass(data, result);
      result.innerHTML = data;
  }else{
      displayHeroData(data, result);
  }
}


/**
* Fetches data based on the input entered in the form
* @param {string} formData The data entered in the form
*/
async function fetchData(formData){
  const response = await fetch(`superheroes.php?query=${formData}`);
  if(response.ok){
      // Returns the response as a string
      return response.text();
  
  // If any unexpected errors happen while fetching, an error is thrown
  }else{
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
  }
}   

/**
* Retrieve data from the server after a query is made to the form
* @param {*} event 
*/
async function loadPHP(event){
  event.preventDefault();
  let form = document.getElementById('superhero');
  try{
      const phpData = await fetchData(form.value);
      const processedData = await handleJSON(phpData);
      console.log(processedData);
      const heroes =  displayHeroes(processedData);
      }catch (error){
          console.log('There was an error: ' + error);
      }
  }   

/**
* Attempts to parse a JSON object from a string passed in
* @param {string} data 
*/
function handleJSON(data){
  try{
      let parsedData = JSON.parse(data);
      return parsedData;
  }catch (error){
      return data;
  }
  
}