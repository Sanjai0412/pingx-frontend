// Format timestamp nicely
const formatDate = (dateString) => {
    if (!dateString) return "";
    // Strip Java ZonedDateTime suffix like "[UTC]" to make it standard ISO
    const cleanString = typeof dateString === "string" ? dateString.replace(/\[.*\]$/, "") : dateString;
    const date = new Date(cleanString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default formatDate;