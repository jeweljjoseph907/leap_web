import { useEffect } from "react";
import { Link } from "react-router-dom";

const services = [
  "Ortho Rehabilitation",
  "Neuro Rehabilitation",
  "Pediatric Physiotherapy",
  "Sports Injury Management & Rehabilitation",
  "TMJ Disorder Rehabilitation",
  "Elderly Rehabilitation & Mobility Care",
  "Cardiopulmonary Care",
  "Women's Health & Wellness",
  "Pre & Post Natal Care",
  "Pain Management",
  "Post-Injury & Post-Surgery Recovery",
  "Ergonomics & Occupational Health",
  "Online Consultations Available",
];

const patientStories = [
  {
    name: "Amina Joseph",
    title: "Post-Surgery Knee Recovery",
    quote:
      "I returned to work and daily walking much faster than expected. The care plan felt personal and practical from day one.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "David Mensah",
    title: "Sports Injury Rehabilitation",
    quote:
      "The team rebuilt my strength and confidence step by step. I am back to training without fear of re-injury.",
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Grace Njeri",
    title: "Chronic Back Pain Management",
    quote:
      "My pain reduced significantly in just a few weeks, and now I know exactly how to manage posture and movement.",
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80",
  },
];

const careGallery = [
  {
    title: "One-on-One Guided Therapy",
    image:
      "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Mobility and Strength Sessions",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Compassionate Senior Care",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  },
];

const handleImageError = (event) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === "true") {
    return;
  }
  img.dataset.fallbackApplied = "true";
  img.src = "/assets/rehab-fallback.svg";
};

function HomePage() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const delayScale = 0.48;
    const durationScale = 0.72;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileMotion = window.matchMedia("(max-width: 960px), (pointer: coarse)").matches;
    const enableHeavyMotion = !reduceMotion && !mobileMotion;

    document.body.classList.add("is-loading");
    document.documentElement.style.setProperty("--scroll-shift", "0px");
    const header = document.querySelector(".site-header");
    const revealElements = document.querySelectorAll(".reveal, .reveal-stagger > *");
    const counters = document.querySelectorAll("[data-counter]");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    const magneticBtn = document.querySelector(".magnetic");
    const motionCards = document.querySelectorAll(".service-card, .gallery-card, .story-card, .spotlight-image");
    const photoParallax = document.querySelectorAll("[data-parallax]");
    const parallaxBlocks = document.querySelectorAll("[data-parallax-block]");
    const flowSections = document.querySelectorAll(".flow-section");
    const progressBar = document.querySelector(".scroll-progress span");
    let ticking = false;

    const pageReady = window.setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, 24);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach((el) => {
      const manualDelay = Number(el.dataset.delay || 0);
      const staggerParent = el.closest(".reveal-stagger");
      let staggerDelay = 0;

      if (staggerParent) {
        const baseStagger = Number(staggerParent.dataset.stagger || 110);
        const maxStagger = Number(staggerParent.dataset.staggerMax || 440);
        const parentDelay = Number(staggerParent.dataset.delay || 0);
        const siblings = [...staggerParent.children];
        const siblingIndex = siblings.indexOf(el);
        if (siblingIndex >= 0) {
          staggerDelay = parentDelay + Math.min(siblingIndex * baseStagger, maxStagger);
        }
      }

      const totalDelay = manualDelay + staggerDelay;
      el.style.transitionDelay = `${Math.floor(totalDelay * delayScale)}ms`;

      if (el.dataset.duration) {
        el.style.transitionDuration = `${Math.floor(Number(el.dataset.duration) * durationScale)}ms`;
      }

      revealObserver.observe(el);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-active");
          sectionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "-10% 0px -45% 0px" }
    );

    flowSections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("is-active");
      }
      sectionObserver.observe(section);
    });

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const el = entry.target;
          const target = Number(el.dataset.counter);
          const duration = 1400;
          const start = performance.now();

          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            const value = Math.floor(target * eased);
            el.textContent = target > 100 ? `${value}+` : `${value}%`;

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.55 }
    );

    counters.forEach((el) => counterObserver.observe(el));

    const handleHeaderState = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    const handleParallax = () => {
      const y = window.scrollY * 0.18;

      if (enableHeavyMotion) {
        document.querySelectorAll(".hero-layer").forEach((layer, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          layer.style.transform = `translate3d(0, ${y * direction}px, 0)`;
        });

        photoParallax.forEach((photo, index) => {
          const pace = 0.05 + index * 0.012;
          photo.style.transform = `translate3d(0, ${y * pace}px, 0)`;
        });

        parallaxBlocks.forEach((block, index) => {
          const pace = 0.03 + index * 0.01;
          block.style.transform = `translate3d(0, ${y * pace}px, 0)`;
        });
      } else {
        document.querySelectorAll(".hero-layer").forEach((layer) => {
          layer.style.transform = "translate3d(0, 0, 0)";
        });
        photoParallax.forEach((photo) => {
          photo.style.transform = "translate3d(0, 0, 0)";
        });
        parallaxBlocks.forEach((block) => {
          block.style.transform = "translate3d(0, 0, 0)";
        });
      }

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }

      if (enableHeavyMotion) {
        document.documentElement.style.setProperty("--scroll-shift", `${Math.round(Math.min(window.scrollY * 0.06, 64))}px`);
      }
    };

    const handleScrollFrame = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(() => {
        handleHeaderState();
        handleParallax();
        ticking = false;
      });
    };

    const handleMenuClick = () => {
      const isExpanded = menuToggle?.getAttribute("aria-expanded") === "true";
      menuToggle?.setAttribute("aria-expanded", String(!isExpanded));
      nav?.classList.toggle("open");
    };

    const closeMenu = () => {
      nav?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    };

    const handleMagneticMove = (event) => {
      if (!magneticBtn) {
        return;
      }
      const rect = magneticBtn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      magneticBtn.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
    };

    const resetMagnetic = () => {
      if (magneticBtn) {
        magneticBtn.style.transform = "translate(0, 0)";
      }
    };

    const createCardMoveHandler = (card) => (event) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateX = ((event.clientY - centerY) / rect.height) * -6;
      const rotateY = ((event.clientX - centerX) / rect.width) * 6;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const resetCard = (card) => () => {
      card.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)";
    };

    handleHeaderState();

    if (!enableHeavyMotion) {
      document.documentElement.style.setProperty("--scroll-shift", "0px");
      document.querySelectorAll(".hero-layer").forEach((layer) => {
        layer.style.transform = "translate3d(0, 0, 0)";
      });
      photoParallax.forEach((photo) => {
        photo.style.transform = "translate3d(0, 0, 0)";
      });
      parallaxBlocks.forEach((block) => {
        block.style.transform = "translate3d(0, 0, 0)";
      });
    }

    handleParallax();
    window.addEventListener("scroll", handleScrollFrame, { passive: true });

    menuToggle?.addEventListener("click", handleMenuClick);

    const navLinks = nav ? [...nav.querySelectorAll("a")] : [];
    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    if (!reduceMotion && !mobileMotion) {
      magneticBtn?.addEventListener("mousemove", handleMagneticMove);
      magneticBtn?.addEventListener("mouseleave", resetMagnetic);
    }

    const cardHandlers = !reduceMotion && !mobileMotion
      ? [...motionCards].map((card) => {
          const move = createCardMoveHandler(card);
          const leave = resetCard(card);
          card.addEventListener("mousemove", move);
          card.addEventListener("mouseleave", leave);
          return { card, move, leave };
        })
      : [];

    return () => {
      window.clearTimeout(pageReady);
      document.body.classList.remove("is-loading");
      document.body.classList.remove("is-ready");
      revealObserver.disconnect();
      sectionObserver.disconnect();
      counterObserver.disconnect();
      window.removeEventListener("scroll", handleScrollFrame);
      menuToggle?.removeEventListener("click", handleMenuClick);
      navLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      magneticBtn?.removeEventListener("mousemove", handleMagneticMove);
      magneticBtn?.removeEventListener("mouseleave", resetMagnetic);
      cardHandlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div className="page-bg" aria-hidden="true"></div>
      <div className="page-veil" aria-hidden="true">
        <span></span>
        <span></span>
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <span></span>
      </div>

      <header className="site-header" id="top">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="LEAP home">
            <img src="/assets/leap-mark.svg" alt="LEAP logo mark" />
            <div className="brand-copy">
              <p className="brand-main">LEAP</p>
              <p className="brand-sub">BY CASSAMARY</p>
            </div>
          </a>

          <button className="menu-toggle" aria-label="Open menu" aria-expanded="false" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="main-nav" aria-label="Main">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#approach">Approach</a>
            <Link to="/contact">Contact</Link>
            <Link to="/contact" className="btn btn-nav">
              Book Consultation
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section flow-section motion-hero" id="hero">
          <div className="hero-media" aria-hidden="true">
            <div className="hero-layer hero-layer-1"></div>
            <div className="hero-layer hero-layer-2"></div>
          </div>

          <div className="container hero-content hero-sequence">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="eyebrow reveal reveal-left" data-delay="120" data-duration="980">Advanced Physiotherapy Centre</p>
                <h1 className="headline reveal reveal-up" data-delay="240" data-duration="1120">
                  <span className="headline-line">Restoring Movement,</span>
                  <span className="headline-line headline-accent">Renewing Life</span>
                </h1>
                <p className="lead reveal reveal-up" data-delay="380" data-duration="1020">
                  At LEAP, we believe in healing through movement. Our expert physiotherapists help you
                  recover safely, rebuild strength, and return to what you love.
                </p>

                <div className="hero-actions reveal reveal-up" data-delay="520" data-duration="920">
                  <Link to="/contact" className="btn btn-primary magnetic">
                    Contact Us
                  </Link>
                  <a href="#services" className="btn btn-ghost">
                    Explore Services
                  </a>
                </div>

                <div className="hero-stats reveal-stagger" data-delay="620" data-stagger="130" data-stagger-max="460">
                  <article className="stat-card">
                    <p className="stat-number" data-counter="12">
                      0
                    </p>
                    <p className="stat-label">Specialized Care Programs</p>
                  </article>
                  <article className="stat-card">
                    <p className="stat-number" data-counter="2500">
                      0
                    </p>
                    <p className="stat-label">Rehab Sessions Delivered</p>
                  </article>
                  <article className="stat-card">
                    <p className="stat-number" data-counter="96">
                      0
                    </p>
                    <p className="stat-label">Patient Satisfaction %</p>
                  </article>
                </div>
              </div>

              <div className="hero-visual reveal reveal-up" aria-hidden="true" data-parallax-block="true" data-delay="280" data-duration="1200">
                <div className="hero-glow loop-float"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section spotlight flow-section" id="spotlight">
          <div className="container spotlight-wrap">
            <div className="spotlight-copy reveal reveal-left" data-delay="70" data-duration="820">
              <p className="eyebrow">People-Centered Care</p>
              <h2>Personalized Physiotherapy For Every Stage of Recovery</h2>
              <p>
                From post-injury rehabilitation to long-term mobility support, LEAP delivers treatment
                plans that are clinically sound, culturally empathetic, and built around your real life.
              </p>
              <ul className="check-list">
                <li>Individual attention in every session</li>
                <li>Clear home exercise plans and education</li>
                <li>Consistent progress tracking with measurable milestones</li>
              </ul>
            </div>

            <div className="spotlight-image reveal reveal-up" data-delay="180" data-duration="860">
              <img
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80"
                alt="Physiotherapist assisting a dark-skinned patient during upper-limb rehabilitation"
                loading="lazy"
                onError={handleImageError}
                data-parallax="true"
              />
            </div>
          </div>
        </section>

        <section className="section about flow-section" id="about">
          <div className="container split">
            <div className="split-copy reveal reveal-left" data-delay="70" data-duration="800">
              <p className="eyebrow">Why LEAP</p>
              <h2>Move Free. Live Strong.</h2>
              <p>
                We blend evidence-based physiotherapy with a highly personal care model. Every
                recovery plan is built around your mobility goals, lifestyle, and long-term function.
              </p>
              <ul className="check-list">
                <li>One-on-one expert physiotherapist guidance</li>
                <li>Condition-specific rehab programs</li>
                <li>Outcome-focused treatment with measurable progress</li>
              </ul>
            </div>

            <div className="split-cards reveal-stagger">
              <article className="glass-card">
                <h3>Assessment First</h3>
                <p>Precise diagnosis and movement analysis before intervention.</p>
              </article>
              <article className="glass-card">
                <h3>Progressive Rehab</h3>
                <p>Step-by-step plans that reduce pain and rebuild confidence.</p>
              </article>
              <article className="glass-card">
                <h3>Prevention Focus</h3>
                <p>Long-term strategies to prevent recurrence and improve quality of life.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section services flow-section motion-services" id="services">
          <div className="container">
            <p className="eyebrow reveal reveal-left" data-delay="40" data-duration="620">Our Services</p>
            <h2 className="section-title reveal reveal-up" data-delay="90" data-duration="680">Comprehensive Rehabilitation & Wellness Care</h2>

            <div className="service-grid reveal-stagger" data-delay="140" data-stagger="62" data-stagger-max="560">
              {services.map((service, index) => (
                <article className="service-card" key={service} data-duration="560" data-delay={String(index < 3 ? 0 : 40)}>
                  {service}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section approach flow-section" id="approach">
          <div className="container approach-wrap">
            <div className="approach-panel reveal reveal-left" data-delay="70" data-duration="820">
              <p className="eyebrow">Our Approach</p>
              <h2>Healing Through Movement</h2>
              <p>
                A modern physiotherapy experience designed to feel calm, precise, and motivating.
                From pain relief to full function, we guide each stage with clinical clarity and care.
              </p>
            </div>

            <div className="timeline reveal-stagger">
              <article className="step">
                <span>01</span>
                <h3>Consult & Evaluate</h3>
                <p>Detailed history, physical exam, and functional baseline.</p>
              </article>
              <article className="step">
                <span>02</span>
                <h3>Plan & Treat</h3>
                <p>Targeted therapy sessions tailored to your condition and goals.</p>
              </article>
              <article className="step">
                <span>03</span>
                <h3>Train & Sustain</h3>
                <p>Strength, mobility, and ergonomic education for lasting outcomes.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section gallery flow-section" id="gallery">
          <div className="container">
            <p className="eyebrow reveal reveal-left" data-delay="60" data-duration="760">Inside LEAP</p>
            <h2 className="section-title reveal reveal-up" data-delay="130" data-duration="840">Care Environment & Treatment Moments</h2>
            <div className="gallery-grid reveal-stagger">
              {careGallery.map((item) => (
                <article className="gallery-card" key={item.title}>
                  <img src={item.image} alt={item.title} loading="lazy" onError={handleImageError} />
                  <div className="gallery-card-overlay">
                    <h3>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stories flow-section motion-stories" id="stories">
          <div className="container">
            <p className="eyebrow reveal reveal-left" data-delay="130" data-duration="820">Patient Stories</p>
            <h2 className="section-title reveal reveal-up" data-delay="220" data-duration="980">Real Progress, Real Confidence</h2>
            <div className="story-grid reveal-stagger" data-delay="290" data-stagger="145" data-stagger-max="680">
              {patientStories.map((story) => (
                <article className="story-card" key={story.name} data-duration="940">
                  <img src={story.image} alt={story.name} loading="lazy" onError={handleImageError} />
                  <div className="story-content">
                    <p className="story-title">{story.title}</p>
                    <p className="story-quote">“{story.quote}”</p>
                    <p className="story-name">{story.name}</p>
                  </div>
                </article>
              ))}
            </div>
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

export default HomePage;
