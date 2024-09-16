function formatPhoneNumber(phoneNumber: string) {
  // Remove all non-digit characters
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Check if the cleaned number is 10 digits long
  if (cleaned.length !== 10) {
    throw new Error("Invalid phone number length");
  }

  // Format the number as (555) 555-5555
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return null;
}

export { formatPhoneNumber };
