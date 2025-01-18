// src/utils/analyticsAPI.js
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "path/to/your/service-account-key.json", // Ganti dengan path ke file kredensial Anda
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});

const analyticsreporting = google.analyticsreporting({ version: "v4", auth });

export const getPageViews = async (pagePath) => {
  try {
    const res = await analyticsreporting.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: "YOUR_VIEW_ID", // Ganti dengan View ID dari Google Analytics
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            metrics: [{ expression: "ga:pageviews" }],
            dimensions: [{ name: "ga:pagePath" }],
            dimensionFilterClauses: [
              {
                filters: [
                  {
                    dimensionName: "ga:pagePath",
                    operator: "EXACT",
                    expressions: [pagePath],
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    const pageviews = res.data.reports[0].data.totals[0].values[0];
    return parseInt(pageviews, 10);
  } catch (error) {
    console.error("Error fetching page views:", error);
    return 0;
  }
};
