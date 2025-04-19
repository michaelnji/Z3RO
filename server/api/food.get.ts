import type { FoodInfo, Quote } from "~/server/types/index.types";
import { sendServerResponse } from "~/server/utils/response";


export default eventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const constructedUrl = `${config.foodUrl}/random.php`
        const result = await $fetch<FoodInfo>(constructedUrl, {
            retry: 3,
            retryDelay: 200
        })


        setResponseStatus(event, 200);
        return sendServerResponse(200, "success", result);
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
