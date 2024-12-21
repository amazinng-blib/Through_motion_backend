export function generateStrongPassword(length: number = 12): string {
  if (length < 8) {
    throw new Error(
      'Password length should be at least 8 characters for security.'
    );
  }

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const specialCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const allCharacters = uppercase + lowercase + digits + specialCharacters;

  // Ensure the password includes at least one character from each category
  const getRandomChar = (characters: string): string =>
    characters.charAt(Math.floor(Math.random() * characters.length));

  const initialPassword = [
    getRandomChar(uppercase),
    getRandomChar(lowercase),
    getRandomChar(digits),
    getRandomChar(specialCharacters),
  ];

  // Fill the remaining characters randomly
  for (let i = initialPassword.length; i < length; i++) {
    initialPassword.push(getRandomChar(allCharacters));
  }

  // Shuffle the password to ensure randomness
  const shuffledPassword = initialPassword
    .sort(() => 0.5 - Math.random())
    .join('');

  return shuffledPassword;
}
