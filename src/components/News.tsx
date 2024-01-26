import Footer from "./footer";
import transition from "./transition";

const News = () => {
  return (
    <>
      <main className="news">
        <section>
          <h2>The front end is up!</h2>
          <p>01/09/2024</p>
          <p>description</p>
        </section>
        <section>
          <h2>We built a neural net!</h2>
          <p>08/01/2023</p>
          <p>description</p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default transition(News);
