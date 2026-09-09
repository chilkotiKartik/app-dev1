import type { Paper } from './types';

/**
 * The five source documents. Four are official IIT Madras BS Diploma end-term
 * question papers (with the official answer key marked on each option); one is
 * a practice paper rendered from quizpractice.space.
 */
export const papers: Paper[] = [
  {
    id: 'ep6',
    name: 'End Term Paper 6',
    sourceFile: 'AppDev1_6.pdf',
    section: { label: 'AppDev1', sectionNumber: 8, questionCount: 32, marks: 100 },
    note:
      'Official question paper, "Diploma Level: Modern Application Development I (Computer Based Exam)". ' +
      'The AppDev1 section is section 8, questions 155-187. Correct options are marked in the source with a green tick.',
    kind: 'end-term',
  },
  {
    id: 'ep7',
    name: 'End Term Paper 7',
    sourceFile: 'AppDev1_7.pdf',
    section: { label: 'AppDev1', sectionNumber: 9, questionCount: 32, marks: 100 },
    note:
      'Official question paper. The AppDev1 section is section 9, questions 252-284. ' +
      'Correct options are marked in the source with a green tick.',
    kind: 'end-term',
  },
  {
    id: 'ep8',
    name: 'End Term Paper 8',
    sourceFile: 'AppDev1_8.pdf',
    section: { label: 'AppDev1', sectionNumber: 3, questionCount: 32, marks: 100 },
    note:
      'Official question paper. The AppDev1 section is section 3, questions 48-80. ' +
      'Correct options are marked in the source with a green tick.',
    kind: 'end-term',
  },
  {
    id: 'ep9',
    name: 'End Term Paper 9',
    sourceFile: 'AppDev1_9.pdf',
    section: { label: 'AppDev1', sectionNumber: 6, questionCount: 32, marks: 100 },
    note:
      'Official question paper. The AppDev1 section is section 6, questions 117-149. ' +
      'Correct options are marked in the source with a green tick.',
    kind: 'end-term',
  },
  {
    id: 'pr1',
    name: 'Practice Paper - 2025 Aug 31',
    sourceFile: 'Practice_AppDev1_questions_2025_Aug31_IIT_M_AN_EXAM_QDF4_QuizPractice.pdf',
    section: { label: 'AppDev1 End Term Quiz', questionCount: 36, marks: 100 },
    note:
      'Practice paper "2025 Aug31: IIT M AN EXAM QDF4", captured from quizpractice.space. ' +
      'The source does not mark correct options, so answers here are worked out from the code and stated reasoning ' +
      'and are labelled as derived rather than as an official key. ' +
      'Of the 36 questions in the source paper, this collection transcribes the 30 whose full stem, code and options ' +
      'were legible in the capture; the remainder (mostly pure-image MCQs whose options rendered as unreadable code ' +
      'screenshots, or a duplicate of an already-transcribed question) were left out rather than guessed at.',
    kind: 'practice',
  },
];

export const paperById = new Map(papers.map((p) => [p.id, p]));
