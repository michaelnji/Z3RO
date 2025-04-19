import type {
	CurrencyBeaconResponse,
	ErrorCodes
} from "~/server/types/index.types";
import { sendServerResponse } from "~/server/utils/response";

/**
 * Handles an HTTP POST request to fetch sunset and sunrise information for a given location and date.
 *
 * @async
 * @function
 * @param {H3Event} event - The incoming HTTP event object.
 * @returns {Promise<void>} A promise that resolves with the server response.
 *
 * @throws Will return a 400 status code if the request payload is invalid or missing required fields.
 * @throws Will return a 500 status code if an error occurs during the fetch operation or other unexpected errors.
 *
 * @remarks
 * The function expects the request body to contain the following fields:
 * - `lat` (number): Latitude of the location.
 * - `lng` (number): Longitude of the location.
 * - `date` (string): Date for which the sunrise and sunset information is requested.
 * - `tzid` (string): Timezone identifier.
 * - `formatted` (0 | 1): Whether the response should be formatted (1) or not (0).
 *
 * The function constructs a URL to call the `https://api.sunrise-sunset.org/json` API with the provided parameters.
 * If the fetch operation is successful, it returns the data with a 200 status code.
 * If the fetch operation fails, it returns a 500 status code with an appropriate error message.
 */
export default eventHandler(async (event) => {
	try {
		const config = useRuntimeConfig();
		const body = await readBody<{ base: string; quote: string }[]>(event);
		const data: null | { pair: string; rate: number }[] = [];
		if (
			!Array.isArray(body) ||
			body.some(
				(item) =>
					typeof item.base !== "string" || typeof item.quote !== "string",
			)
		) {
			setResponseStatus(event, 400);
			return sendServerResponse(
				400,
				'Invalid request payload. Each item must have "base" and "quote" fields of type string.',
			);
		}

		for (const item of body) {
			const constructedUrl = `${config.currencyApiUrl}?api_key=${config.currencyApiKey}&base=${item.base}&symbols=${item.quote}`;

			const resp = await $fetch<CurrencyBeaconResponse>(constructedUrl);

			if (resp.meta.code !== 200) {
				setResponseStatus(event, resp.meta.code);
				return sendServerResponse(resp.meta.code as ErrorCodes, resp.meta.disclaimer);
			}
            
			if (resp.response?.rates) {
				const rate = resp.response.rates[item.quote];
				if (rate) {
					data.push({
						pair: `${item.base}/${item.quote}`,
						rate,
					});
				} else {
					setResponseStatus(event, 404);
					return sendServerResponse(
						404,
						`Rate for ${item.base}/${item.quote} not found.`,
					);
				}
			}
		}

		setResponseStatus(event, 200);
		return sendServerResponse(200, "success", data);
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
