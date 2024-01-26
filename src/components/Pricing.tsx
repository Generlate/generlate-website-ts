import Footer from "./footer";
import transition from "./transition";

const Pricing = () => {
  return (
    <>
      <main className="pricing">
        <section>pricing</section>
        <section>free!</section>
        <section>explain the business model</section>
        <section>maybe tokens</section>
      </main>
      <Footer />
    </>
  );
};

export default transition(Pricing);
