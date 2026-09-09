import type { Comprehension, Question, RepeatGroup, Topic } from './types';
import { papers, paperById } from './papers';
import { topics, topicById } from './topics';
import { ep6Questions, ep6Comprehensions } from './papers/ep6';
import { ep7Questions, ep7Comprehensions } from './papers/ep7';
import { ep8Questions, ep8Comprehensions } from './papers/ep8';
import { ep9Questions, ep9Comprehensions } from './papers/ep9';
import { pr1Questions, pr1Comprehensions } from './papers/pr1';

export * from './types';
export { papers, paperById, topics, topicById };

export const questions: Question[] = [
  ...ep6Questions,
  ...ep7Questions,
  ...ep8Questions,
  ...ep9Questions,
  ...pr1Questions,
].sort((a, b) => {
  if (a.paperId !== b.paperId) return a.paperId.localeCompare(b.paperId);
  return a.number - b.number;
});

export const comprehensions: Comprehension[] = [
  ...ep6Comprehensions,
  ...ep7Comprehensions,
  ...ep8Comprehensions,
  ...ep9Comprehensions,
  ...pr1Comprehensions,
];

export const questionById = new Map(questions.map((q) => [q.id, q]));
export const comprehensionById = new Map(comprehensions.map((c) => [c.id, c]));

export function questionsByPaper(paperId: string): Question[] {
  return questions.filter((q) => q.paperId === paperId).sort((a, b) => a.number - b.number);
}

export function questionsByTopic(topicId: string): Question[] {
  return questions.filter((q) => q.topicId === topicId);
}

export function questionsBySubtopic(topicId: string, subtopicId: string): Question[] {
  return questions.filter((q) => q.topicId === topicId && q.subtopicId === subtopicId);
}

/**
 * Repeated-question groups, computed from verified content mappings baked
 * into individual questions' solution text (each repeat calls out its
 * sibling papers explicitly). This list only includes groups we have
 * actually cross-checked question-by-question against the source PDFs —
 * see each group's `note` for what was compared.
 */
export const repeatGroups: RepeatGroup[] = [
  {
    id: 'rg-macro-length-filter',
    label: 'Jinja macro filtering names by string length ("Harry, Karl, John, Jason, Ros")',
    kind: 'verbatim',
    note: 'Identical app.py, index.html, and options across both papers.',
    questionIds: ['ep6-q172', 'ep7-q260'],
  },
  {
    id: 'rg-base-inheritance-mad',
    label: 'Template inheritance rendering "Diploma Courses" / "IITM BS Degree" heading plus MAD I/II/DBMS',
    kind: 'variant',
    note: 'Same mechanism and near-identical code across three papers; ep9 uses a single-block simplified version.',
    questionIds: ['ep6-q174', 'ep7-q271', 'ep9-q129'],
  },
  {
    id: 'rg-logging-negative-arg',
    label: 'Logging output for `python log.py -12` with a double-negated argument',
    kind: 'verbatim',
    note: 'Identical code, identical options, identical correct answer (no output at all) in both papers.',
    questionIds: ['ep6-q168', 'ep7-q263'],
  },
  {
    id: 'rg-hdd-rpm',
    label: 'Maximum HDD spin rate given a read speed and bits-per-revolution',
    kind: 'verbatim',
    note: 'Identical numbers (42,000 bps, 600 bits/rev) and options in both papers.',
    questionIds: ['ep6-q161', 'ep7-q264'],
  },
  {
    id: 'rg-pytest-testclass-collection',
    label: 'pytest -k Test_class collection with mixed test_/non-test_ method names',
    kind: 'variant',
    note: 'Identical mechanism (only test_-prefixed methods collected) across three papers; ep8 and ep9 vary the numbers.',
    questionIds: ['ep6-q160', 'ep7-q270', 'ep8-q54', 'ep9-q121', 'ep9-q144'],
  },
  {
    id: 'rg-pytest-marker-deselect',
    label: 'Which pytest -m marker reproduces "1 passed, 3 deselected" for a buggy square() with a misplaced return',
    kind: 'verbatim',
    note: 'Identical buggy function and identical options in both papers.',
    questionIds: ['ep6-q183', 'ep7-q282'],
  },
  {
    id: 'rg-bandwidth-24h-total',
    label: 'Total data consumed by three users over 24 hours from a bandwidth-vs-time graph',
    kind: 'variant',
    note: 'ep6 and ep7 use an identical graph and answer (54 GB); ep9 uses a graph with a different final segment and asks a related but distinct question (which user consumed most).',
    questionIds: ['ep6-q169', 'ep7-q273', 'ep9-q141'],
  },
  {
    id: 'rg-login-session-status-sequence',
    label: 'Sequence of response status codes across /home, /login and /logout with session-based roles',
    kind: 'verbatim',
    note: 'Identical Flask app, identical URL sequence, identical answer in both papers.',
    questionIds: ['ep6-q164', 'ep8-q68'],
  },
  {
    id: 'rg-profile-access-denied',
    label: 'Rendered output for a profile route with an admin/user access-denied branch',
    kind: 'verbatim',
    note: 'Identical app.py, template, URL and answer in both papers.',
    questionIds: ['ep6-q165', 'ep8-q53'],
  },
  {
    id: 'rg-testing-types-match',
    label: 'Matching testing types (Regression / User Acceptance / System-family / Automation) to their functionality',
    kind: 'variant',
    note: 'Same four functionality descriptions and same correct pattern (4,1,2,3) across three papers; ep7 swaps "System Testing" for "White Box Testing" in slot C.',
    questionIds: ['ep6-q173', 'ep7-q261', 'ep9-q127'],
  },
  {
    id: 'rg-html5-xhtml-xml',
    label: 'Which statements about HTML5, XHTML, XML and SGML are true',
    kind: 'verbatim',
    note: 'Identical four options and identical correct answers in both papers.',
    questionIds: ['ep7-q279', 'ep9-q137'],
  },
  {
    id: 'rg-module-errorhandler-trailing-slash',
    label: 'Module-lookup Flask app: trailing-slash redirect behaviour and 400/404 error handlers',
    kind: 'verbatim',
    note: 'Identical app.py and identical correct statements in both papers.',
    questionIds: ['ep6-q184', 'ep8-q76'],
  },
];

export function repeatGroupsForQuestion(questionId: string): RepeatGroup[] {
  return repeatGroups.filter((g) => g.questionIds.includes(questionId));
}

/**
 * "Important topics" ranking, computed purely from how many questions and
 * how many total marks in the source papers map to each topic. No external
 * weighting is applied.
 */
export interface TopicStats {
  topic: Topic;
  questionCount: number;
  totalMarks: number;
  repeatCount: number;
}

export function computeTopicStats(): TopicStats[] {
  const stats = new Map<string, TopicStats>();
  for (const topic of topics) {
    stats.set(topic.id, { topic, questionCount: 0, totalMarks: 0, repeatCount: 0 });
  }
  for (const q of questions) {
    const s = stats.get(q.topicId);
    if (s) {
      s.questionCount += 1;
      s.totalMarks += q.marks;
    }
  }
  for (const g of repeatGroups) {
    const seen = new Set<string>();
    for (const qid of g.questionIds) {
      const q = questionById.get(qid);
      if (q) seen.add(q.topicId);
    }
    for (const topicId of seen) {
      const s = stats.get(topicId);
      if (s) s.repeatCount += 1;
    }
  }
  return Array.from(stats.values()).sort((a, b) => b.questionCount - a.questionCount);
}

/** Build-time content audit: throws if the content model is internally inconsistent. */
export function auditContent(): string[] {
  const problems: string[] = [];
  const topicIds = new Set(topics.map((t) => t.id));
  const subtopicIds = new Map(topics.map((t) => [t.id, new Set(t.subtopics.map((s) => s.id))]));

  for (const q of questions) {
    if (!paperById.has(q.paperId)) problems.push(`${q.id}: unknown paperId "${q.paperId}"`);
    if (!topicIds.has(q.topicId)) problems.push(`${q.id}: unknown topicId "${q.topicId}"`);
    const subs = subtopicIds.get(q.topicId);
    if (subs && !subs.has(q.subtopicId)) {
      problems.push(`${q.id}: unknown subtopicId "${q.subtopicId}" for topic "${q.topicId}"`);
    }
    if (q.type !== 'SA' && q.options.length === 0) problems.push(`${q.id}: no options`);
    if (q.type !== 'SA' && !q.options.some((o) => o.correct)) problems.push(`${q.id}: no correct option marked`);
    if (q.type === 'MCQ' && q.options.filter((o) => o.correct).length !== 1) {
      problems.push(`${q.id}: MCQ must have exactly one correct option`);
    }
    if (q.comprehensionId && !comprehensionById.has(q.comprehensionId)) {
      problems.push(`${q.id}: unknown comprehensionId "${q.comprehensionId}"`);
    }
  }

  const seenIds = new Set<string>();
  for (const q of questions) {
    if (seenIds.has(q.id)) problems.push(`duplicate question id "${q.id}"`);
    seenIds.add(q.id);
  }

  for (const topic of topics) {
    const count = questions.filter((q) => q.topicId === topic.id).length;
    if (count === 0) problems.push(`topic "${topic.id}" has zero mapped questions`);
    for (const sub of topic.subtopics) {
      const subCount = questions.filter((q) => q.topicId === topic.id && q.subtopicId === sub.id).length;
      if (subCount === 0) problems.push(`subtopic "${topic.id}/${sub.id}" has zero mapped questions`);
    }
  }

  for (const g of repeatGroups) {
    for (const qid of g.questionIds) {
      if (!questionById.has(qid)) problems.push(`repeat group "${g.id}" references unknown question "${qid}"`);
    }
  }

  return problems;
}
