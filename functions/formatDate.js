
export const formatDate = (emailDateStr) => {
  if (!emailDateStr) {
    return "";
  }

  const emailDate = new Date(emailDateStr);
  const now = new Date();
  const diffMs = now - emailDate;

  // Exact time for recent events within the last hour
  if (diffMs < 60 * 60 * 1000) {
    return `${Math.floor(diffMs / 60000)} minutes ago`;
  }

   // Within the last 24 hours, but not today or yesterday
  if (diffMs < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diffMs / (60 * 60 * 1000))} hours ago`;
  }

  // Yesterday for events from yesterday
  if (emailDate.getDate() === now.getDate() - 1) {
    return "Yesterday";
  }

  if (emailDate.getFullYear() === now.getFullYear() && emailDate.getDate() > now.getDate() - 7) {
    return emailDate.toLocaleDateString([], { weekday: 'short' }); // Use weekday name
  }

  // Full date for older events
  return emailDate.toLocaleDateString();
};