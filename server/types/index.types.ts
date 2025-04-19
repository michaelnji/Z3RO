export type DayInfo = {
    results: {
        sunrise: string;
        sunset: string;
        solar_noon: string;
        day_length: number;
        civil_twilight_begin: string;
        civil_twilight_end: string;
        nautical_twilight_begin: string;
        nautical_twilight_end: string;
        astronomical_twilight_begin: string;
        astronomical_twilight_end: string;
    };
    status: string;
    tzid: string;
};
export type CurrencyBeaconResponse = {
	meta: {
		code: number;
		disclaimer: string;
	};
	response: {
		date: string;
		base: string;
		rates: {
			[quote: string]: number;
		};
	};
	date: string;
	base: string;
	rates: {
		[quote: string]: number;
	};
};
export type NekoImage = {

    artist_href: string,
    artist_name: string,
    source_url: string,
    url: string

};
export type PairRate = {
	pair: string;
	rate: number;
};

export type Quote = {
	author: string;
	quote: string;
};

export type FoodInfo = {
    meals: Array<{
        idMeal: string;
        strMeal: string;
        strMealAlternate: string | null;
        strCategory: string;
        strArea: string;
        strInstructions: string;
        strMealThumb: string;
        strTags: string;
        strYoutube: string;
        strIngredient1: string;
        strIngredient2: string;
        strIngredient3: string;
        strIngredient4: string;
        strIngredient5: string;
        strIngredient6: string;
        strIngredient7: string;
        strIngredient8: string;
        strIngredient9: string;
        strIngredient10: string;
        strIngredient11: string;
        strIngredient12: string;
        strIngredient13: string;
        strIngredient14: string;
        strIngredient15: string;
        strIngredient16: string;
        strIngredient17: string;
        strIngredient18: string;
        strIngredient19: string;
        strIngredient20: string;
        strMeasure1: string;
        strMeasure2: string;
        strMeasure3: string;
        strMeasure4: string;
        strMeasure5: string;
        strMeasure6: string;
        strMeasure7: string;
        strMeasure8: string;
        strMeasure9: string;
        strMeasure10: string;
        strMeasure11: string;
        strMeasure12: string;
        strMeasure13: string;
        strMeasure14: string;
        strMeasure15: string;
        strMeasure16: string;
        strMeasure17: string;
        strMeasure18: string;
        strMeasure19: string;
        strMeasure20: string;
        strSource: string;
        strImageSource: string | null;
        strCreativeCommonsConfirmed: string | null;
        dateModified: string | null;
    }>
}



export type StatusCode = 200 | 400 | 404 | 403 | 500 | 401;
export type ErrorCodes = 400 | 404 | 403 | 500 | 401;
export type ServerData = null | DayInfo | NekoImage[] | PairRate[] | Quote | FoodInfo
export interface ServerResponse<
    Status extends StatusCode,
    Data extends ServerData,
> {
    status: Status;
    message?: string;
    ok: Status extends 200 ? true : false;
    data?: Status extends 200 ? Data : null;
    error?: Status extends 200 ? null : string;
}
