import { getMealDetails } from './api.js'
import { createMealsSection } from './utils.js'

const detailsSection = document.querySelector('#details')

const urlParams = new URLSearchParams(location.search)

const id = urlParams.get('id')

async function main() {
	detailsSection.innerHTML = `
    <h2>Loading</h2>
  `

	const meals = await getMealDetails(id)
	const meal = meals.meals[0]

	detailsSection.innerHTML = ''
	detailsSection.appendChild(createMealsSection(meal))
}

main()
