/**
 * Adds a meal to the favorites by saving it to the localStorage
 * @param id the mealId
 */
export const addToFavorite = id => {
	const existing = JSON.parse(localStorage.getItem('fav'))
	if (!existing) {
		let newFav = []
		newFav.push(id)
		localStorage.setItem('fav', JSON.stringify(newFav))
	} else {
		existing.push(id)
		localStorage.setItem('fav', JSON.stringify(existing))
	}
}

/**
 * Removes a meal form the favorites by removing it from the localStorage
 * @param id the mealId
 */
export const removeFromFavorites = id => {
	const existing = JSON.parse(localStorage.getItem('fav'))
	if (!existing) {
		return
	} else {
		const filtered = existing.filter(el => {
			return el != id
		})
		localStorage.setItem('fav', JSON.stringify(filtered))
	}
}

/**
 * Returns all favorite meals
 * @returns
 */
export const getAllFavorites = () => {
	return JSON.parse(localStorage.getItem('fav'))
}

/**
 * Creates a meal card from the meals. and returns the HTML element for appending to the DOM
 * @param {*} meal the meal object
 * @param {*} currentFavs current favorite meals
 * @returns the HTML meal node
 */
export const createMealCard = (meal, currentFavs, isTrash = false) => {
	const div = document.createElement('div')
	div.classList.add('meal')
	div.id = meal.idMeal

	let icon = `<i class="${
		currentFavs && currentFavs.includes(meal.idMeal) ? 'fa-solid' : 'fa-regular'
	} fa-heart favorite"></i>`

	div.innerHTML = `
    <img src="${meal.strMealThumb}" />
    <div class="card-content">
      <div>
        <a href="/details.html?id=${meal.idMeal}">
          <h2>${meal.strMeal}</h2>
        </a>
        <p>${meal.strCategory}</p>
      </div>
      ${isTrash ? `<i class="fa-solid fa-trash"></i>` : icon}
    </div>
  `

	return div
}

/**
 * creates the meals section for the meals details page
 * @param meal the meal object
 * @returns the div containing the meals section
 */
export const createMealsSection = meal => {
	const div = document.createElement('div')
	div.classList.add('container')
	div.classList.add('meal')

	div.innerHTML = `
    <img src="${meal.strMealThumb}">

    <div>
      <h1>${meal.strMeal}</h1>
      <h4>${meal.strCategory}</h4>
      <p>${meal.strInstructions}</p>
    </div>

  `

	return div
}
