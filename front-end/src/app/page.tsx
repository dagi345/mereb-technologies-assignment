"use client";

import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    downloadUrl: string;
    departmentsProcessed: number;
    processingTimeMs: number;
  } | null>(null);

  const handleUpload = async () => {
    if (!file) return toast.error("Choose a CSV first");
    setLoading(true);

    const form = new FormData();
    form.append("csvfile", file);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/upload`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(data);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6 text-slate-100">
        <h1 className="text-3xl font-bold text-center text-sky-400">
          Total Sales Calculator
        </h1>

        <label className="block">
          <span className="text-sm font-medium mb-1 inline-block">
            Upload CSV
          </span>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  className="opacity-75"
                />
              </svg>
              Uploading…
            </span>
          ) : (
            "Upload & Process"
          )}
        </button>

        {result && (
          <div className="bg-slate-700 rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold text-sky-300">Result</h2>
            <p className="text-sm">
              Departments:{" "}
              <span className="font-bold text-sky-400">
                {result.departmentsProcessed}
              </span>
            </p>
            <p className="text-sm">
              Processing time:{" "}
              <span className="font-bold text-sky-400">
                {result.processingTimeMs} ms
              </span>
            </p>
            <a
              href={`${process.env.NEXT_PUBLIC_API}${result.downloadUrl}`}
              download
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 px-4 rounded-md transition"
            >
              ⬇ Download CSV
            </a>
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </main>
  );
}