
import type { NekoImage } from '~/server/types/index.types'
import { sendServerResponse } from '~/server/utils/response'


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
})
