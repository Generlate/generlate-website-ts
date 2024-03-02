import Footer from "./footer";
import transition from "./transition";
import React from "react";

const AustenCabret = () => {
  return (
    <>
      <main className="austencabret">
        <section>
          <img src="/austen-cabret-profile.webp" alt="Austen Cabret"></img>
          <h2>Austen Cabret</h2>
          <h4>Founder</h4>

          <p>
            Austen is Generlate&apos;s founder and responsible for the
            company&apos;s development, finances, sales and customer support. He
            alone built the front and back end.{" "}
          </p>
          <p>
            {" "}
            Before working as a fullstack engineer, Austen filled various roles
            in the architecture field, as a designer, renderer and planner.{" "}
          </p>
          <p>
            {" "}
            Austen is a self taught software engineer and earned an MLA from
            Florida International University.{" "}
          </p>
          <p>email: austencabret@generlate.com</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default transition(AustenCabret);
