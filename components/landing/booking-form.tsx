"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import emailjs from "@emailjs/browser";

type Lang = "en" | "hi";

type FieldCopy = { label: ReactNode; placeholder?: string };

type Copy = {
  langName: string;
  readIn: string;
  intro: ReactNode;
  fields: Record<string, FieldCopy>;
  answer: string;
  shareLink: string;
  noteBlock: ReactNode;
  consent: ReactNode;
  submit: string;
  minWords: (words: number) => string;
  doneTitle: string;
  doneBody: string;
  doneHome: string;
  close: string;
};

// Line breaks are placed by hand so each block keeps the same number of lines as the design.
const copy: Record<Lang, Copy> = {
  en: {
    langName: "English",
    readIn: "Read In:",
    intro: <>It will take 5 Mins to Fill this form<br />as we really wanted to know more<br />details about you and your<br />requirements then our team will<br />get back to you!</>,
    fields: {
      name: { label: "Your Name*" },
      phone: { label: "Phone No*" },
      industry: { label: "Industry*" },
      designation: { label: "Your Designation*" },
      websiteType: { label: <>What kind of website do you<br />Want?*</> },
      budget: { label: <>Any Budget you have in<br />your mind?*</> },
      business: { label: <>Please describe your business<br />in few words so we know your<br />business better*(min 20 words)</> },
      socialLink: { label: <>Can you share your business<br />social link(if any):</> },
      competitor: { label: "Any Competitor You Consider:" },
      location: { label: "Where are you located?*" },
      callTime: { label: "When can we call you?*" },
    },
    answer: "Your Answer:",
    shareLink: "Share Link:",
    noteBlock: <>If you Fill all of these we are done,<br />Our Business Team will get back<br />with a complete Audit of Your<br />business if you qualify for the Live<br />Strategy Call Please Note How<br />you fill the form matters!</>,
    consent: <>Pick Tick, If you have filled<br />all these details by yourself<br />and you wanted to know<br />more about our Service at<br />Yantra Media. If you want to<br />cancel the Appointment Please<br />Cancel,Or else we are waiting<br />to Meet you.</>,
    submit: "Book a Strategy Call",
    minWords: (n) => `Please write at least 20 words (${n} so far).`,
    doneTitle: "Thank you!",
    doneBody: "We've received your details. Our Business Team will review them and get back to you about your Strategy Call.",
    doneHome: "Back to Home",
    close: "Close and go back",
  },
  hi: {
    langName: "हिंदी",
    readIn: "भाषा:",
    intro: <>इस फ़ॉर्म को भरने में 5 मिनट लगेंगे,<br />क्योंकि हम आपके और आपकी<br />ज़रूरतों के बारे में और जानना<br />चाहते हैं, इसके बाद हमारी टीम<br />आपसे संपर्क करेगी!</>,
    fields: {
      name: { label: "आपका नाम*" },
      phone: { label: "फ़ोन नंबर*" },
      industry: { label: "उद्योग*" },
      designation: { label: "आपका पद*" },
      websiteType: { label: <>आपको किस तरह की वेबसाइट<br />चाहिए?*</> },
      budget: { label: <>क्या आपके मन में कोई<br />बजट है?*</> },
      business: { label: <>कृपया अपने व्यवसाय के बारे में कुछ<br />शब्दों में बताएं ताकि हम उसे बेहतर<br />समझ सकें*(कम से कम 20 शब्द)</> },
      socialLink: { label: <>क्या आप अपने व्यवसाय का सोशल<br />लिंक साझा कर सकते हैं (यदि हो):</> },
      competitor: { label: "आप किसे अपना प्रतिस्पर्धी मानते हैं:" },
      location: { label: "आप कहाँ स्थित हैं?*" },
      callTime: { label: "हम आपको कब कॉल कर सकते हैं?*" },
    },
    answer: "आपका उत्तर:",
    shareLink: "लिंक साझा करें:",
    noteBlock: <>ये सब भरते ही आपका काम पूरा!<br />अगर आप लाइव स्ट्रैटेजी कॉल के लिए<br />योग्य हैं, तो हमारी बिज़नेस टीम<br />आपके व्यवसाय के पूरे ऑडिट के साथ<br />आपसे संपर्क करेगी। ध्यान दें, आप<br />फ़ॉर्म कैसे भरते हैं, यह मायने रखता है!</>,
    consent: <>टिक करें, यदि आपने ये सभी<br />जानकारी स्वयं भरी है और आप<br />Yantra Media की सेवाओं के<br />बारे में और जानना चाहते हैं।<br />अगर आप अपॉइंटमेंट रद्द करना<br />चाहते हैं, तो कृपया रद्द करें,<br />वरना हम आपसे मिलने का<br />इंतज़ार कर रहे हैं।</>,
    submit: "स्ट्रैटेजी कॉल बुक करें",
    minWords: (n) => `कृपया कम से कम 20 शब्द लिखें (अब तक ${n})।`,
    doneTitle: "धन्यवाद!",
    doneBody: "हमें आपकी जानकारी मिल गई है। हमारी बिज़नेस टीम इसकी समीक्षा करके आपकी स्ट्रैटेजी कॉल के बारे में आपसे संपर्क करेगी।",
    doneHome: "होम पर वापस जाएँ",
    close: "बंद करें और वापस जाएँ",
  },
};

const introNote: Record<Lang, ReactNode> = {
  en: <>Please Note Based on the Info<br />you share we evaluated then plan<br />for a Call</>,
  hi: <>कृपया ध्यान दें, आपकी दी गई<br />जानकारी का मूल्यांकन करके हम<br />कॉल की योजना बनाएंगे</>,
};

type Field = {
  name: string;
  required?: boolean;
  multiline?: boolean;
  link?: boolean;
  type?: string;
  // Design coordinates on the 430px frame: label box (lx, ly), field box (fx, fy), placeholder inset (pl)
  lx: number; ly: number; fx: number; fy: number; pl: number;
};

const fields: Field[] = [
  { name: "name", required: true, lx: 32, ly: 385, fx: 31, fy: 421, pl: 15.6 },
  { name: "phone", required: true, type: "tel", lx: 36.7, ly: 522, fx: 30.7, fy: 553, pl: 19.2 },
  { name: "industry", required: true, lx: 40.5, ly: 645, fx: 35.3, fy: 676, pl: 19.3 },
  { name: "designation", required: true, lx: 33, ly: 771, fx: 35.3, fy: 809, pl: 18 },
  { name: "websiteType", required: true, lx: 33.3, ly: 908, fx: 35.3, fy: 967, pl: 18 },
  { name: "budget", required: true, lx: 34, ly: 1062.4, fx: 29.7, fy: 1129, pl: 17.9 },
  { name: "business", required: true, multiline: true, lx: 38.7, ly: 1225.4, fx: 29, fy: 1309, pl: 15.6 },
  { name: "socialLink", link: true, lx: 33, ly: 1486, fx: 29.7, fy: 1542, pl: 18.6 },
  { name: "competitor", link: true, lx: 28, ly: 1631, fx: 29.7, fy: 1665, pl: 18.6 },
  { name: "location", required: true, lx: 26.3, ly: 1757, fx: 32, fy: 1795, pl: 17.9 },
  { name: "callTime", required: true, lx: 25.3, ly: 1905, fx: 26, fy: 1943, pl: 18.3 },
];

const MIN_BUSINESS_WORDS = 20;
export const FROM_HOME_KEY = "ym-book-from-home";
const EMAILJS_SERVICE_ID = "service_b2sh7c9";
const EMAILJS_TEMPLATE_ID = "template_zdq1ej4";
const EMAILJS_PUBLIC_KEY = "0pr8gM3XYO1v_x3zn";

const pos = (x: number, y: number) => ({ "--x": x, "--y": y }) as React.CSSProperties;

function LanguagePicker({ lang, onChange, label }: { lang: Lang; onChange: (l: Lang) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="book-lang" style={pos(57, 107.8)} ref={ref}>
      <span className="book-lang-label" id="book-lang-label">{label}</span>
      <button type="button" className="book-lang-select" aria-haspopup="listbox" aria-expanded={open} aria-labelledby="book-lang-label book-lang-current" onClick={() => setOpen((o) => !o)}>
        <span id="book-lang-current">{copy[lang].langName}</span>
        <motion.span className="book-lang-chevron" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown aria-hidden="true" /></motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="book-lang-menu" role="listbox" aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
          >
            {(Object.keys(copy) as Lang[]).map((l) => (
              <li key={l} role="option" aria-selected={l === lang}>
                <button type="button" lang={l} className={l === lang ? "is-selected" : ""} onClick={() => { onChange(l); setOpen(false); }}>
                  {copy[l].langName}
                  {l === lang && <Check aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BookingForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];

  // Return to where the visitor was on the home page when they came from there; otherwise open home.
  function close() {
    let fromHome = false;
    try { fromHome = sessionStorage.getItem(FROM_HOME_KEY) === "1"; sessionStorage.removeItem(FROM_HOME_KEY); } catch {}
    if (fromHome) router.back();
    else router.push("/");
  }

  function checkWords(event: React.FormEvent<HTMLTextAreaElement>) {
    const el = event.currentTarget;
    const words = el.value.trim().split(/\s+/).filter(Boolean).length;
    el.setCustomValidity(words >= MIN_BUSINESS_WORDS ? "" : t.minWords(words));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current || submitting) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("EmailJS submission failed", error);
      setSubmitError(lang === "hi" ? "जानकारी भेजी नहीं जा सकी। कृपया फिर से प्रयास करें।" : "We couldn't send your details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="book-page" lang={lang}>
      <Link href="/" className="book-logo" aria-label="Yantramedia Agency — home">
        <img className="book-logo-mark" src="/figma/ym-mark.gif" alt="" />
        <img className="book-logo-word" src="/figma/yantra-wordmark.svg" alt="Yantramedia" width={173.842} height={26.1685} />
        <span className="book-logo-agency">Agency</span>
      </Link>
      <motion.button type="button" className="book-close" onClick={close} aria-label={t.close} whileTap={{ scale: 0.9 }}>
        <X aria-hidden="true" />
      </motion.button>

      {sent ? (
        <motion.section className="book-done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
          <h1>{t.doneTitle}</h1>
          <p>{t.doneBody}</p>
          <button type="button" onClick={close} className="book-submit book-done-home">{t.doneHome}</button>
        </motion.section>
      ) : (
        <form ref={formRef} onSubmit={submit} className="book-form">
          <LanguagePicker lang={lang} onChange={setLang} label={t.readIn} />

          <div className="book-intro" style={pos(59, 154.3)}>
            <p>{t.intro}</p>
            <p>{introNote[lang]}</p>
          </div>

          {fields.map((f) => {
            const placeholder = f.link ? t.shareLink : t.answer;
            const style = { ...pos(f.fx, f.fy), "--pl": f.pl } as React.CSSProperties;
            return (
              <div key={f.name} className="book-row">
                <label className="book-label" htmlFor={`book-${f.name}`} style={pos(f.lx, f.ly)}>{t.fields[f.name].label}</label>
                {f.multiline ? (
                  <textarea id={`book-${f.name}`} name={f.name} className="book-field book-field--area" style={style} placeholder={placeholder} required={f.required} onInput={checkWords} />
                ) : (
                  <input id={`book-${f.name}`} name={f.name} type={f.type ?? "text"} className="book-field" style={style} placeholder={placeholder} required={f.required} />
                )}
              </div>
            );
          })}

          <p className="book-note" style={pos(31.5, 2046)}>{t.noteBlock}</p>

          <label className="book-consent" style={pos(33, 2225)}>
            <input type="checkbox" name="consent" required />
            <span>{t.consent}</span>
          </label>

          <motion.button type="submit" disabled={submitting} aria-busy={submitting} className="book-submit" style={pos(26, 2410)} whileTap={{ scale: 0.98 }}>
            {submitting ? (lang === "hi" ? "भेजा जा रहा है..." : "Sending...") : t.submit}
          </motion.button>
          {submitError && <p className="book-submit-error" style={pos(31, 2491)} role="alert">{submitError}</p>}
        </form>
      )}
    </main>
  );
}
