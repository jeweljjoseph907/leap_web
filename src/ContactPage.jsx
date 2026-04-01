import { Link } from "react-router-dom";

function ContactPage() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="page-bg" aria-hidden="true"></div>

      <header className="site-header is-scrolled" id="top">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="LEAP home">
            <img src="/assets/leap-mark.svg" alt="LEAP logo mark" />
            <div className="brand-copy">
              <p className="brand-main">LEAP</p>
              <p className="brand-sub">BY CASSAMARY</p>
            </div>
          </Link>

          <nav className="main-nav" aria-label="Main">
            <Link to="/">Home</Link>
            <a href="/#services">Services</a>
            <a href="/#about">About</a>
            <a href="/#approach">Approach</a>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="contact-page-main">
        <section className="section contact-page-hero">
          <div className="container contact-page-wrap">
            <div className="contact-page-copy">
              <p className="eyebrow">Contact LEAP</p>
              <h1>Start Your Recovery Conversation</h1>
              <p>
                Tell us about your goals and concerns. Our team will guide you to the right rehabilitation
                plan and help you book a suitable consultation time.
              </p>
              <div className="contact-meta contact-meta-page">
                <a href="tel:+917356763274">+91 73567 63274</a>
                <a href="tel:+919526449846">+91 95264 49846</a>
                <a href="mailto:contact@leapphysiotherapy.in">contact@leapphysiotherapy.in</a>
                <a href="https://www.leapphysiotherapy.in" target="_blank" rel="noopener noreferrer">
                  www.leapphysiotherapy.in
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <h2>Request a Consultation</h2>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" placeholder="Enter your name" required />

              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" placeholder="Enter your phone" required />

              <label htmlFor="service">Service needed</label>
              <select id="service" name="service" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option value="orthopedic">Orthopedic rehabilitation</option>
                <option value="neuro">Neuro rehabilitation</option>
                <option value="sports">Sports injury rehabilitation</option>
                <option value="pain">Pain management</option>
              </select>

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Tell us how we can help"
              ></textarea>

              <button type="submit" className="btn btn-primary">
                Send Request
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container foot-wrap">
          <p>© 2026 LEAP by Cassamary. All rights reserved.</p>
          <button type="button" className="back-to-top" onClick={handleBackToTop}>
            Back to top
          </button>
        </div>
      </footer>
    </>
  );
}

export default ContactPage;
