import React, { Suspense } from "react";

import Layout from "./layout";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Layout></Layout>
    </Suspense>
  );
};

export default App;
