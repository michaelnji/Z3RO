import type { Quote } from "~/server/types/index.types";
import { sendServerResponse } from "~/server/utils/response";

/**
 * GET /api/quotes
 *
 * Fetches a stoic quote from an external API with specific length requirements.
 *
 * @description
 * This endpoint retrieves a quote from a configured external API and ensures it meets specific
 * length criteria (between 7 and 12 words). If a quote doesn't meet these criteria, it will
 * retry up to 15 times to find a suitable quote.
 *
 * @returns
 * - Success (200): Returns a quote object containing the quote text and author
 * - Error (500): Returns an error message if:
 *   - The external API request fails
 *   - No suitable quote is found after maximum retries
 *   - Any other server error occurs
 *
 * @example
 * // Success response
 * {
 *   status: 200,
 *   message: "success",
 *   data: {
 *     quote: "The happiness of your life depends upon the quality of your thoughts.",
 *     author: "Marcus Aurelius"
 *   }
 * }
 *
 * // Error response
 * {
 *   status: 500,
 *   message: "Could not find a suitable quote after maximum retries"
 * }
 */
export default eventHandler(async (event) => {
	try {
		const config = useRuntimeConfig();
		const MAX_RETRIES = 15;
		let retryCount = 0;
		let quoteData: Quote | null = null;

		while (retryCount < MAX_RETRIES) {
			const constructedUrl = `${config.quotesUrl}/stoic-quote`;
			const resp = await $fetch(constructedUrl);
			const result = resp as { data: Quote };

			const wordCount = result.data.quote.split(" ").length;
			if (wordCount > 6 && wordCount <= 12) {
				quoteData = result.data;
				break;
			}
			retryCount++;
		}

		if (!quoteData) {
			setResponseStatus(event, 500);
			return sendServerResponse(
				500,
				"Could not find a suitable quote after maximum retries",
			);
		}

		setResponseStatus(event, 200);
		return sendServerResponse(200, "success", quoteData);
	} catch (error) {
		setResponseStatus(event, 500);
		console.log(error)
		let message: string;
		if (error instanceof Error) {
			message = error.message;
		} else {
			message = String(error);
		}
		return sendServerResponse(
			500,
			message.includes("fetch failed") ? "fetch failed" : message,
		);
	}
});
