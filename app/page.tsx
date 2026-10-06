"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Counter, Crop, Dots, EnquirySheet, NavButton, Reveal, useSnapCarousel } from "@/components/landing/primitives";

const A = "/figma";

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

const industries = ["HealthCare", "E-Commerce", "Jewellery", "Enterprise", "Banking", "Insurance", "RealEstate", "Automobile", "Corporate", "Hotel’s", "Solar Power", "Education", "NGO", "News Portals"];

const clientWorks = [
  { src: `${A}/client-work-1.png`, alt: "Kiswah launch video" },
  { src: `${A}/client-work-2.png`, alt: "Client mobile website video" },
];

const testimonials = [
  { src: `${A}/testimonial-1.png`, alt: "Client video testimonial" },
  { src: `${A}/testimonial-2.png`, alt: "Client video testimonial" },
];

const recentProjects = [{ src: `${A}/recent-projects.jpg`, alt: "Sanmati Traders e-commerce website" }];

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

function VideoCarousel({ slides, className, label, controls = false }: { slides: { src: string; alt: string }[]; className: string; label: string; controls?: boolean }) {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(slides.length);
  return (
    <>
      <div className={`snap-track ${className}`} ref={trackRef} onScroll={onScroll}>
        {slides.map((slide) => (
          <div className="video-card" key={slide.src}>
            <img src={slide.src} alt={slide.alt} />
            <img className="play-icon" src={`${A}/play-icon.svg`} alt="" width={71} height={80} />
          </div>
        ))}
      </div>
      {controls && <SlideControls count={slides.length} index={index} goTo={goTo} label={label} className="controls--works" />}
    </>
  );
}

function FeaturedWorks() {
  const [active, setActive] = useState(0);
  const go = (next: number) => setActive(Math.max(0, Math.min(industries.length - 1, next)));

  return (
    <section className="featured" id="work" aria-labelledby="featured-title">
      <Reveal>
        <h2 id="featured-title" className="featured-title">Few of our featured<br />website works</h2>
        <p className="featured-sub">Explore some of our work across the industries we&apos;ve served.</p>
      </Reveal>
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

function RecentProjects() {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(recentProjects.length);
  return (
    <section className="recent" aria-labelledby="recent-title">
      <div className="recent-media">
        <h2 id="recent-title">Recent Projects Delivered</h2>
        <div className="snap-track recent-track" ref={trackRef} onScroll={onScroll}>
          {recentProjects.map((p) => <img key={p.src} src={p.src} alt={p.alt} />)}
        </div>
      </div>
      <SlideControls count={recentProjects.length} index={index} goTo={goTo} label="project" className="controls--recent" />
    </section>
  );
}

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const enquire = () => setSheetOpen(true);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
    <main className="page">
      <header className="site-header" id="home">
        <motion.img src={`${A}/ym-logo-full.png`} alt="Yantramedia — Connect. Experience" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} />
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <motion.h1 id="hero-title" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
          {["Get a Professional", "Website — We", "Don’t Just Deliver It,"].map((line) => (
            <motion.span key={line} className="hero-line" variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>{line} </motion.span>
          ))}
          <motion.strong className="hero-line" variants={{ hidden: { opacity: 0, y: 22, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } } }}>We Manage It.</motion.strong>
        </motion.h1>
        <motion.div className="hero-devices" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <motion.img src={`${A}/hero-devices.png`} alt="Sanmati Traders website shown on an iMac" animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
        <motion.button type="button" className="enquire-btn" onClick={enquire} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} whileTap={{ scale: 0.97 }}>
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

      <section className="client-works" aria-labelledby="works-title">
        <Reveal><h2 id="works-title" className="title-grey">Some of our client works</h2></Reveal>
        <VideoCarousel slides={clientWorks} className="works-track" label="client work" controls />
      </section>

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

      <RecentProjects />

      <section className="ecom" aria-labelledby="ecom-title">
        <motion.img className="ecom-globe" src={`${A}/ecom-hero.png`} alt="" animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <Reveal className="ecom-copy">
          <h2 id="ecom-title">From Design to Daily Management —<br />Your E-Commerce,<br />Handled End-to-End.<br /><b><Counter to={150} suffix="+" /></b> Websites Delivered.</h2>
          <motion.button type="button" className="pill-btn" onClick={enquire} whileTap={{ scale: 0.95 }}>Get a Call Back!</motion.button>
        </Reveal>
      </section>

      <section className="testimonials" aria-labelledby="testimonials-title">
        <Reveal><h2 id="testimonials-title" className="title-grey">What Our Client Says</h2></Reveal>
        <VideoCarousel slides={testimonials} className="testimonial-track" label="testimonial" />
      </section>

      <Reveal className="strategy" y={36}>
        <p>Book a 30-minute Marketing Strategy Call for just ₹99* for a Live Digital Audit &amp; Expert Growth Strategy for your business.</p>
        <div className="strategy-actions">
          <motion.a href="#about" className="strategy-btn strategy-btn--light" whileTap={{ scale: 0.95 }}>Know More</motion.a>
          <motion.button type="button" className="strategy-btn strategy-btn--dark" onClick={enquire} whileTap={{ scale: 0.95 }}>Book Now</motion.button>
        </div>
      </Reveal>

      <section className="case-study" aria-labelledby="case-title">
        <Reveal><h2 id="case-title" className="title-grey">UI-UX Case Study</h2></Reveal>
        <Reveal className="case-media" y={20}><img src={`${A}/uiux-case.png`} alt="Redefining Global Brand Presence for The Taplow Group" /></Reveal>
        <Reveal>
          <p className="case-copy">Website Designed for a Global CorporateBrand with User Experience a Global Brand with User Experience</p>
          <a className="case-link" href="#case-title">Read Case Study &gt;</a>
        </Reveal>
        <Dots count={1} active={0} onSelect={() => {}} label="Case studies" />
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
        <motion.button type="button" className="pill-btn pill-btn--center" onClick={enquire} whileTap={{ scale: 0.95 }}>Get a Free Audit &gt;</motion.button>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <Reveal>
          <h2 id="about-title">About Us</h2>
          <p className="about-copy">Yantra Media is a creative and technology driven agency delivering innovative solutions in branding, digital marketing, UI/UX, web development, performance marketing, and technology.</p>
        </Reveal>
        <Reveal className="about-media" y={30}><img src={`${A}/about-media.png`} alt="Social media content showreel" /></Reveal>
        <Reveal className="founder">
          <div className="founder-photo"><img src={`${A}/founder.png`} alt="Saptarshi Purkayastha" /></div>
          <div>
            <h3>Saptarshi Purkayastha</h3>
            <p>Founder &amp; CEO</p>
            <a className="linkedin-btn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Saptarshi Purkayastha on LinkedIn">
              <Crop className="linkedin-logo" src={`${A}/linkedin.png`} crop={{ w: "100%", h: "300%", l: "0", t: "-100%" }} />
            </a>
          </div>
        </Reveal>
      </section>

      <section className="celebrating" aria-label="Celebrating 6 years">
        <Reveal>
          <p className="celebrating-kicker">CELEBRATING</p>
          <motion.img src={`${A}/six-years.png`} alt="6 Years Yantramedia — 2020–26" initial={{ scale: 0.85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 160, damping: 14 }} />
          <p className="celebrating-copy">6 Years of Yantra Media — Empowering Growth Through Technology, Creativity &amp; Innovation.</p>
        </Reveal>
      </section>

      <section className="awards" aria-labelledby="awards-title">
        <Reveal><h2 id="awards-title" className="title-grey">Awards &amp; Recognitions</h2></Reveal>
        <div className="awards-collage">
          <Reveal className="award award--1" x={-24} y={0}><Crop src={`${A}/award-1.png`} alt="Indian Awards trophy" crop={{ w: "100.16%", h: "157.38%", l: "-0.08%", t: "0" }} /></Reveal>
          <Reveal className="award award--2" x={24} y={0} delay={0.12}><Crop src={`${A}/award-2.png`} alt="Receiving an award" crop={{ w: "187.73%", h: "147.42%", l: "-43.72%", t: "0.17%" }} /></Reveal>
          <Reveal className="award award--3" x={-24} y={0} delay={0.2}><img src={`${A}/award-3.png`} alt="Tech Digital Marketing Awards 2025 certificate" /></Reveal>
        </div>
      </section>

      <section className="trust" aria-labelledby="trust-title">
        <Reveal><h2 id="trust-title" className="title-grey">Why Should you Trust Us!</h2></Reveal>
        <div className="trust-stats">
          <p className="trust-num trust-num--1"><Counter to={6} suffix="+" /></p>
          <p className="trust-label trust-label--1">Years in<br />Business</p>
          <i className="trust-divider" />
          <p className="trust-num trust-num--2"><Counter to={25} suffix="+" /></p>
          <p className="trust-label trust-label--2">Industry<br />Professionals</p>
          <motion.span className="trust-more" aria-hidden="true" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>&gt;</motion.span>
        </div>
      </section>

      <section className="team" aria-label="Team Yantra Media">
        <Reveal className="team-photo" y={0}>
          <img src={`${A}/team.png`} alt="Team Yantra Media" />
          <span className="team-vignette" />
          <span className="team-caption">Team Yantra Media</span>
        </Reveal>
        <Reveal className="brand-row">
          <img className="brand-mark" src={`${A}/ym-mark.gif`} alt="" />
          <img className="brand-word" src={`${A}/yantra-wordmark.svg`} alt="Yantramedia" width={173.842} height={26.1685} />
          <span className="brand-agency">Agency</span>
        </Reveal>
        <motion.button type="button" className="callback-btn" onClick={enquire} whileTap={{ scale: 0.97 }}>Get a Call Back from us!</motion.button>
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
