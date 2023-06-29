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
export const createMealCard = (meal, currentFavs) => {
	const thumbnail = meal.strMealThumb
	const category = meal.strCategory
	const mealName = meal.strMeal
	const mealId = meal.idMeal

	const div = document.createElement('div')
	div.classList.add('meal')
	div.id = mealId

	div.innerHTML = `
    <img src="${thumbnail}" />
    <div class="card-content">
      <div>
        <a href="/details.html?id=${mealId}">
          <h2>${mealName}</h2>
        </a>
        <p>${category}</p>
      </div>
      <i class="${
				currentFavs && currentFavs.includes(mealId) ? 'fa-solid' : 'fa-regular'
			} fa-heart favorite"></i>
    </div>
  `

	return div
}