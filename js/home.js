import { searchMeal } from './api.js'
import {
	getAllFavorites,
	addToFavorite,
	removeFromFavorites,
	createMealCard
} from './utils.js'

// Getting required DOM elements
const searchForm = document.querySelector('#search-form')
const userInput = document.querySelector('#term')
const mealsSection = document.querySelector('#meals')

// Storing the user's input
let searchText = ''

// Render out our meal cards
const showMeals = meals => {
	const favMeals = getAllFavorites()

	if (!meals) return

	meals.forEach(meal => {
		mealsSection.appendChild(createMealCard(meal, favMeals))
	})
}

/**
 *
 * @param {*} input
 */
const onSearch = async input => {
	if (input == '') {
		mealsSection.innerHTML = ''
		return
	}
	mealsSection.innerHTML = `
    <h2>
      Loading...
    </h2>
  `
	const meals = await searchMeal(input)
	mealsSection.innerHTML = ''
	showMeals(meals.meals)
	const favorites = document.querySelectorAll('.favorite')

	favorites.forEach(el => {
		el.addEventListener('click', e => {
			const currentFavs = getAllFavorites()
			const id = e.target.parentElement.parentElement.id

			if (currentFavs && currentFavs.includes(id)) {
				console.log('XX')
				removeFromFavorites(id)
				el.classList.remove('fa-solid')
				el.classList.add('fa-regular')
			} else {
				addToFavorite(id)
				el.classList.add('fa-solid')
				el.classList.remove('fa-regular')
			}
		})
	})
}

// When the form is submitted
searchForm.addEventListener('submit', async e => {
	e.preventDefault()

	await onSearch(searchText)
})

userInput.addEventListener('keydown', async e => {
	searchText = e.target.value
	onSearch(searchText)
})
