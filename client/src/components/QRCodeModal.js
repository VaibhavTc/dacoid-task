// components/QRCodeModal.jsx
import { QRCodeSVG } from "qrcode.react";

const QRCodeModal = ({
  url,
  shortId,
  onClose,
  baseUrl = process.env.REACT_APP_BACKEND_URL,
}) => {
  // If url is provided directly, use it; otherwise construct from baseUrl and shortId
  const fullUrl = `${baseUrl}/${shortId}`;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">QR Code for /{shortId}</h3>
        <div className="flex justify-center mb-4">
          <QRCodeSVG
            value={fullUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Scan this QR code to access your shortened URL
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
