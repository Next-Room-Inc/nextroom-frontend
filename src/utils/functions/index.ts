export function generatePassword(length: number = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_-+=[]{};':\"\\|,.<>/?";

  // Ensure we include at least one of each required character
  const password = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    special[Math.floor(Math.random() * special.length)],
  ];

  // Fill the rest with random mix
  const allChars = uppercase + lowercase + numbers + special;
  while (password.length < length) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the result to avoid predictable order
  return password.sort(() => Math.random() - 0.5).join("");
}
