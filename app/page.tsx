"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronUp, Volume2, VolumeX } from "lucide-react";
import { Counter, Crop, Dots, NavButton, Reveal, useSnapCarousel } from "@/components/landing/primitives";
import { FROM_HOME_KEY } from "@/components/landing/booking-form";

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

// YouTube Shorts from the Yantra Media channel.
const clientWorks = [
  { id: "47OIBCIXi9U", title: "Looking for a professional website that drives business growth?" },
  { id: "nQnwKEBr1XY", title: "A brand new jewellery website experience, designed and developed by Yantra Media" },
  { id: "8V0D9up2pcI", title: "Website design and development for e-commerce brand Sanmati Traders" },
  { id: "PmU0TZyOCWY", title: "Website designed for The Taplow Group" },
  { id: "odVCDtFVbjQ", title: "Website design for Rudraksh Hotel" },
  { id: "zim28_JgmqI", title: "Website designed for Life Save Hospital" },
  { id: "RHwEt4-VTjk", title: "Behind the new Kiswah Perfumes website" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Marketing Manager", quote: "Clean design, smooth navigation, and a website that truly reflects our brand. Great work by the Yantra Media team!", photo: "/testimonials/client-02.jpg" },
  { name: "Amit Agarwal", role: "Managing Director", quote: "Professional from start to finish. They understood our requirements and delivered a website aligned with our business goals.", photo: "/testimonials/client-03.jpg" },
  { name: "Vikram Malhotra", role: "Chief Marketing Officer", quote: "Our new website communicates our value proposition much better. The UI/UX and brand presentation are excellent.", photo: "/testimonials/client-04.jpg" },
  { name: "Neha Kapoor", role: "Founder & Director", quote: "Exactly the modern, elegant website we wanted. Yantra Media made the entire process simple and collaborative.", photo: "/testimonials/client-05.jpg" },
  { name: "Arjun Verma", role: "Digital Marketing Manager", quote: "The website is responsive, well-structured, and easy to navigate. A strong foundation for our digital marketing campaigns.", photo: "/testimonials/client-06.jpg" },
  { name: "Karan Bansal", role: "Co-Founder", quote: "Great attention to detail! The team balanced creativity with functionality and delivered a website that feels truly professional.", photo: "/testimonials/karan-bansal.png" },
  { name: "Ananya Iyer", role: "Marketing Director", quote: "We wanted a fresh digital identity, and Yantra Media delivered a polished website that fits our brand perfectly.", photo: "/testimonials/client-07.jpg" },
  { name: "Rohit Khanna", role: "Founder & CEO", quote: "A reliable team with a clear understanding of business needs. Our website looks modern and works smoothly across devices.", photo: "/testimonials/client-08.jpg" },
  { name: "Siddharth Rao", role: "Chief Operating Officer", quote: "The project was handled systematically, with clear communication and attention to functionality. A smooth overall experience.", photo: "/testimonials/client-09.jpg" },
];

const industries = ["Health Care", "E-Commerce", "Jewellery", "Enterprise", "Banking", "Insurance", "RealEstate", "Automobile", "Corporate", "Hotel’s", "Solar Power", "Education", "NGO", "News Portals"];

// h: row height, dx/dy: text offset from the number — the design spaces these unevenly
const workflow = [
  { text: <>Client Briefing &amp;<br />Requirement Mapping</>, h: 115, dx: 73, dy: 33 },
  { text: <>Research &amp;<br />Planning</>, h: 105, dx: 73, dy: 41 },
  { text: <>Wireframing &amp;<br />Content Structuring</>, h: 111, dx: 73, dy: 33 },
  { text: <>User Experience &amp;<br />Interface Design</>, h: 120, dx: 85, dy: 41 },
  { text: <>Development &amp;<br />Integration</>, h: 116, dx: 84, dy: 38 },
  { text: <>User Experience &amp;<br />Interface Design</>, h: 125, dx: 83, dy: 40 },
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

const YT_ORIGIN = "https://www.youtube-nocookie.com";

/**
 * YouTube Short in a design-sized card. The player is created when the card first comes into view and
 * autoplays muted on loop; it pauses off-screen. A transparent layer sits over the iframe so horizontal
 * swipes still move the carousel (the YouTube player would otherwise swallow them); tapping it toggles play.
 */
function VideoCard({ id, title, thumb = "oar2", className = "" }: { id: string; title: string; thumb?: string; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const userPaused = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  const command = useCallback((func: string) => {
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), YT_ORIGIN);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reduceMotion) setMounted(true);
        if (!userPaused.current) command("playVideo");
      } else {
        command("pauseVideo");
      }
    }, { threshold: 0.5 });
    observer.observe(card);
    return () => observer.disconnect();
  }, [command]);

  const togglePlay = () => {
    if (!mounted) { setMounted(true); return; }
    const next = !paused;
    userPaused.current = next;
    setPaused(next);
    command(next ? "pauseVideo" : "playVideo");
  };

  const toggleMute = () => {
    if (!mounted) setMounted(true);
    const next = !muted;
    setMuted(next);
    command(next ? "mute" : "unMute");
    if (!next && paused) { userPaused.current = false; setPaused(false); command("playVideo"); }
  };

  const src = `${YT_ORIGIN}/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`;

  return (
    <div className={`video-card ${className}`} ref={cardRef}>
      <img className="video-thumb" src={`https://i.ytimg.com/vi/${id}/${thumb}.jpg`} alt="" loading="lazy" />
      {mounted && (
        <iframe
          ref={frameRef} src={src} title={title} className={loaded ? "is-loaded" : ""}
          allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1} onLoad={() => setLoaded(true)}
        />
      )}
      <button type="button" className="video-play" onClick={togglePlay} aria-label={`${!mounted || paused ? "Play" : "Pause"} ${title}`}>
        {(!mounted || paused) && <img className="play-icon" src={`${A}/play-icon.svg`} alt="" width={71} height={80} />}
      </button>
      <button type="button" className="video-mute" onClick={toggleMute} aria-label={muted ? `Unmute ${title}` : `Mute ${title}`} aria-pressed={!muted}>
        {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
      </button>
    </div>
  );
}

function ClientWorks() {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(clientWorks.length);
  return (
    <section className="client-works" aria-labelledby="works-title">
      <Reveal><h2 id="works-title" className="title-grey works-title">Some of our client works</h2></Reveal>
      <div className="snap-track works-track" ref={trackRef} onScroll={onScroll}>
        {clientWorks.map((video) => <VideoCard key={video.id} {...video} />)}
      </div>
      <SlideControls count={clientWorks.length} index={index} goTo={goTo} label="client work" className="controls--works" />
    </section>
  );
}

function Testimonials() {
  const { trackRef, index, onScroll, goTo } = useSnapCarousel(testimonials.length);
  const [autoplay, setAutoplay] = useState(true);
  const stop = () => setAutoplay(false);

  // Auto-advance every 5s until the visitor swipes or taps a dot.
  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => goTo((index + 1) % testimonials.length), 5000);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, goTo]);

  return (
    <section className="testimonials" aria-label="What our clients say">
      <div className="snap-track testimonial-track" ref={trackRef} onScroll={onScroll} onPointerDown={stop}>
        {testimonials.map((t) => (
          <figure className="testimonial-card" key={t.name}>
            <blockquote className="testimonial-quote">“{t.quote}”</blockquote>
            <figcaption>
              <img className="testimonial-photo" src={t.photo} alt="" width={52} height={52} loading="lazy" />
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-role">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div onClickCapture={stop}><Dots count={testimonials.length} active={index} onSelect={goTo} label="Testimonials" /></div>
    </section>
  );
}

function Industries() {
  return (
    <section className="industries-section" aria-labelledby="industries-title">
      <Reveal><h2 id="industries-title" className="industries-title">We have collaborated with the industries</h2></Reveal>
      <ul className="industries">
        {industries.map((name, index) => (
          <motion.li key={name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (index % 3) * 0.06 + Math.floor(index / 3) * 0.05 }}>
            {name}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// Expanded "Know More" block. All x/y values are design coordinates (px from the left / top of the block).
const pos = (x: number, y: number) => ({ "--x": x, "--y": y }) as React.CSSProperties;

const awards = [
  { src: `${A}/award-1.png`, alt: "Indian Awards trophy", x: 35, w: 113, focus: "50% 22%" },
  { src: `${A}/award-3.png`, alt: "Tech Digital Marketing Awards certificate", x: 163, w: 112, focus: "50% 50%" },
  { src: `${A}/award-2.png`, alt: "Receiving an award", x: 290, w: 104, focus: "30% 50%" },
];

// x/y: photo circle; nx/ny and rx/ry: centre x and glyph top of the name and role text.
// Sagar Das and Subham Srivastav share a photo in the design.
const team = [
  { photo: "saptarshi-purkayastha", alt: "Saptarshi Purkayastha", name: <>Saptarshi<br />Purkayastha</>, role: <>Founder &amp; CEO</>, x: 40, y: 761, nx: 85, ny: 870, rx: 85.2, ry: 913.5 },
  { photo: "sagar-das", alt: "Sagar Das", name: <>Sagar Das</>, role: <>Director Operations &amp;<br />Business Development</>, x: 170, y: 761, nx: 215.5, ny: 870, rx: 215.8, ry: 913.5 },
  { photo: "tapashree-bhattacharjee", alt: "Tapashree Bhattacharjee", name: <>Tapashree<br />Bhattacharjee</>, role: <>Director, Influencer<br />Marketing, Audit &amp;<br />Strategy</>, x: 297, y: 761, nx: 343.5, ny: 870, rx: 343.8, ry: 913.5 },
  { photo: "uday-sarangi", alt: "Uday Sarangi", name: <>Uday Sarangi</>, role: <>Director, VFX &amp;<br />Audio</>, x: 39, y: 982, nx: 85.5, ny: 1091, rx: 84.2, ry: 1134.5 },
  { photo: "akash-singh", alt: "Akash Singh", name: <>Akash Singh</>, role: <>Manager- Operations<br />&amp; Business Development</>, x: 175, y: 982, nx: 216.8, ny: 1091, rx: 221.2, ry: 1134.5 },
  { photo: "sarmistha-dam", alt: "Sarmistha Dam", name: <>Sarmistha Dam</>, role: <>HR Manager</>, x: 305, y: 980, nx: 348.5, ny: 1089, rx: 351, ry: 1132.5 },
  { photo: "aman-jangra", alt: "Aman Jangra", name: <>Aman Jangra</>, role: <>Senior Project<br />Manager- Technical</>, x: 45, y: 1287, nx: 90.8, ny: 1396, rx: 91.5, ry: 1437.5 },
  { photo: "sagar-das", alt: "Subham Srivastav", name: <>Subham<br />Srivastav</>, role: <>Project Manager-<br />Technical</>, x: 167, y: 1285, nx: 213, ny: 1394, rx: 213.5, ry: 1437.5 },
  { photo: "asha-patil", alt: "Asha Patil", name: <>Asha Patil</>, role: <>Project Manager-<br />Technical</>, x: 289, y: 1285, nx: 334.5, ny: 1394, rx: 335.5, ry: 1437.5 },
  { photo: "anam-rizvi", alt: "Anam Rizvi", name: <>Anam Rizvi</>, role: <>SEO Manager</>, x: 48, y: 1490, nx: 93.5, ny: 1597, rx: 94.8, ry: 1642.5 },
  { photo: "keshav-rajput", alt: "Keshav Rajput", name: <>Keshav Rajput</>, role: <>VFX &amp; Production<br />Lead</>, x: 170, y: 1488, nx: 216.5, ny: 1597, rx: 216.4, ry: 1640.5 },
  { photo: "hetvi-faldu", alt: "Hetvi Faldu", name: <>Hetvi Faldu</>, role: <>Lead UI-UX<br />Designer</>, x: 292, y: 1488, nx: 338, ny: 1597, rx: 339.8, ry: 1640.5 },
  { photo: "chetan-jahangir", alt: "Chetan Jahangir", name: <>Chetan<br />Jahangir</>, role: <>Creative Head</>, x: 44, y: 1691, nx: 87, ny: 1800, rx: 86.5, ry: 1843.5 },
];

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
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll back to About first, then collapse once the scroll settles. Collapsing mid-scroll shrinks the
  // page under the scroll and cancels it; done afterwards, the collapse happens off-screen below.
  const collapse = () => {
    const section = sectionRef.current;
    if (!section) { setOpen(false); return; }
    const top = section.getBoundingClientRect().top + window.scrollY;
    if (Math.abs(window.scrollY - top) < 2) { setOpen(false); return; }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", finish);
      setOpen(false);
    };
    window.addEventListener("scrollend", finish);
    window.setTimeout(finish, 1200); // browsers without scrollend
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={`about ${open ? "is-open" : ""}`} id="about" aria-labelledby="about-title">
      <Reveal>
        <h2 id="about-title">About Us</h2>
        <p className="about-copy">Yantra Media is a creative and technology driven agency delivering innovative solutions in branding, digital marketing, UI/UX, web development, performance marketing, and technology.</p>
      </Reveal>
      <Reveal className="about-media" y={30}><VideoCard id="5hIBptOriIM" title="Yantra Media: Your One-Stop Marketing & Communication Partner" thumb="maxresdefault" className="video-card--wide" /></Reveal>
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
        <div className="about-gap" />
        <div id="about-more" className="about-more">
          <p className="celebrating-kicker" style={pos(68.5, 100.8)}>CELEBRATING</p>
          <img className="celebrating-logo" src={`${A}/six-years.png`} alt="6 Years Yantramedia — 2020–26" style={pos(107.8, 132.5)} />
          <p className="celebrating-copy" style={pos(217.75, 311.2)}>6 Years of Yantra Media —<br />Empowering Growth Through<br />Technology, Creativity &amp;<br />Innovation.</p>

          <h2 className="title-grey about-more-title" style={pos(214, 486.4)}>Awards &amp; Recognitions</h2>
          {awards.map((a) => (
            <img key={a.src} className="award-tile" src={a.src} alt={a.alt} style={{ ...pos(a.x, 540.5), "--w": a.w, objectPosition: a.focus } as React.CSSProperties} />
          ))}

          <h2 className="title-grey about-more-title" style={pos(209.25, 703.9)}>Leadership</h2>
          <h2 className="title-grey about-more-title" style={pos(237.75, 1230.9)}>Key- Management</h2>
          {team.map((m) => (
            <figure key={m.alt} className="team-member">
              <motion.img
                className="team-photo" src={`/team/${m.photo}.jpg`} alt={m.alt} loading="lazy" style={pos(m.x, m.y)}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              <figcaption>
                <span className="team-name" style={pos(m.nx, m.ny - 3.07)}>{m.name}</span>
                <span className="team-role" style={pos(m.rx, m.ry - 2.05)}>{m.role}</span>
              </figcaption>
            </figure>
          ))}

          <motion.button type="button" className="show-less" style={pos(29, 1929)} aria-controls="about-more" aria-expanded="true" onClick={collapse} whileTap={{ scale: 0.97 }}>
            <ChevronUp aria-hidden="true" />Show Less
          </motion.button>
        </div>
      </Expand>
    </section>
  );
}

const trustStats = [
  { to: 6, suffix: "+", label: <>Years in<br />Business</> },
  { to: 25, suffix: "+", label: <>Industry<br />Professionals</> },
  { to: 500, suffix: "+", label: <>Happy<br />Clients</> },
  { to: 1, suffix: "k+", label: <>Keywords<br />Optimised</> },
  { to: 150, suffix: "+", label: <>Website<br />Delivered</> },
];

/** Stats row two columns wide, as in the design; it auto-advances one column at a time until touched, and the arrow steps (looping at the end). */
function TrustStats() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    const track = trackRef.current;
    const column = track?.firstElementChild as HTMLElement | null;
    if (!track || !column) return;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    if (atEnd) track.scrollTo({ left: 0, behavior: "smooth" });
    else track.scrollBy({ left: column.offsetWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(next, 2800);
    return () => window.clearInterval(timer);
  }, [autoplay, next]);

  return (
    <div className="trust-row">
      <div className="trust-stats" ref={trackRef} onPointerDown={() => setAutoplay(false)}>
        {trustStats.map((stat) => (
          <div className="trust-stat" key={stat.suffix + stat.to}>
            <div className="trust-fig">
              {/* Invisible final value keeps the column width fixed while the counter runs. */}
              <p className="trust-num"><span className="trust-sizer" aria-hidden="true">{stat.to}{stat.suffix}</span><span className="trust-count"><Counter to={stat.to} suffix={stat.suffix} /></span></p>
              <p className="trust-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <motion.button type="button" className="trust-more" aria-label="Show more stats" onClick={() => { setAutoplay(false); next(); }} animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>&gt;</motion.button>
    </div>
  );
}

export default function Home() {
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

        <section className="workflow" aria-labelledby="workflow-title">
          <Reveal><h2 id="workflow-title">Our Proven Workflow</h2></Reveal>
          <ol>
            {workflow.map((step, index) => (
              <motion.li
                key={index} style={{ "--h": step.h, "--dx": step.dx, "--dy": step.dy } as React.CSSProperties}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="step-num">{index + 1}</span><span className="step-text">{step.text}</span>
              </motion.li>
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
          <Reveal><h3 className="seo-kicker">Live Client Google My<br />Business Analytics</h3></Reveal>
          <Reveal className="seo-media" y={24}>
            <img src={`${A}/seo-video.png`} alt="Google Business Profile results for Jeevan Jyoti Institute of Medical Sciences" />
            <motion.img className="seo-play" src={`${A}/play-badge.svg`} alt="" width={87.1186} height={90.9464} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
          </Reveal>
          <Reveal><h2 id="seo-title">Strategic SEO Drives Sales &amp; Generates More Google Calls</h2></Reveal>
          <Reveal className="seo-results">
            <p><Counter to={6000} suffix="+" /> Calls</p>
            <p><Counter to={1400} suffix="+" /> Website Enquiries</p>
            <p><Counter to={997} suffix="+" /> Directions</p>
          </Reveal>
        </section>

        <Industries />
        <About />
        <Testimonials />

        <section className="trust" aria-labelledby="trust-title">
          <Reveal><h2 id="trust-title" className="title-grey trust-title">Why Should you Trust Us!</h2></Reveal>
          <TrustStats />
        </section>

        <section className="strategy-call" aria-labelledby="strategy-title">
          <Reveal>
            <h2 id="strategy-title">Book a Website Strategy Call With Our Expert’s</h2>
            <p>You will have to fill a form, Our Team will get back to you!</p>
          </Reveal>
          <motion.div className="appointment-wrap" whileTap={{ scale: 0.97 }}>
            <Link href="/book" className="appointment-btn" onClick={() => { try { sessionStorage.setItem(FROM_HOME_KEY, "1"); } catch {} }}>Book Your Appointment</Link>
          </motion.div>
        </section>

        <Reveal className="brand-row">
          <img className="brand-mark" src={`${A}/ym-mark.gif`} alt="" />
          <img className="brand-word" src={`${A}/yantra-wordmark.svg`} alt="Yantramedia" width={173.842} height={26.1685} />
          <span className="brand-agency">Agency</span>
        </Reveal>

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

      </main>
    </MotionConfig>
  );
}
