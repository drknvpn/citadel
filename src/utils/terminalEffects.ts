/**
 * Simulates typing text with a delay between characters
 * @param text The text to type
 * @param setTextFunction The state setter function
 * @param delay Delay between characters in milliseconds
 * @returns Promise that resolves when typing is complete
 */
export const typeText = async (
  text: string,
  setTextFunction: React.Dispatch<React.SetStateAction<string>>,
  delay: number = 30
): Promise<void> => {
  let currentText = '';
  
  for (const char of text) {
    currentText += char;
    setTextFunction(prevText => prevText + char);
    
    // Random variation in typing speed for more realistic effect
    const randomDelay = delay + Math.random() * 20 - 10;
    await new Promise(resolve => setTimeout(resolve, randomDelay));
  }
  
  setTextFunction(prevText => prevText + '\n');
  return Promise.resolve();
};

/**
 * Simulates a computer error with glitching text
 * @param originalText The text to glitch
 * @param setTextFunction The state setter function
 * @returns Promise that resolves when glitching is complete
 */
export const glitchText = async (
  originalText: string,
  setTextFunction: React.Dispatch<React.SetStateAction<string>>,
): Promise<void> => {
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\';
  let iterations = 5;
  
  while (iterations > 0) {
    // Create glitched version of text
    let glitchedText = '';
    for (let i = 0; i < originalText.length; i++) {
      if (Math.random() > 0.7) {
        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitchedText += originalText[i];
      }
    }
    
    setTextFunction(glitchedText);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    iterations--;
  }
  
  // Reset to original text
  setTextFunction(originalText);
  return Promise.resolve();
};