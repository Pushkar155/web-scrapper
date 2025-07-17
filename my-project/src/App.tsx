import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrlDataAsync } from "./store/features/url/urlSlice";
import type { AppDispatch, RootState } from "./store/store";
import type { UrlDataType } from "./store/features/url/urlTypes";
import { Select } from "antd";
import confetti from "canvas-confetti";

function App() {
  const [url, setUrl] = useState("");
  const [level, setLevel] = useState<"basic" | "medium">("medium");
  // const [format, setFormat] = useState<"Json" | "csv">("Json");

  const dispatch = useDispatch<AppDispatch>();

  const { urlData, fetchLoading } = useSelector(
    (state: RootState) => state.url
  );

  console.log(urlData, "urlData");

  const handleSearch = async () => {
    dispatch(
      getUrlDataAsync({
        newUrlDataValues: {
          query: url,
          format: "Json",
          level: level,
        },
      })
    ).unwrap();
  };

  useEffect(() => {
    if (urlData.length > 0) {
      confetti({
        particleCount: 350,
        spread: 200,
      });
    }
  }, [urlData]);

  return (
    <div className="h-screen w-full flex flex-col items-center bg-gray-800 px-4 py-8">
      <div className="flex items-center gap-2 justify-between bg-white p-4 rounded-lg shadow-md w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Search query or seed URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
        />
        <Select
          value={level}
          onChange={(value) => setLevel(value)}
          className="w-full sm:w-1/5 h-full"
          options={[
            { label: "Basic", value: "basic" },
            { label: "Medium", value: "medium" },
          ]}
        />
        {/* <Select
          value={format}
          onChange={(value) => setFormat(value)}
          className="w-full sm:w-1/5 p-4"
          options={[
            { label: "Json", value: "Json" },
            { label: "Csv", value: "csv" },
          ]}
        /> */}
        <button
          onClick={handleSearch}
          disabled={fetchLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer"
        >
          {fetchLoading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="w-full max-w-xl bg-white p-4 rounded-lg shadow-md">
        {/* <h2 className="text-lg font-semibold mb-2">Results:</h2> */}
        {urlData && urlData.length === 0 ? (
          <p className="text-gray-500">No data yet.</p>
        ) : (
          <ul className="space-y-4">
            {urlData?.map((item: UrlDataType, index: number) => (
              <li key={index} className="border rounded-md p-4 shadow-sm">
                <p className="text-lg font-semibold text-gray-800">
                  {item.companyName}
                </p>

                <a
                  href={item.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {item.websiteURL}
                </a>

                {item.snippet && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Snippet:</span> {item.snippet}
                  </p>
                )}

                {item.tagline && (
                  <p className="text-sm text-gray-700 mt-1 italic">
                    <span className="font-medium">Tagline:</span> {item.tagline}
                  </p>
                )}

                {item.address && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Address:</span> {item.address}
                  </p>
                )}

                {item?.socialLinks && item?.socialLinks?.length > 0 && (
                  <div className="text-sm mt-2">
                    <p className="font-medium text-gray-700">Social Links:</p>
                    <ul className="list-disc list-inside text-blue-500">
                      {item?.socialLinks.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
