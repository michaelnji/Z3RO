
import type { DayInfo } from '~/server/types/index.types'
import { sendServerResponse } from '~/server/utils/response'

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
   try{
    const body = await readBody<{
        lat: number,
        lng: number,
        date: string,
        tzid: string,
        formatted: 0 | 1
    }>(event)

    const requiredFields = ['lat', 'lng', 'date', 'tzid', 'formatted'] as const
    if (!body || !requiredFields.every(field => field in body)) {
        setResponseStatus(event, 400)
        return sendServerResponse(400, 'Invalid payload, one or more fields are missing')
    }

       if (typeof body.lat !== 'number' ||
           typeof body.lng !== 'number' ||
           typeof body.date !== 'string' ||
           typeof body.tzid !== 'string' ||
           (body.formatted !== 0 && body.formatted !== 1)) {
           setResponseStatus(event, 400)
           return sendServerResponse(400, 'Invalid payload, fields have incorrect types')
       }

        const constructedUrl = `https://api.sunrise-sunset.org/json?lat=${body.lat}&lng=${body.lng}&formatted=${body.formatted}&date=${body.date}&tzid=${body.tzid}`

        const resp = await $fetch(constructedUrl)
        const data = resp as DayInfo

        setResponseStatus(event, 200)
        return sendServerResponse(200, 'success', data)
    } catch (error) {
        setResponseStatus(event, 500)
       let message: string;
       if (error instanceof Error) {
           message = error.message;
       } else {
           message = String(error);
       }
       return sendServerResponse(500, message.includes("fetch failed") ? "fetch failed" : message);
    }
})
