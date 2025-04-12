// components/UrlAnalytics.jsx
import { format } from "date-fns";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);
const UrlAnalytics = ({
  selectedUrl,
  analytics,
  analyticsLoading,
  clicksChartData,
  deviceChartData,
  setSelectedUrl,
}) => {
  return (
    <div className="fixed bg-[#000000b3] w-full h-full flex justify-center items-center left-0 top-0">
      <button
        onClick={() => setSelectedUrl(null)}
        className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2 transition-colors"
        aria-label="Close analytics"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 z-100">
        <h2 className="text-xl font-bold mb-4">
          Analytics for /{selectedUrl?.shortId}
        </h2>

        {analyticsLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        ) : analytics ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Total Clicks</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {analytics.totalClicks}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Created On</h3>
                <p className="text-xl">
                  {format(new Date(selectedUrl.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Status</h3>
                <p className="text-xl">
                  {selectedUrl.expiresAt &&
                  new Date(selectedUrl.expiresAt) < new Date()
                    ? "Expired"
                    : "Active"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Clicks Over Time</h3>
                {Object.keys(analytics.clicksByDate).length > 0 ? (
                  <div className="h-64">
                    <Line
                      data={clicksChartData}
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: {
                              precision: 0,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No click data available yet
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
                {Object.keys(analytics.deviceBreakdown).length > 0 ? (
                  <div className="h-64">
                    <Pie
                      data={deviceChartData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No device data available yet
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No analytics data available</p>
        )}
      </div>
    </div>
  );
};

export default UrlAnalytics;
