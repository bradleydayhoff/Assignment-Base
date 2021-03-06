async function windowActions() {
    console.log('window loaded');
    const form = document.querySelector('.userform');
    const suggestions = document.querySelector('.suggestions');
    const searchInput = document.querySelector('.search');
    //   const targetList = document.querySelector('.target-list');
  
    const request = await fetch('/api');
    const data = await request.json();
  
    function findMatches(wordToMatch, data) {
      return data.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.name.match(regex) 
          || place.category.match(regex) || place.zip.match(regex);
      });
    }
  
    function displayMatches(event) {
      const matchArray = findMatches(event.target.value, data);
      const html = matchArray.map((place) => `
            <li>
              <span class="name">${place.name.toLowerCase()}</span>
              <span class="category">${place.category.toLowerCase()}</span>
              <span class="city">${place.city.toLowerCase()}</span>
              <span class="zip">${place.zip.toLowerCase()}</span>
            </li>
          `).join('');
      suggestions.innerHTML = html;
    }
    searchInput.addEventListener('keyup', (event) => {
      event.preventDefault();
      displayMatches(event);
    });
  }
  
  window.onload = windowActions;