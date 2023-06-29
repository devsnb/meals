const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

/**
 * Search for a recipe based on the user's input
 * @param input
 * @returns the list of meals found
 */
export const searchMeal = async input => {
	const url = `${BASE_URL}/search.php?s=${input}`
	try {
		const response = await fetch(url)
		return await response.json()
	} catch (error) {
		console.error(error)
	}
}

/**
 * Get full details of the meal based on the meal id provided
 * @param input
 * @returns the full details of the meal
 */
export const getMealDetails = async input => {
	const url = `${BASE_URL}/lookup.php?i=${input}`
	try {
		const response = await fetch(url)
		return await response.json()
	} catch (error) {
		console.error(error)
	}
}
