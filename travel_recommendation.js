document.addEventListener('DOMContentLoaded', ()=>{
    fetch('travel_recommendation_api.json')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            const searchBar = document.getElementById('searchBar');
            const searchBtn = document.getElementById('searchbtn');
            const clearBtn = document.getElementById('clearbtn');
            const resultsDiv = document.getElementById('results');
            // Function to search and display results
            function searchAndDisplay() {

                console.log('Search button clicked')
                const query = searchBar.value.toLowerCase();
                resultsDiv.innerHTML = '';

                const results = [];

                // Search in countries and cities
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(query)) {
                        results.push({
                            name: country.name,
                            description: `Country: ${country.name}`,
                            imageUrl: null
                        });
                    }

                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(query) || city.description.toLowerCase().includes(query)) {
                            results.push({
                                name: city.name,
                                description: city.description,
                                imageUrl: city.imageUrl
                            });
                        }
                    });
                });

                // Search in temples
                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(query) || temple.description.toLowerCase().includes(query)) {
                        results.push({
                            name: temple.name,
                            description: temple.description,
                            imageUrl: temple.imageUrl
                        });
                    }
                });

                // Search in beaches
                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(query) || beach.description.toLowerCase().includes(query)) {
                        results.push({
                            name: beach.name,
                            description: beach.description,
                            imageUrl: beach.imageUrl
                        });
                    }
                });

                // Display the results
                if (results.length > 0) {
                    results.forEach(result => {
                        const resultDiv = document.createElement('div');
                        resultDiv.classList.add('result-item');
                        resultDiv.innerHTML = `
                            <h3>${result.name}</h3>
                            ${result.imageUrl ? `<img src="${result.imageUrl}" alt="${result.name}" width="200">` : ''}
                            <p class="description">${result.description}</p>
                        `;
                        resultsDiv.appendChild(resultDiv);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No results found.</p>';
                }
            }

            // Event listener for the search button
            searchBtn.addEventListener('click', searchAndDisplay);

            // Event listener for the clear button
            clearBtn.addEventListener('click', () => {
                searchBar.value = '';
                resultsDiv.innerHTML = '';
                console.log('clear btn clicked')
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
})