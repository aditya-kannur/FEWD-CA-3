function fetchRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {

            // Display the meal image
            const image = document.createElement("img");
            image.src = data.meals[0].strMealThumb;
            document.querySelector('.random-image-div').appendChild(image);
            const text = document.createElement("p")
            text.innerHTML = data.meals[0].strMeal
            document.querySelector('.random-image-div').appendChild(text)

            // Display modal with meal details
            image.addEventListener('click', function() {
                const modal = document.getElementById("myModal");
                modal.style.display = "block";
                
                // Display ingredients
                const ingredientsDiv = document.getElementById("ingredients");
                ingredientsDiv.innerHTML = "<h3>Ingredients:</h3><ul>";
                for (let i = 1; i <= 20; i++) {
                    const ingredient = data.meals[0][`strIngredient${i}`];
                    if (ingredient) {
                        ingredientsDiv.innerHTML += `<li>${ingredient} - ${data.meals[0][`strMeasure${i}`]}</li>`;
                    }
                }
                ingredientsDiv.innerHTML += "</ul>";
                
                // Display procedure
                const procedureDiv = document.getElementById("procedure");
                procedureDiv.innerHTML = `<h3>Procedure:</h3><p>${data.meals[0].strInstructions}</p>`;
            });


        })
        .catch(error => console.error('Error fetching random meal:', error));
}

// Call the function to fetch and display a random meal
fetchRandomMeal();

// Close the modal when the close button is clicked
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById("myModal").style.display = "none";
});

// Close the modal when clicked outside modal
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}

// Display list of images on input
document.querySelector(".search-bar").addEventListener('input', (e) => {
    fetchSearchApi(e.target.value)
})

// Fetching API function
function fetchSearchApi(item) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`)
    .then(res => res.json())
    .then(d => {
        const data = d.meals
        displaySearchItems(data)
        console.log(data)
    })
}

// Displaying images function
function displaySearchItems(data) {
    const displayDiv = document.querySelector(".list-image-div")
    displayDiv.innerHTML = ""

    // Check if data is not null and there are items in the array
    if (data && data.length > 0) {

        // Iterate over each meal in the array
        data.forEach(meal => { 
            const mealDiv = document.createElement("div");
            mealDiv.classList.add("searchResult");
            mealDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strMeal}</p>
            `;
            displayDiv.appendChild(mealDiv);
        });
    } else {
        displayDiv.innerHTML = "No Results Found";
    }
}

function run() {
    document.location.reload()
}