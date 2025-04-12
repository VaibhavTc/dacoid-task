// src/components/urls/UrlShortener.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUrl } from "../../redux/urlsSlice";
import axios from "axios";

const UrlShortener = () => {
  const [formData, setFormData] = useState({
    longUrl: "",
    customAlias: "",
    expiresAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const { longUrl, customAlias, expiresAt } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await dispatch(createUrl(formData));
      console.log("here");
      await res;
      setSuccess(true);
      setFormData({
        longUrl: "",
        customAlias: "",
        expiresAt: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Short URL</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          URL shortened successfully!
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="longUrl"
          >
            Original URL*
          </label>
          <input
            type="url"
            id="longUrl"
            name="longUrl"
            value={longUrl}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="https://example.com/very-long-url"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="customAlias"
          >
            Custom Alias (Optional)
          </label>
          <input
            type="text"
            id="customAlias"
            name="customAlias"
            value={customAlias}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="my-custom-link"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="expiresAt"
          >
            Expiration Date (Optional)
          </label>
          <input
            type="date"
            id="expiresAt"
            name="expiresAt"
            value={expiresAt}
            onChange={onChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Creating..." : "Create Short URL"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlShortener;
