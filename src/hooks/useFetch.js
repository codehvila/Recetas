import { useState, useEffect } from "react";

function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (urlParam, fetchOptions) => {
      setIsPending(true);
      const signal = controller.signal;

      try {
        const response = await fetch(urlParam, { ...fetchOptions, signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();

        setIsPending(false);
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("The fetch was aborted");
        } else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    if (method === "GET") {
      fetchData(url);
    }

    if (method === "POST" && options) {
      fetchData(url, options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
}

export default useFetch;
