"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Counter, Crop, Dots, EnquirySheet, NavButton, Reveal, useSnapCarousel } from "@/components/landing/primitives";

const A = "/figma";
const INSTAGRAM_URL = "https://www.instagram.com/";

// pad/gap: design spacing above each label and below it to the divider
const services = [
  { label: <>UI/UX Designing</>, pad: 50, gap: 41 },
  { label: <>Website Designing</>, pad: 46, gap: 39 },
  { label: <>Landing Page<br />Designing for Ads</>, pad: 48, gap: 35 },
  { label: <>E-Commerce<br />Website’s</>, pad: 38, gap: 44 },
  { label: <>Web &amp; Mobile<br />Applications</>, pad: 37, gap: 33 },
  { label: <>SEO, GEO, AEO</>, pad: 52, gap: 62 },
  { label: <>Branding</>, pad: 56, gap: 0 },
];

const featuredWorks = [
  { src: `${A}/works/01-sanmati-traders.jpg`, alt: "Sanmati Traders electronics store website" },
  { src: `${A}/works/02-kiswah-perfumes.jpg`, alt: "Kiswah Perfumes luxury fragrance website" },
  { src: `${A}/works/03-maya-jewellers.jpg`, alt: "Maya Jewellers gold jewellery website" },
  { src: `${A}/works/04-mediland-hospital.jpg`, alt: "Mediland Hospital & Research Centre website" },
  { src: `${A}/works/05-mahira.jpg`, alt: "Mahira bridal and saree fashion website" },
  { src: `${A}/works/06-muina.jpg`, alt: "Muina Korean skincare website" },
  { src: `${A}/works/07-mistral-of-milan.jpg`, alt: "Mistral of Milan makeup website" },
  { src: `${A}/works/08-skyblue-institute.jpg`, alt: "Skyblue Institute of Design coaching website" },
  { src: `${A}/works/09-mediland-app.jpg`, alt: "Mediland doctor booking mobile app design" },
];

const clientWorks = [
  { src: `${A}/client-work-1.png`, alt: "Kiswah launch video" },
  { src: `${A}/client-work-2.png`, alt: "Client mobile website video" },
];

const testimonials = [
  {
    name: "Dr.Kinnor Das",
    role: "CEO CUTEX SKINCARE CLINIC",
    quote: <>Yantra media has done a very good website<br />we highly recommend Yantra will all our efforts<br />and we insits to get every website from them<br />team is professional and Quick responce</>,
  },
];

const industries = ["HealthCare", "E-Commerce", "Jewellery", "Enterprise", "Banking", "Insurance", "RealEstate", "Automobile", "Corporate", "Hotel’s", "Solar Power", "Education", "NGO", "News Portals"];

const workflow = [
  <>Client Briefing &amp;<br />Requirement Mapping</>,
  <>Research &amp;<br />Planning</>,
  <>Wireframing &amp;<br />Content Structuring</>,
  <>User Experience &amp;<br />Interface Design</>,
  <>Development &amp;<br />Integration</>,
  <>User Experience &amp;<br />Interface Design</>,
];

const otherServices = ["Brand Identity", "Social Media Marketing", "Website Design and Development", "Video Production", "Visual Designing", "2D and 3D Animation", "Mobile Apps", "Digital Marketing"];

function Logos() {
  return (
    <>
      <img className="logo logo--fortis" src={`${A}/client-1951.png`} alt="Fortis" />
      <div className="logo logo--mistral" role="img" aria-label="Mistral of Milan">
        <Crop className="mistral-mask" src={`${A}/client-sprite.png`} crop={{ w: "100%", h: "338.97%", l: "0", t: "-60.27%" }} />
        <Crop className="mistral-word" src={`${A}/client-sprite.png`} crop={{ w: "100%", h: "306.16%", l: "0", t: "-143.15%" }} />
      </div>
      <img className="logo logo--indrive" src={`${A}/client-116.png`} alt="inDrive" />
      <img className="logo logo--csb" src={`${A}/client-x11.png`} alt="CSB Bank" />
    </>
  );
}

function Marquee({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""}`}>
      <div className="marquee-track">
        <div className="marquee-set"><Logos /></div>
        <div className="marquee-set" aria-hidden="true"><Logos /></div>
      </div>
    </div>
  );
}

function SlideControls({ count, index, goTo, label, className = "" }: { count: number; index: number; goTo: (i: number) => void; label: string; className?: string }) {
  return (
    <div className={`controls ${className}`}>
      <NavButton dir="prev" label={`Previous ${label}`} disabled={index === 0} onClick={() => goTo(index - 1)} />
      <Dots count={count} active={index} onSelect={goTo} label={label} />
      <NavButton dir="next" label={`Next ${label}`} disabled={index === count - 1} onClick={() => goTo(index + 1)} />
    </div>
  );
}

function FeaturedWorks() {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(featuredWorks.length);
  const [autoplay, setAutoplay] = useState(true);
  const stop = () => setAutoplay(false);

  // Auto-advance until the visitor interacts with the carousel.
  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => goTo((index + 1) % featuredWorks.length), 4000);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, goTo]);

  return (
    <section className="featured" id="work" aria-labelledby="featured-title">
      <Reveal className="featured-heading"><h2 id="featured-title">Few of our featured<br />website works</h2></Reveal>
      <div className="snap-track featured-track" ref={trackRef} onScroll={onScroll} onPointerDown={stop}>
        {featuredWorks.map((work, i) => (
          <div className="featured-slide" key={work.src}><img src={work.src} alt={work.alt} loading={i === 0 ? "eager" : "lazy"} /></div>
        ))}
      </div>
      <div onClickCapture={stop}>
        <SlideControls count={featuredWorks.length} index={index} goTo={goTo} label="website work" className="controls--featured" />
      </div>
    </section>
  );
}

function ClientWorks() {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(clientWorks.length);
  return (
    <section className="client-works" aria-labelledby="works-title">
      <Reveal><h2 id="works-title" className="title-grey works-title">Some of our client works</h2></Reveal>
      <div className="snap-track works-track" ref={trackRef} onScroll={onScroll}>
        {clientWorks.map((slide) => (
          <div className="video-card" key={slide.src}>
            <img src={slide.src} alt={slide.alt} />
            <img className="play-icon" src={`${A}/play-icon.svg`} alt="" width={71} height={80} />
          </div>
        ))}
      </div>
      <SlideControls count={clientWorks.length} index={index} goTo={goTo} label="client work" className="controls--works" />
    </section>
  );
}

function Testimonials() {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(testimonials.length);
  return (
    <section className="testimonials" aria-label="What our clients say">
      <div className="snap-track testimonial-track" ref={trackRef} onScroll={onScroll}>
        {testimonials.map((t) => (
          <Reveal className="testimonial-card" key={t.name} y={30}>
            <img className="testimonial-avatar" src={`${A}/avatar-placeholder.svg`} alt="" width={72} height={72} />
            <p className="testimonial-name">{t.name}</p>
            <p className="testimonial-role">{t.role}</p>
            <p className="testimonial-quote">{t.quote}</p>
          </Reveal>
        ))}
      </div>
      <Dots count={testimonials.length} active={index} onSelect={goTo} label="Testimonials" />
    </section>
  );
}

function Industries() {
  const [active, setActive] = useState(0);
  const go = (next: number) => setActive(Math.max(0, Math.min(industries.length - 1, next)));

  return (
    <section className="industries-section" aria-labelledby="industries-title">
      <Reveal><h2 id="industries-title" className="industries-title">Explore some of our work across the industries we&apos;ve served.</h2></Reveal>
      <Reveal className="computer" delay={0.1}>
        <img className="computer-frame" src={`${A}/computer.png`} alt="" />
        <div className="computer-screen">
          <AnimatePresence initial={false}>
            <motion.img
              key={active} src={`${A}/computer-screen.png`} alt={`${industries[active]} website project`}
              initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
      </Reveal>
      <div className="controls controls--industry">
        <NavButton dir="prev" label="Previous industry" disabled={active === 0} onClick={() => go(active - 1)} />
        <div className="industry-label" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>{industries[active]}</motion.span>
          </AnimatePresence>
        </div>
        <NavButton dir="next" label="Next industry" disabled={active === industries.length - 1} onClick={() => go(active + 1)} />
      </div>
      <div className="industries" role="tablist" aria-label="Industries">
        {industries.map((name, index) => (
          <button key={name} type="button" role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>
            {index === active && <motion.span className="industry-pill" layoutId="industry-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="industry-name">{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Expand({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div className="expand" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function About() {
  const [open, setOpen] = useState(false);
  return (
    <section className={`about ${open ? "is-open" : ""}`} id="about" aria-labelledby="about-title">
      <Reveal>
        <h2 id="about-title">About Us</h2>
        <p className="about-copy">Yantra Media is a creative and technology driven agency delivering innovative solutions in branding, digital marketing, UI/UX, web development, performance marketing, and technology.</p>
      </Reveal>
      <Reveal className="about-media" y={30}><img src={`${A}/about-media.png`} alt="Social media content showreel" /></Reveal>
      <AnimatePresence initial={false}>
        {!open && (
          <motion.div className="know-more-wrap" exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.button type="button" className="know-more" aria-expanded={open} aria-controls="about-more" onClick={() => setOpen(true)} whileTap={{ scale: 0.95 }}>
              <span className="know-more-arrow" aria-hidden="true">&gt;</span>
              Know More
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <Expand open={open}>
        <div id="about-more">
          <div className="founder">
            <div className="founder-photo"><img src={`${A}/founder.png`} alt="Saptarshi Purkayastha" /></div>
            <div>
              <h3>Saptarshi Purkayastha</h3>
              <p>Founder &amp; CEO</p>
              <a className="linkedin-btn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Saptarshi Purkayastha on LinkedIn">
                <Crop className="linkedin-logo" src={`${A}/linkedin.png`} crop={{ w: "100%", h: "300%", l: "0", t: "-100%" }} />
              </a>
            </div>
          </div>
          <div className="celebrating">
            <p className="celebrating-kicker">CELEBRATING</p>
            <img src={`${A}/six-years.png`} alt="6 Years Yantramedia — 2020–26" />
            <p className="celebrating-copy">6 Years of Yantra Media — Empowering Growth Through Technology, Creativity &amp; Innovation.</p>
          </div>
          <div className="awards">
            <h2 className="title-grey">Awards &amp; Recognitions</h2>
            <div className="awards-collage">
              <div className="award award--1"><Crop src={`${A}/award-1.png`} alt="Indian Awards trophy" crop={{ w: "100.16%", h: "157.38%", l: "-0.08%", t: "0" }} /></div>
              <div className="award award--2"><Crop src={`${A}/award-2.png`} alt="Receiving an award" crop={{ w: "187.73%", h: "147.42%", l: "-43.72%", t: "0.17%" }} /></div>
              <div className="award award--3"><img src={`${A}/award-3.png`} alt="Tech Digital Marketing Awards 2025 certificate" /></div>
            </div>
          </div>
          <div className="team-photo">
            <img src={`${A}/team.png`} alt="Team Yantra Media" />
            <span className="team-vignette" aria-hidden="true" />
            <span className="team-caption">Team Yantra Media</span>
          </div>
        </div>
      </Expand>
    </section>
  );
}

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const enquire = () => setSheetOpen(true);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="page" id="home">
        <section className="hero" aria-labelledby="hero-title">
          <motion.h1 id="hero-title" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
            {["Get a Professional", "Website — We", "Don’t Just Deliver It,"].map((line) => (
              <motion.span key={line} className="hero-line" variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>{line} </motion.span>
            ))}
            <motion.strong className="hero-line" variants={{ hidden: { opacity: 0, y: 22, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } } }}>We Manage It.</motion.strong>
          </motion.h1>
          <motion.div className="hero-devices" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <motion.img src={`${A}/hero-devices.png`} alt="Sanmati Traders website shown on an iMac" animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>
          <motion.button type="button" className="enquire-btn" onClick={enquire} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }} whileTap={{ scale: 0.97 }}>
            Enquire Now
          </motion.button>
        </section>

        <section className="clients" aria-labelledby="clients-title">
          <Reveal><h2 id="clients-title" className="title-grey">Few of Our Clients</h2></Reveal>
          <Marquee />
          <Marquee reverse />
        </section>

        <section className="services" id="services" aria-labelledby="services-title">
          <Reveal><h2 id="services-title" className="services-title">Our Services</h2></Reveal>
          <Reveal className="services-card" y={40}>
            <ul>
              {services.map((service, index) => (
                <motion.li key={index} style={{ "--pad": service.pad, "--gap": service.gap } as React.CSSProperties} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.55 }}>
                  <span className="gradient-text">{service.label}</span>
                  {index < services.length - 1 && <motion.i className="divider" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }} />}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </section>

        <FeaturedWorks />
        <ClientWorks />

        <Reveal className="instagram" y={20}>
          <p>Join our Instagram<br />Community</p>
          <motion.a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="instagram-btn" whileTap={{ scale: 0.95 }}>Follow Us</motion.a>
        </Reveal>

        <section className="workflow" aria-labelledby="workflow-title">
          <Reveal><h2 id="workflow-title">Our Proven Workflow</h2></Reveal>
          <ol>
            {workflow.map((step, index) => (
              <Reveal key={index} x={-30} y={0} delay={0.05}>
                <li><span className="step-num">{index + 1}</span><span className="step-text">{step}</span></li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="ecom" aria-labelledby="ecom-title">
          <motion.img className="ecom-globe" src={`${A}/ecom-hero.png`} alt="" animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          <Reveal className="ecom-copy">
            <h2 id="ecom-title">From Design to Daily<br />Management —<br />Your E-Commerce,<br />Handled End-to-End.<br /><b><Counter to={150} suffix="+" /></b> Websites Delivered.</h2>
          </Reveal>
        </section>

        <section className="seo" aria-labelledby="seo-title">
          <Reveal><h2 id="seo-title">How Strategic SEO Drives Sales &amp; Generates More Google Calls</h2></Reveal>
          <Reveal className="seo-media" y={24}>
            <img src={`${A}/seo-video.png`} alt="Google Business Profile results for Jeevan Jyoti Institute of Medical Sciences" />
            <motion.img className="seo-play" src={`${A}/play-badge.svg`} alt="" width={87.1186} height={90.9464} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
          </Reveal>
          <p className="seo-caption">3 Over View</p>
          <Reveal className="seo-results">
            <h3>What we have<br />Generated with SEO</h3>
            <p><Counter to={6000} suffix="+" /> Calls</p>
            <p><Counter to={1400} suffix="+" /> Website Enquiries</p>
            <p><Counter to={997} suffix="+" /> Directions</p>
          </Reveal>
          <motion.button type="button" className="pill-btn seo-audit" onClick={enquire} whileTap={{ scale: 0.95 }}>Get a Free Audit &gt;</motion.button>
        </section>

        <Industries />
        <About />
        <Testimonials />

        <section className="trust" aria-labelledby="trust-title">
          <Reveal><h2 id="trust-title" className="title-grey trust-title">Why Should you Trust Us!</h2></Reveal>
          <div className="trust-stats">
            <p className="trust-num trust-num--1"><Counter to={6} suffix="+" /></p>
            <p className="trust-label trust-label--1">Years in<br />Business</p>
            <p className="trust-num trust-num--2"><Counter to={25} suffix="+" /></p>
            <p className="trust-label trust-label--2">Industry<br />Professionals</p>
            <motion.span className="trust-more" aria-hidden="true" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>&gt;</motion.span>
          </div>
        </section>

        <section className="brand-cta" aria-label="Contact Yantra Media">
          <Reveal className="brand-row">
            <img className="brand-mark" src={`${A}/ym-mark.gif`} alt="" />
            <img className="brand-word" src={`${A}/yantra-wordmark.svg`} alt="Yantramedia" width={173.842} height={26.1685} />
            <span className="brand-agency">Agency</span>
          </Reveal>
          <motion.button type="button" className="callback-btn" onClick={enquire} whileTap={{ scale: 0.97 }}>Get a Call Back in 10 Mins</motion.button>
        </section>

        <footer className="footer" id="contact">
          <div className="footer-texture" aria-hidden="true"><img src={`${A}/footer-texture.png`} alt="" /></div>
          <div className="footer-content">
            <h3>Other Services</h3>
            <ul>{otherServices.map((s) => <li key={s}>{s}</li>)}</ul>
            <h3 className="footer-coffee">Join us for a Coffee!</h3>
            <h3 className="footer-city">Gurgaon</h3>
            <p>Corporate&nbsp; Office:<br />1227, Gaur City Mall, Greater Noida West, Uttar Pradesh,<br />Pin- 201318</p>
            <h3 className="footer-city footer-city--noida">Noida</h3>
            <p>Founders Office:<br />1227, Gaur City Mall, Greater Noida West, Uttar Pradesh,<br />Pin- 201318</p>
            <small>©&nbsp; All Rights Reserved to Yantra Media Company_2026.</small>
          </div>
        </footer>

        <EnquirySheet open={sheetOpen} onClose={closeSheet} />
      </main>
    </MotionConfig>
  );
}
