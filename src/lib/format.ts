export function formatMarks(marks: number): string {
  if (Number.isInteger(marks)) return String(marks);
  return marks.toFixed(1).replace(/\.0$/, '');
}

export function pluralize(n: number, singular: string, plural = `${singular}s`): string {
  return `${n} ${n === 1 ? singular : plural}`;
}

export function slugTitle(title: string, max = 60): string {
  return title.length > max ? title.slice(0, max - 1) + '…' : title;
}
