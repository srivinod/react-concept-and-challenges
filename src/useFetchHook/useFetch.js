import { useEffect, useState } from "react";

export  function useFetch (url) {
    const [data, setData] = useState([])

    const fetchFromAPI = async () => {
        const fetchData = await fetch (url);
        const data = await fetchData.json();
        setData(data);
    }




    useEffect(() => {
        fetchFromAPI();
    },[url])

    return {fetchFromAPI, data}

}





// import { useEffect, useState } from "react";

// export function useFetch(url) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch(url);
//       const json = await res.json();
//       setData(json);
//     } catch (err) {
//       setError("Failed to fetch");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return { data, loading, error, refetch: fetchData };
// }
