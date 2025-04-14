export type DayInfo = {
    "results":
    {
        "sunrise": string,
        "sunset":string,
        "solar_noon": string,
        "day_length": number,
        "civil_twilight_begin": string,
        "civil_twilight_end": string,
        "nautical_twilight_begin": string,
        "nautical_twilight_end": string,
        "astronomical_twilight_begin": string,
        "astronomical_twilight_end": string
    },
    "status": string,
    "tzid":string
}


export type StatusCode = 200 | 400 | 404 | 403 | 500 | 401
export type ErrorCodes = (400 | 404 | 403 | 500 | 401)
export type ServerData = null | DayInfo
export interface ServerResponse<Status extends StatusCode, Data extends ServerData> {
    status: Status
    message?: string
    ok: Status extends 200 ? true : false
    data?: Status extends 200 ? Data : null
    error?: Status extends 200 ? null : string
}