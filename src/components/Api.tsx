import Footer from "./footer";
import transition from "./transition";
import React from "react";

const Api = () => {
  return (
    <>
      <main className="api">
        <section>how to set up the api</section>
        <section>what does it let you do?</section>
      </main>
      <Footer />
    </>
  );
};

export default transition(Api);
