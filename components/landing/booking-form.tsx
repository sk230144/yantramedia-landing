"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import emailjs from "@emailjs/browser";

type Lang = "en" | "hi";

type Copy = {
  langName: string;
  langLabel: string;
  welcome: ReactNode;
  fields: Record<string, ReactNode>;
  answer: string;
  shareLink: string;
  contactLabel: ReactNode;
  whatsapp: string;
  email: string;
  confirm: ReactNode;
  cancel: string;
  submit: string;
  sending: string;
  sendError: string;
  minWords: (words: number) => string;
  close: string;
};

// Line breaks are placed by hand so each block keeps the same number of lines as the design.
const copy: Record<Lang, Copy> = {
  en: {
    langName: "English",
    langLabel: "Form language",
    welcome: <>Welcome to Yantra Media,<br />we are happy to <span className="book-accent">connect</span><br />with you 😊.</>,
    fields: {
      name: "Your Name",
      phone: "Phone No",
      industry: "Industry",
      designation: "Your Designation",
      websiteType: <>What kind of website do you<br />Want?</>,
      budget: <>Any Budget you have in your mind? If it<br />is below 20k, you should consider a<br />Freelancer</>,
      business: <>Please describe your business &amp; your<br />vision in few words so we know your<br />business better(min 25 words)</>,
      socialLink: <>Can you share your business social link<br />or current website link (if any):</>,
      competitor: "Any Competitor You Consider:",
      location: "Where are you located?",
    },
    answer: "Your Answer:",
    shareLink: "Share Link:",
    contactLabel: <>Where would you like to do the<br />conversation ahead</>,
    whatsapp: "Whatsapp",
    email: "Email",
    confirm: <>One Final Confirmation!<br />Please tick the checkbox to confirm that you<br />have personally completed this form and are<br />genuinely interested in exploring<br />Yantra Media’s services.</>,
    cancel: "Cancel this Request",
    submit: "SUBMIT",
    sending: "SENDING...",
    sendError: "We couldn't send your details. Please try again.",
    minWords: (n) => `Please write at least 25 words (${n} so far).`,
    close: "Close and go back",
  },
  hi: {
    langName: "हिंदी",
    langLabel: "फ़ॉर्म की भाषा",
    welcome: <>Yantra Media में आपका स्वागत है,<br />हमें आपसे <span className="book-accent">जुड़कर</span> बहुत<br />खुशी हो रही है 😊।</>,
    fields: {
      name: "आपका नाम",
      phone: "फ़ोन नंबर",
      industry: "उद्योग",
      designation: "आपका पद",
      websiteType: <>आपको किस तरह की वेबसाइट<br />चाहिए?</>,
      budget: <>आपके मन में कोई बजट है? अगर यह<br />20k से कम है, तो आपको किसी<br />फ्रीलांसर पर विचार करना चाहिए</>,
      business: <>कृपया अपने व्यवसाय और विज़न के बारे<br />में कुछ शब्दों में बताएं ताकि हम उसे<br />बेहतर समझ सकें (कम से कम 25 शब्द)</>,
      socialLink: <>क्या आप अपने व्यवसाय का सोशल लिंक<br />या वेबसाइट लिंक साझा कर सकते हैं:</>,
      competitor: "आप किसे अपना प्रतिस्पर्धी मानते हैं:",
      location: "आप कहाँ स्थित हैं?",
    },
    answer: "आपका उत्तर:",
    shareLink: "लिंक साझा करें:",
    contactLabel: <>आप आगे की बातचीत कहाँ करना<br />चाहेंगे</>,
    whatsapp: "व्हाट्सऐप",
    email: "ईमेल",
    confirm: <>एक अंतिम पुष्टि!<br />कृपया टिक करके पुष्टि करें कि आपने यह<br />फ़ॉर्म स्वयं भरा है और आप वास्तव में<br />Yantra Media की सेवाओं को जानने<br />में रुचि रखते हैं।</>,
    cancel: "यह अनुरोध रद्द करें",
    submit: "सबमिट करें",
    sending: "भेजा जा रहा है...",
    sendError: "जानकारी भेजी नहीं जा सकी। कृपया फिर से प्रयास करें।",
    minWords: (n) => `कृपया कम से कम 25 शब्द लिखें (अब तक ${n})।`,
    close: "बंद करें और वापस जाएँ",
  },
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
  { name: "name", required: true, lx: 32, ly: 472.2, fx: 31, fy: 508, pl: 16.6 },
  { name: "phone", required: true, type: "tel", lx: 36.5, ly: 609.2, fx: 31, fy: 640, pl: 20.1 },
  { name: "industry", required: true, lx: 41, ly: 732.2, fx: 35.5, fy: 763, pl: 20.1 },
  { name: "designation", required: true, lx: 33, ly: 858.2, fx: 35.5, fy: 896, pl: 19.1 },
  { name: "websiteType", required: true, lx: 33.5, ly: 995.2, fx: 35.5, fy: 1054, pl: 19.1 },
  { name: "budget", required: true, lx: 34, ly: 1149.2, fx: 29.5, fy: 1228, pl: 19.1 },
  { name: "business", required: true, multiline: true, lx: 38.5, ly: 1312.2, fx: 29, fy: 1396, pl: 16.6 },
  { name: "socialLink", link: true, lx: 33, ly: 1573.2, fx: 29.5, fy: 1629, pl: 19.6 },
  { name: "competitor", link: true, lx: 28, ly: 1718.2, fx: 29.5, fy: 1752, pl: 19.6 },
  { name: "location", required: true, lx: 26.5, ly: 1844.2, fx: 32, fy: 1882, pl: 19.1 },
];

const MIN_BUSINESS_WORDS = 25;
const INSTAGRAM_URL = "https://www.instagram.com/yantramedia/";
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
    <div className="book-lang" ref={ref}>
      <button type="button" className="book-lang-select" aria-haspopup="listbox" aria-expanded={open} aria-label={`${label}: ${copy[lang].langName}`} onClick={() => setOpen((o) => !o)}>
        <span>{copy[lang].langName}</span>
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

function ThankYou() {
  return (
    <motion.section className="book-thanks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
      <img src="/book/thank-you.jpg" alt="" width={887} height={1774} />
      <div className="sr-only">
        <h1>Thank You for submitting the form!</h1>
        <p>Our team will review your details and get back to you shortly. In the meantime, follow us on Instagram for our latest updates, insights and work.</p>
      </div>
      {/* Transparent hit area over the "Follow us Now" button drawn in the artwork. */}
      <motion.a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="book-thanks-follow" whileTap={{ scale: 0.97 }}>
        <span className="sr-only">Follow us Now on Instagram</span>
      </motion.a>
    </motion.section>
  );
}

export function BookingForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [cancelRequest, setCancelRequest] = useState(false);
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
    // "Cancel this Request" ticked: nothing is sent, the visitor is taken back.
    if (cancelRequest) { close(); return; }

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
      setSubmitError(t.sendError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={`book-page ${sent ? "is-done" : ""}`} lang={lang}>
      {!sent && (
        <>
          <Link href="/" className="book-logo" aria-label="Yantramedia — home">
            <img className="book-logo-mark" src="/figma/ym-mark.gif" alt="" />
            <img className="book-logo-word" src="/figma/yantra-wordmark.svg" alt="Yantramedia" width={173.842} height={26.1685} />
          </Link>
          <LanguagePicker lang={lang} onChange={setLang} label={t.langLabel} />
        </>
      )}
      <motion.button type="button" className="book-close" onClick={close} aria-label={t.close} whileTap={{ scale: 0.9 }}>
        <X aria-hidden="true" />
      </motion.button>

      {sent ? (
        <ThankYou />
      ) : (
        <form ref={formRef} onSubmit={submit} className="book-form" noValidate={cancelRequest}>
          <input type="hidden" name="language" value={t.langName} />
          <p className="book-welcome" style={pos(39, 135.4)}>{t.welcome}</p>
          <img className="book-note-banner" style={pos(30, 243)} src="/book/please-note.jpg" width={1137} height={604}
            alt="Please Note: Based on the information you provide, our team will evaluate your requirements and schedule a consultation call if there's a suitable fit." />

          {fields.map((f) => {
            const placeholder = f.link ? t.shareLink : t.answer;
            const style = { ...pos(f.fx, f.fy), "--pl": f.pl } as React.CSSProperties;
            return (
              <div key={f.name} className="book-row">
                <label className="book-label" htmlFor={`book-${f.name}`} style={pos(f.lx, f.ly)}>
                  {t.fields[f.name]}{f.required && <span className="book-req" aria-hidden="true">*</span>}
                </label>
                {f.multiline ? (
                  <textarea id={`book-${f.name}`} name={f.name} className="book-field book-field--area" style={style} placeholder={placeholder} required={f.required} onInput={checkWords} />
                ) : (
                  <input id={`book-${f.name}`} name={f.name} type={f.type ?? "text"} className="book-field" style={style} placeholder={placeholder} required={f.required} />
                )}
              </div>
            );
          })}

          <div className="book-row" role="radiogroup" aria-labelledby="book-contact-label">
            <p className="book-label" id="book-contact-label" style={pos(25.5, 1971.2)}>{t.contactLabel}<span className="book-req" aria-hidden="true">*</span></p>
            <label className="book-radio" style={pos(32, 2047)}>
              <input type="radio" name="contactMethod" value="WhatsApp" defaultChecked required />
              <span>{t.whatsapp}</span>
            </label>
            <label className="book-radio" style={pos(238, 2047)}>
              <input type="radio" name="contactMethod" value="Email" />
              <span>{t.email}</span>
            </label>
          </div>

          <div className="book-steps" style={pos(0, 2105)}>
            <img src="/book/one-step-away.jpg" width={1290} height={685}
              alt="You're just one step away! 1. Complete the details: complete all the required details, and our Business Team will review your submission and conduct an initial audit of your business. 2. We review and assess your information to understand your business and requirements. 3. Schedule a strategy call: if your business qualifies, we'll get back to you to schedule a Live Strategy Call. Please note: the accuracy and quality of your responses matter, as they help us evaluate your business and determine the next steps." />
            <div className="book-steps-card" aria-hidden="true"><img src="/book/one-step-away.jpg" alt="" /></div>
          </div>

          <label className="book-check" style={pos(49, 2473)}>
            <input type="checkbox" name="consent" value="Yes" required={!cancelRequest} disabled={cancelRequest} />
            <span>{t.confirm}</span>
          </label>
          <label className="book-check book-check--cancel" style={pos(49, 2584)}>
            <input type="checkbox" name="cancelRequest" value="Yes" checked={cancelRequest} onChange={(e) => setCancelRequest(e.target.checked)} />
            <span>{t.cancel}</span>
          </label>

          <motion.button type="submit" disabled={submitting} aria-busy={submitting} className="book-submit" style={pos(26, 2643)} whileTap={{ scale: 0.98 }}>
            {submitting ? t.sending : t.submit}
          </motion.button>
          {submitError && <p className="book-submit-error" style={pos(31, 2724)} role="alert">{submitError}</p>}
        </form>
      )}
    </main>
  );
}
