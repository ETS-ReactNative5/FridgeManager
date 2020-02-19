import {store} from '../store/config';

const API_KEY = 'fbc1dcbaa05443b1a6383a0b96c077e7';
const API_URL = 'https://api.spoonacular.com';
const WEB_URL = 'https://spoonacular.com';
const API_CREDITS_PER_DAY = 150;
const AUTOCOMPLETE_RESULTS = 25;

export async function searchRecipes(searchString, cuisine, diet, offset) {
    try {
        let url = `${ API_URL }/recipes/search?apiKey=${ API_KEY }`;
        if (!!searchString) {
            url = `${ url }&query=${ searchString }`
        }
        if (!!cuisine) {
            url = `${ url }&cuisine=${ cuisine }`
        }
        if (!!diet) {
            url = `${ url }&diet=${ diet }`
        }
        if (!!offset) {
            url = `${ url }&offset=${ offset }`
        }

        return get(url);

    } catch (error) {
        console.log('Error with function searchRecipes ' + error.message);
        throw error;
    }
}

export async function getRecipeInformation(id) {
    try {
        return get(`${ API_URL }/recipes/${id}/information?apiKey=${ API_KEY }`)
    } catch (error) {
        console.log('Error with function getRecipeInformation ' + error.message);
        throw error;
    }
}

export async function ingredientsAutocomplete(searchString) {
    try {
        return get(`${ API_URL }/food/ingredients/autocomplete?query=${ searchString }&number=${ AUTOCOMPLETE_RESULTS }&apiKey=${ API_KEY }`)
    } catch (error) {
        console.log('Error with function ingredientsAutocomplete ' + error.message);
        throw error;
    }
}

export function getRecipeImageUri(imgName) {
    // If imgName is already an Uri, don't do anything to it
    if (imgName.match(/^http(s?):\/\/.*/)) {
        return imgName;
    }
    return `${WEB_URL}/recipeImages/${imgName}`;
}

export async function get(url) {
    const response = await fetch(url);

    if (response.ok) {
        const quotaUsed = response.headers.get('x-api-quota-used');
        if (quotaUsed !== null) {
            const action = { type: 'SET_API_CREDITS', value: API_CREDITS_PER_DAY - quotaUsed };
            store.dispatch(action);
        }
        return response.json();
    }

    throw new Error(response.status);
}
