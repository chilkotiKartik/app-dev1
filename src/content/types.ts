/**
 * Content model for the AppDev1 exam atlas.
 *
 * Every question in this repository is transcribed from one of the source PDFs
 * listed in `papers.ts`. Nothing here is generated content: prompts, code
 * blocks, option text and the answer key all come from the source papers. The
 * only authored fields are `explanation`, `approach`, `takeaways` and the topic
 * mapping — these are marked as such in the UI.
 */

export type QuestionType = 'MCQ' | 'MSQ' | 'SA';

/** Ordered pieces of a question stem or an option. */
export type Block =
  | { kind: 'text'; value: string }
  | { kind: 'code'; lang: CodeLang; value: string; caption?: string }
  | { kind: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { kind: 'list'; ordered?: boolean; items: string[] }
  /** A figure reproduced from the source paper. */
  | { kind: 'figure'; src: string; alt: string; caption?: string }
  /**
   * A faithful prose description of something the source paper renders as an
   * image (e.g. a browser screenshot of styled HTML). Used where reproducing
   * the bitmap would add nothing a description cannot carry.
   */
  | { kind: 'render'; value: string };

export type CodeLang =
  | 'python'
  | 'html'
  | 'css'
  | 'jinja'
  | 'javascript'
  | 'sql'
  | 'shell'
  | 'json'
  | 'text';

export interface Option {
  /** Option id as printed in the source paper, where the paper prints one. */
  id: string;
  blocks: Block[];
  correct: boolean;
}

export interface Solution {
  /** One-line statement of the answer. */
  verdict: string;
  /** Why the answer is what it is, grounded in the code/statement given. */
  explanation: Block[];
  /** How to attack this kind of question under exam conditions. */
  approach?: string;
  takeaways?: string[];
}

export interface Question {
  /** Stable slug used in URLs, e.g. "ep6-q168". */
  id: string;
  paperId: string;
  /** Question number as printed in the source paper. */
  number: number;
  /** Official "Question Id" printed in the source paper, when present. */
  sourceQuestionId?: string;
  type: QuestionType;
  /** Marks as printed in the source paper. `0` for non-scoring declarations. */
  marks: number;
  /** Shared stem for a comprehension group, if this question belongs to one. */
  comprehensionId?: string;
  title: string;
  stem: Block[];
  options: Option[];
  /** Short-answer questions carry the accepted answer(s) instead of options. */
  shortAnswer?: string;
  topicId: string;
  subtopicId: string;
  solution: Solution;
  difficulty?: 'foundational' | 'moderate' | 'demanding';
}

export interface Comprehension {
  id: string;
  paperId: string;
  title: string;
  stem: Block[];
  /** Question numbers covered, as printed in the source paper. */
  range: string;
}

export interface Paper {
  id: string;
  /** Human label used across the UI. */
  name: string;
  /** The source PDF filename, so every question is traceable. */
  sourceFile: string;
  /** What the paper's own header says about the AppDev1 section. */
  section: {
    label: string;
    sectionNumber?: number;
    questionCount: number;
    marks: number;
  };
  /** Free-text note on provenance, shown on the paper page. */
  note: string;
  kind: 'end-term' | 'practice';
}

export interface Subtopic {
  id: string;
  name: string;
  summary: string;
}

export interface Topic {
  id: string;
  name: string;
  /** One-line description used in listings. */
  blurb: string;
  subtopics: Subtopic[];
  /** Beginner-friendly explanation, authored. */
  learn: Block[];
  keyTerms: { term: string; meaning: string }[];
  commonMistakes: string[];
  examFocus: string[];
}

/** A set of questions across papers that ask substantially the same thing. */
export interface RepeatGroup {
  id: string;
  label: string;
  /** How the variants differ, when they are not verbatim repeats. */
  note: string;
  /** 'verbatim' = identical stem and options; 'variant' = same idea, changed numbers/wording. */
  kind: 'verbatim' | 'variant';
  questionIds: string[];
}
