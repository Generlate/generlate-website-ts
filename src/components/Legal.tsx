import Footer from "./footer";
import transition from "./transition";

const Legal = () => {
  return (
    <>
      <main className="legal">
        <p>Last Updated: 01/09/2024</p>

        <section>
          <h2>Privacy Policy</h2>
          <p>
            Generlate is committed to protecting your privacy. We collect both
            user-provided and automatically gathered information to enhance our
            service.
          </p>
          <ul>
            <li>
              <strong>Information Use:</strong> We use collected information to
              improve our service, understand user interaction, and communicate
              about our service.
            </li>
            <li>
              <strong>Information Sharing:</strong> We do not sell your
              information. It may be shared with trusted third parties to
              provide and improve our service or as required by law.
            </li>
            <li>
              <strong>Data Protection:</strong> We take measures to protect your
              personal information, including online encryption.
            </li>
            <li>
              <strong>User Rights:</strong> You have the right to access,
              update, or delete your information and to opt-out of
              communications.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar technologies
              for website functionality and user experience enhancement.
            </li>
          </ul>
        </section>

        <section>
          <h2>Intellectual Property Rights</h2>
          <p>
            All content on Generlate's website, such as text, graphics, logos,
            and software, is protected by intellectual property laws and is
            either owned by Generlate or used under license.
          </p>
          <ul>
            <li>
              <strong>Property Rights:</strong> Unauthorized use of our
              intellectual property is prohibited.
            </li>
          </ul>
        </section>

        <section>
          <h2>Terms of Use</h2>
          <p>
            By using the Generlate website (https://generlate.com), you agree to
            these Terms of Use. Our service allows you to generate 3D models
            based on text input.
          </p>
          <ul>
            <li>
              <strong>Intellectual Property:</strong> All content and services
              on Generlate, including algorithms and 3D models, are our
              intellectual property or that of our licensors.
            </li>
            <li>
              <strong>User Conduct:</strong> You must not misuse our services or
              attempt unauthorized access to our systems.
            </li>
            <li>
              <strong>Liability:</strong> We are not liable for indirect or
              consequential damages arising from your use of Generlate.
            </li>
            <li>
              <strong>Modifications:</strong> We may modify these terms and will
              notify you of significant changes.
            </li>
            <li>
              <strong>Governing Law:</strong> Disputes will be governed by
              Florida law and U.S. federal law. EU consumers may be exempt from
              certain jurisdiction clauses.
            </li>
          </ul>
        </section>
        <section>
          <h2>Governing Law</h2>
          <p>
            All legal matters related to Generlate are governed by the laws of
            the United States and the State of Florida. For EU consumers,
            specific provisions may apply.
          </p>
          <ul>
            <li>
              <strong>Dispute Resolution:</strong> We aim to resolve disputes
              amicably. Unresolved disputes may be subjected to mediation or
              legal action under applicable law.
            </li>
            <li>
              <strong>Jurisdiction:</strong> Legal jurisdiction and venue for
              disputes are in Palm Beach County, Florida, unless you are an EU
              consumer.
            </li>
          </ul>
        </section>

        <section>
          <h2>Changes and Updates Notice</h2>
          <p>
            We continuously update and improve Generlate, which may lead to
            changes in our content, services, and legal documents.
          </p>
          <ul>
            <li>
              <strong>Notification:</strong> Significant changes will be
              communicated via our website, email, or direct notifications.
            </li>
            <li>
              <strong>Review Encouraged:</strong> We encourage regular review of
              our legal documents. Continued use after changes implies
              acceptance.
            </li>
          </ul>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions, concerns, or inquiries regarding our
            legal policies, please feel free to reach out to us at:
          </p>
          <p>
            <strong>Email:</strong> austencabret@generlate.com
          </p>
          <p>
            We aim to respond to all inquiries promptly and appreciate your
            feedback and questions.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default transition(Legal);
