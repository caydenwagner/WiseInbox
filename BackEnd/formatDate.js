export const formatDate = (emailDate) => {
  if (!emailDate) {
    return ""
  }

  const now = new Date();
  const diffMs = now - emailDate;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${emailDate.toDateString()}`;
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours > 0) {
    return diffHours === 1 ? `${diffHours} hour ago` : `${diffHours} hours ago`;
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  return diffMinutes === 1 ? `${diffMinutes} minute ago` : `${diffMinutes} minutes ago`;
};