import Footer from "./footer";
import { Link } from "react-router-dom";
import transition from "./transition";
import React from "react";

const Team = () => {
  return (
    <>
      <main className="team">
        <section>
          <u>Team Profiles</u>
        </section>
        <section>
          <Link to="/components/Austen-cabret" title="more info">
            <img src="/austen-cabret-profile.webp" alt="Austen Cabret" />
            <h2>Austen Cabret</h2>
            <h4>Founder</h4>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default transition(Team);
