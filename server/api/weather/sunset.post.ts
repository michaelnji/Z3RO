
import type { DayInfo } from '~/server/types/index.types'
import { sendServerResponse } from '~/server/utils/response'

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

        const constructedUrl = `https://api.sunrise-sunset.org/json?lat=${body.lat}&lng=${body.lng}&formatted=${body.formatted}&date=${body.date}&tzid=${body.tzid}`

        const resp = await $fetch(constructedUrl)
        const data = resp as DayInfo
        
        setResponseStatus(event, 200)
        return sendServerResponse(200, 'success', data)
    } catch (error) {
        setResponseStatus(event, 500)
        return sendServerResponse(500, `${error}`.includes("fetch failed") ? "fetch failed" : `${error}`)
    }
})
