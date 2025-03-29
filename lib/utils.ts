// lib/utils.ts

/**
 * Formats an ISO date string into a more readable format (e.g., "January 15, 2024").
 * @param dateString - The ISO date string to format.
 * @returns A formatted date string or an empty string if input is invalid.
 */
export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) {
    return ""; // Return empty if no date provided
  }
  try {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return ""; // Return empty for invalid date
    }
    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", {
      // Or use 'hr-HR' for Croatian format
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // Return empty on error
  }
}

// You can add other utility functions here later if needed
