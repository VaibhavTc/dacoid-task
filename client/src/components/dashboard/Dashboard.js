// src/components/dashboard/Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrls } from "../../redux/urlsSlice";
import axios from "axios";
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
import UrlAnalytics from "../UrlAnalytics";
import UrlTable from "../UrlTable";
import QRCodeModal from "../QRCodeModal";

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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { urls, loading } = useSelector((state) => state.urls);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [selectedUrlQR, setSelectedUrlQR] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [urlsPerPage] = useState(5);
  const [showQRCode, setShowQRCode] = useState(false);
  const BASE_URL = process.env.BACKEND_URL;
  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);
  const filteredUrls = urls.filter(
    (url) =>
      url.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);
  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage);
  const fetchAnalytics = async (urlId) => {
    setAnalyticsLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/analytics/${urlId}`
      );
      setAnalytics(res.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  };
  const handleUrlSelect = (url) => {
    setSelectedUrl(url);
    fetchAnalytics(url._id);
  };

  const prepareChartData = () => {
    if (!analytics) return { clicksChartData: null, deviceChartData: null };

    const clicksChartData = {
      labels: Object.keys(analytics.clicksByDate),
      datasets: [
        {
          label: "Clicks",
          data: Object.values(analytics.clicksByDate),
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    };

    const deviceChartData = {
      labels: Object.keys(analytics.deviceBreakdown),
      datasets: [
        {
          data: Object.values(analytics.deviceBreakdown),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };

    return { clicksChartData, deviceChartData };
  };

  const { clicksChartData, deviceChartData } = prepareChartData();

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">URL Analytics Dashboard</h1>

      {/* Search and Pagination Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* URL Table */}
      <UrlTable
        loading={loading}
        currentUrls={currentUrls}
        handleUrlSelect={handleUrlSelect}
        setShowQRCode={setShowQRCode}
        baseUrl={BASE_URL}
        setSelectedUrlQR={setSelectedUrlQR}
      />

      {/* Analytics Section */}
      {selectedUrl && (
        <UrlAnalytics
          selectedUrl={selectedUrl}
          setSelectedUrl={setSelectedUrl}
          analytics={analytics}
          analyticsLoading={analyticsLoading}
          clicksChartData={clicksChartData}
          deviceChartData={deviceChartData}
        />
      )}

      {/* QR Code Modal */}
      {showQRCode && selectedUrlQR && (
        <QRCodeModal
          shortId={selectedUrlQR.shortId}
          baseUrl={BASE_URL}
          onClose={() => {
            setShowQRCode(false);
            setSelectedUrlQR(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
