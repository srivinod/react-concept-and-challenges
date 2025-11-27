import React, { useState } from "react";
import { useFetch } from "./useFetchHook/useFetch";

export default function App() {
  const [APIv1, setAPIv1] = useState(
    "https://jsonplaceholder.typicode.com/posts"
  );
 
  const {data} = useFetch(APIv1);

  return (
    <>
      {
        data.map((postVal) =>
          <p>{postVal.id}</p>
        )
      }

    </>
  )

}





// import React, { useState } from "react";
// import { useFetch } from "./useFetchHook/useFetch";

// export default function App() {
//   const [APIv1, setAPIv1] = useState(
//     "https://jsonplaceholder.typicode.com/posts"
//   );

//   const { data: post, loading, error, refetch } = useFetch(APIv1);

//   function handleClick() {
//     setAPIv1("https://jsonplaceholder.typicode.com/comments");
//   }

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}

//       {!loading &&
//         post?.map((val) => <p key={val.id}>{val.title || val.name}</p>)}

//       <button onClick={handleClick}>Change URL</button>

//       <button onClick={refetch}>Reload</button>
//     </>
//   );
// }
