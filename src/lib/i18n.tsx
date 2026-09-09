import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'hi';
const KEY = 'appdev1-atlas-lang';

const dict = {
  home: { en: 'Home', hi: 'Home' },
  topics: { en: 'Topics', hi: 'Topics' },
  bank: { en: 'Question Bank', hi: 'Question Bank' },
  papers: { en: 'Papers', hi: 'Papers' },
  repeated: { en: 'Repeated', hi: 'Repeat Wale' },
  important: { en: 'Important Topics', hi: 'Zaroori Topics' },
  revision: { en: 'Revision', hi: 'Revision' },
  tricks: { en: 'Tricks', hi: 'Tricks' },
  heroTitle: {
    en: 'Study from the actual exam, not a guess at it.',
    hi: 'Asli exam se padho, andaaze se nahi.',
  },
  heroLede: {
    en: 'Every question here is transcribed from 5 real source papers — four official IITM BS Diploma end-term papers and one practice paper — with a verified solution, an explanation grounded in the code, the topic it belongs to, and a quick trick to crack it fast.',
    hi: 'Yahan har sawaal 5 asli papers se liya gaya hai — 4 official IITM BS Diploma end-term papers aur 1 practice paper — saath mein verified solution, code-based explanation, uska topic, aur ek quick trick jisse fatafat solve ho jaye.',
  },
  ctaTopics: { en: 'Start with the topics', hi: 'Topics se shuru karo' },
  ctaBank: { en: 'Browse the question bank', hi: 'Question bank dekho' },
  ctaRevision: { en: 'Quick revision', hi: 'Jaldi revision karo' },
  learnHeading: { en: 'Learn', hi: 'Samjho (Learn)' },
  keyTermsHeading: { en: 'Key terms', hi: 'Zaroori Terms' },
  mistakesHeading: { en: 'Common mistakes', hi: 'Aam Galtiyan (Common Mistakes)' },
  examFocusHeading: { en: 'Exam-focused guidance', hi: 'Exam Trick & Guidance' },
  questionsOnTopic: { en: 'on this topic', hi: 'is topic ke sawaal' },
  verifiedSolution: { en: 'Verified solution', hi: 'Verified Solution' },
  examApproach: { en: 'Trick / Exam approach', hi: '💡 Trick / Exam Approach' },
  takeaways: { en: 'Key takeaways', hi: 'Yaad Rakhne Wali Baatein' },
} as const;

type Key = keyof typeof dict;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: 'en',
  setLang: () => {},
  t: (k) => dict[k].en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'hi' || v === 'en') return v;
    } catch {
      /* ignore */
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
  }

  function t(k: Key): string {
    return dict[k][lang];
  }

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
