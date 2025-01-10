export function getCompleteRate(completed_count: number, user_count: number) {
  if (!completed_count || !user_count) return 0;
  return Math.round((completed_count / user_count) * 100);
}
