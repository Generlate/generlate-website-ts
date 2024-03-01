import Footer from "./footer";
import transition from "./transition";
import React from "react";

const Finances = () => {
  return (
    <>
      <main className="finances">
        <section>Earnings reports</section>
      </main>
      <Footer />
    </>
  );
};

export default transition(Finances);
