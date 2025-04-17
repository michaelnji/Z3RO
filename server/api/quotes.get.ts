import type { Quote } from "~/server/types/index.types";
import { sendServerResponse } from "~/server/utils/response";

export default eventHandler(async (event) => {
	try {
		const config = useRuntimeConfig();
		const fetchQuote = async () => {
			const constructedUrl = `${config.quotesUrl}/stoic-quote`;
			const resp = await $fetch(constructedUrl);
			const result = resp as { data: Quote };

			if (
				result.data.quote.split(" ").length > 12 ||
				result.data.quote.split(" ").length <= 6
			) {
				return fetchQuote();
			}
			return result.data;
		};

		const quoteData = await fetchQuote();

		setResponseStatus(event, 200);
		return sendServerResponse(200, "success", quoteData);

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
});
