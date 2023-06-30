import {
	getAllFavorites,
	createMealCard,
	removeFromFavorites
} from './utils.js'
import { getMealDetails } from './api.js'

const favoriteSection = document.querySelector('#favorites')

const createFavSection = (meals, favs) => {
	favoriteSection.innerHTML = ''
	meals.forEach(meal => {
		favoriteSection.appendChild(createMealCard(meal, favs, true))
	})
}

/**
 * Removes element from the dom and localStorage when delete button is clicked
 */
const removeFavorites = () => {
	const favorites = document.querySelectorAll('.fa-trash')
	favorites.forEach(el =>
		el.addEventListener('click', e => {
			const id = el.parentElement.parentElement.id
			removeFromFavorites(id)
			el.parentElement.parentElement.remove()
		})
	)
}

async function main() {
	const favorites = getAllFavorites()
	const meals = []

	favoriteSection.innerHTML = `
    <h2>Loading...</h2>
  `

	for (let fav of favorites) {
		const found = await getMealDetails(fav)
		meals.push(found.meals[0])
	}

	createFavSection(meals, favorites)
	removeFavorites()
}

main()
