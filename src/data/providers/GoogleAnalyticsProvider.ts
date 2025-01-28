const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

// Get via https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#recommended_parameters_for_reports
const MEASUREMENT_ID = process.env.PLASMO_PUBLIC_GA_MEASUREMENT_ID;
const API_SECRET = process.env.PLASMO_PUBLIC_GA_API_SECRET;
const DEFAULT_ENGAGEMENT_TIME_MSEC = 100;

interface EventParams {
    session_id: string;
    event_category?: string;
    event_label?: string;
    value?: number;
    page_title?: string;
    page_location?: string;
    engagement_time_msec?: number;
    [otherParams: string]: any;
}

export const sendEventToGA = async (
    name: string,
    userId: string,
    params: EventParams,
) => {
    if (!params) {
        console.error('No params provided for event', name);
    }

    if (!params.engagement_time_msec) {
        params.engagement_time_msec = DEFAULT_ENGAGEMENT_TIME_MSEC;
    }

    try {
        const response = await fetch(
            `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    client_id: userId,
                    events: [
                        {
                            name,
                            params,
                        },
                    ],
                }),
            },
        );
        if (process.env.NODE_ENV !== 'development') {
            return;
        }
        console.log(await response.text());
    } catch (e) {
        console.error('Google Analytics request failed with an exception', e);
    }
};
