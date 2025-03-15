export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();

  const targetDate = new Date(
    `${date}${date.includes("T") ? "" : "T00:00:00"}`,
  );

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  const formattedDate =
    yearsAgo > 0
      ? `${yearsAgo}y ago`
      : monthsAgo > 0
        ? `${monthsAgo}mo ago`
        : daysAgo > 0
          ? `${daysAgo}d ago`
          : "Today";

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
