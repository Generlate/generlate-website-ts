import Footer from "./footer";
import transition from "./transition";

const Docs = () => {
  return (
    <>
      <main className="docs">
        <section>research</section>
        <section>debugging</section>
        <section>how text to 3d works (tips for better generations) </section>
      </main>
      <Footer />
    </>
  );
};

export default transition(Docs);
