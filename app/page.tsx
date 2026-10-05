"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Megaphone, Menu, Monitor, PenTool, Play, Search, Sparkles, X } from "lucide-react";

const workImages = ["/assets/work-card-1.svg", "/assets/work-card-2.svg", "/assets/work-card-3.svg", "/assets/work-card-4.svg", "/assets/work-card-5.svg"];
const categories = [
  { label: "Branding", icon: Sparkles }, { label: "Website", icon: Monitor }, { label: "Social Media", icon: Megaphone },
  { label: "Visual Design", icon: PenTool }, { label: "SEO", icon: Search },
];
const studies = [
  { title: "JJIMS Hospital", copy: "Building a trusted digital presence for a leading regional healthcare provider.", image: "/assets/jjims-hospital.png" },
  { title: "Ceyone Hotels", copy: "A destination-led identity designed to turn quiet escapes into memorable stays.", image: "/assets/case-ceyone.svg" },
  { title: "Raps Oven", copy: "A social-first launch campaign that gave a neighborhood bakery a fresh voice.", image: "/assets/work-card-5.svg" },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 34 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return <a className={`wordmark ${compact ? "wordmark--compact" : ""}`} href="#home" aria-label="Yantramedia home"><span className="wordmark-mark" aria-hidden="true">Y</span><span>Yantramedia</span></a>;
}

function LeadForm({ footer = false }: { footer?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  return (
    <form className={footer ? "footer-form" : "lead-form"} onSubmit={submit}>
      {!footer && <><h2>Get In Touch</h2><p>Let&apos;s transform your ideas into reality.</p></>}
      <label><span className="sr-only">Your name</span><input name="name" placeholder={footer ? "Name" : "Your name"} required /></label>
      {!footer && <label><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Your email" required /></label>}
      <label><span className="sr-only">Phone number</span><input name="phone" type="tel" placeholder="Phone number" required /></label>
      {footer && <label><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Email address" required /></label>}
      <label><span className="sr-only">Your message</span><textarea name="message" placeholder={footer ? "Your requirement" : "Your message"} required /></label>
      <button type="submit">{sent ? "Thanks — we’ll be in touch" : footer ? "Submit enquiry" : "Send message"}</button>
      <output className="sr-only" aria-live="polite">{sent ? "Your enquiry has been recorded." : ""}</output>
    </form>
  );
}

export default function Home() {
  const [activeWork, setActiveWork] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);
  const artY = useTransform(scrollYProgress, [0.32, 0.62], [45, -35]);
  const shiftWork = (direction: number) => setActiveWork((current) => (current + direction + workImages.length) % workImages.length);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <section className="hero" id="home">
        <header className="site-header shell">
          <Wordmark />
          <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation"><a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About us</a><a href="#services" onClick={closeMenu}>Services</a><a href="#work" onClick={closeMenu}>Work</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
        </header>
        <div className="hero-grid shell">
          <motion.div className="hero-copy" style={{ y: isMobile ? 0 : heroY }}>
            <img className="mark-logo" src="/assets/mark-logo.svg" alt="The Mark Branding Studio" />
            <p className="eyebrow">Strategy · Design · Digital</p>
            <h1>Branding<br /><em><span>S</span>tudio</em></h1>
            <p className="hero-intro">We build distinct identities that turn ambitious businesses into brands people remember.</p>
          </motion.div>
          <Reveal className="form-wrap" delay={0.16}><LeadForm /></Reveal>
        </div>
      </section>

      <section className="showreel section-pad" aria-labelledby="showreel-title"><div className="shell">
        <Reveal className="section-heading-row"><div><p className="eyebrow dark">Featured motion</p><h2 id="showreel-title">Show Reel</h2></div><p>A snapshot of the brands, stories and moving ideas we&apos;ve shaped.</p></Reveal>
        <Reveal className="reel-frame" delay={0.1}><div className="reel-noise" /><p>Ideas, in motion.</p><button aria-label="Play show reel" type="button"><Play fill="currentColor" /></button><span>00:48</span></Reveal>
      </div></section>

      <section className="premium" id="work" aria-labelledby="premium-title"><div className="shell premium-grid">
        <Reveal className="premium-copy"><p className="eyebrow dark">Selected project · 01</p><h2 id="premium-title">Some Premium<br />Work&apos;s</h2><h3>About the brand</h3><p>Kisan Rover is an Indian agri-tech startup making pesticide spraying safer, smarter and easier for farmers. We created a confident identity built for fields, screens and national attention.</p>
          <div className="work-controls" aria-label="Portfolio image controls"><button type="button" onClick={() => shiftWork(-1)} aria-label="Previous image"><ChevronLeft /> Previous</button><span>{String(activeWork + 1).padStart(2, "0")} / 05</span><button type="button" onClick={() => shiftWork(1)} aria-label="Next image">Next <ChevronRight /></button></div>
        </Reveal>
        <motion.div className="work-collage" style={{ y: isMobile ? 0 : artY }}>{workImages.map((image, index) => { const ordered = (index - activeWork + workImages.length) % workImages.length; return <motion.img key={image} className={`work-image work-image-${ordered + 1}`} src={image} alt={`Kisan Rover brand application ${index + 1}`} animate={{ opacity: ordered === 4 ? 0.72 : 1, scale: ordered === 0 ? 1.03 : 1 }} transition={{ duration: 0.45 }} />; })}</motion.div>
      </div></section>

      <section className="brand-story section-pad" id="about"><div className="shell story-grid">
        <Reveal className="story-copy"><p className="eyebrow dark">What we believe</p><h2>Creating visual identities through storytelling that leave a lasting impact.</h2><a className="button button-dark" href="#contact">Connect with us</a></Reveal>
        <Reveal className="story-art" delay={0.12}><motion.img whileHover={{ scale: 1.025, rotate: -1 }} src="/assets/visual-orange.svg" alt="Warm abstract spheres" /><motion.img whileHover={{ scale: 1.04, rotate: 2 }} src="/assets/visual-purple.svg" alt="Purple abstract ribbon" /></Reveal>
      </div></section>

      <section className="consult"><div className="shell consult-grid">
        <Reveal><p className="eyebrow light">Clarity before creativity</p><h2>Not sure how to position your brand?</h2><p>Start with a focused brand consultation. We&apos;ll turn the questions into a practical direction.</p><a className="button button-lime" href="#contact">Book a consultation</a></Reveal>
        <Reveal className="consult-art" delay={0.12}><img src="/assets/work-card-3.svg" alt="Graphic brand application" /><img src="/assets/work-card-4.svg" alt="Blue identity pattern" /></Reveal>
      </div></section>

      <section className="services-cases section-pad" id="services"><div className="shell">
        <Reveal><p className="eyebrow dark">Other works</p><div className="service-tabs">{categories.map(({ label, icon: Icon }, index) => <div className={index === 0 ? "active" : ""} key={label}><Icon aria-hidden="true" /><span>{label}</span></div>)}</div></Reveal>
        <div className="cases-heading"><Reveal><h2>Case Studies</h2></Reveal><a href="#contact">Start a project</a></div>
        <div className="case-grid">{studies.map((study, index) => <Reveal className="case-card" delay={index * 0.08} key={study.title}><div className="case-image"><img src={study.image} alt="" /></div><h3>{study.title}</h3><p>{study.copy}</p><a href="#contact" aria-label={`Read about ${study.title}`}>Read the story <ArrowUpRight /></a></Reveal>)}</div>
      </div></section>

      <section className="cta-wrap"><Reveal className="cta shell"><div><p>Want to elevate your brand experience?</p><h2>Let&apos;s make it unmistakable.</h2><a className="button button-olive" href="#contact">Get a call back</a></div></Reveal></section>

      <footer className="footer" id="contact"><div className="footer-overlay" /><div className="shell footer-grid">
        <div className="footer-brand"><Wordmark compact /><p>Agency</p><a href="#about">About us</a><a href="#work">Our work</a><a href="#contact">Careers</a></div>
        <div><h3>Services</h3><p>Brand identity<br />Social media marketing<br />Website design &amp; development<br />Video production<br />Visual design<br />Digital marketing</p></div>
        <div><h3>Noida</h3><p>1227, Gaur City Mall,<br />Greater Noida West,<br />Uttar Pradesh 201318</p><h3>Gurgaon</h3><p>Sector 56,<br />Gurgaon, Haryana 122011</p></div>
        <div className="footer-contact"><h3>Tell us about your project</h3><p>Business enquiries only. For jobs, please visit our careers page.</p><LeadForm footer /></div>
      </div><div className="shell footer-bottom"><p>© 2026 Yantramedia Agency. All rights reserved.</p><a href="#home">Back to top</a></div></footer>
    </main>
  );
}
