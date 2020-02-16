const API_KEY = 'fbc1dcbaa05443b1a6383a0b96c077e7';
const API_URL = 'https://api.spoonacular.com';
const WEB_URL = 'https://spoonacular.com';
const RECIPE_IMAGE_SIZE = '556x370';

export async function searchRecipes(searchTerm, cuisine, diet, offset) {
    try {
        let url = `${ API_URL }/recipes/search?apiKey=${ API_KEY }`;
        if (!!searchTerm) {
            url = `${ url }&query=${ searchTerm }`
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

        const response = await fetch(url);

        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);

    } catch (error) {
        console.log('Error with function searchRecipes ' + error.message);
        throw error;
    }
}

export async function getRecipeInformation(id) {
    try {
        let url = `${ API_URL }/recipes/${id}/information?apiKey=${ API_KEY }`;
        const response = await fetch(url);

        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);

    } catch (error) {
        console.log('Error with function getRecipeInformation ' + error.message);
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
