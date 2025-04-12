// components/UrlTable.jsx
import { format } from "date-fns";

const UrlTable = ({
  loading,
  currentUrls,
  handleUrlSelect,
  setShowQRCode,
  baseUrl = process.env.REACT_APP_BACKEND_URL,
  setSelectedUrlQR,
}) => {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Original URL</th>
            <th className="py-3 px-6 text-left">Short URL</th>
            <th className="py-3 px-6 text-center">Clicks</th>
            <th className="py-3 px-6 text-center">Created Date</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {loading ? (
            <tr>
              <td colSpan="6" className="py-4 px-6 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              </td>
            </tr>
          ) : currentUrls.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-4 px-6 text-center">
                No URLs found
              </td>
            </tr>
          ) : (
            currentUrls.map((url) => (
              <tr
                key={url._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6 text-left truncate max-w-xs">
                  {url.longUrl}
                </td>
                <td className="py-3 px-6 text-left">
                  <a
                    href={`${baseUrl}/${url.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    /{url.shortId}
                  </a>
                </td>
                <td className="py-3 px-6 text-center">{url.clicks}</td>
                <td className="py-3 px-6 text-center">
                  {format(new Date(url.createdAt), "MMM dd, yyyy")}
                </td>
                <td className="py-3 px-6 text-center">
                  {url.expiresAt && new Date(url.expiresAt) < new Date() ? (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                      Expired
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleUrlSelect(url)}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs mr-2"
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUrlQR(url);
                      setShowQRCode(true);
                    }}
                    className="bg-purple-500 hover:bg-purple-700 text-white py-1 px-3 rounded text-xs"
                  >
                    QR Code
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
