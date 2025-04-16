
import type { NekoImage } from '~/server/types/index.types'
import { sendServerResponse } from '~/server/utils/response'

/**
 * Handles an API request to fetch random anime images with a suggestive rating.
 *
 * @async
 * @function
 * @param {H3Event} event - The incoming event object representing the API request.
 * @returns {Promise<object>} A promise that resolves to a server response object containing the status, message, and data.
 *
 * @throws {Error} If an error occurs during the fetch operation or response handling.
 *
 * The function performs the following steps:
 * 1. Constructs a URL to fetch random anime images from the Nekos API with a suggestive rating and a limit of 3 images.
 * 2. Sends a GET request to the constructed URL using `$fetch`.
 * 3. Parses the response into an array of `NekoImage` objects.
 * 4. Sets the response status to 200 and returns a success response with the fetched data.
 * 5. If an error occurs, sets the response status to 500 and returns an error response with an appropriate message.
 */
export default eventHandler(async (event) => {
   try{
   const config = useRuntimeConfig();
			const constructedUrl = `${config.animeUrl}/waifu?amount=3`;

			const resp = await $fetch(constructedUrl);
			const data = resp as { results: NekoImage[] };

			setResponseStatus(event, 200);
			return sendServerResponse(200, "success", data.results);
    } catch (error) {
        setResponseStatus(event, 500);
        let message: string;
        if (error instanceof Error && error.message.includes("fetch failed")) {
            message = "fetch failed";
        } else {
            message = "Internal Server Error";
        }
        return sendServerResponse(500, message);
    }
})
