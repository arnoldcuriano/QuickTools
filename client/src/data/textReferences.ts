import type { ReferenceEntry } from './developerReferences';

export const specialCharacters: readonly ReferenceEntry[] = [
  ['©', 'Copyright', 'Copyright symbol'], ['®', 'Registered', 'Registered trademark'], ['™', 'Trademark', 'Trademark symbol'],
  ['°', 'Degree', 'Degrees of angle or temperature'], ['±', 'Plus-minus', 'Plus or minus'], ['×', 'Multiplication', 'Multiplication sign'],
  ['÷', 'Division', 'Division sign'], ['≈', 'Approximately', 'Approximately equal'], ['≠', 'Not equal', 'Not equal to'],
  ['≤', 'Less than or equal', 'Less than or equal to'], ['≥', 'Greater than or equal', 'Greater than or equal to'],
  ['∞', 'Infinity', 'Infinity symbol'], ['√', 'Square root', 'Square root symbol'], ['π', 'Pi', 'Greek small letter pi'],
  ['µ', 'Micro', 'Micro sign'], ['€', 'Euro', 'Euro currency'], ['£', 'Pound', 'Pound sterling'], ['¥', 'Yen', 'Yen currency'],
  ['₱', 'Peso', 'Philippine peso'], ['¢', 'Cent', 'Cent currency'], ['§', 'Section', 'Section sign'], ['¶', 'Pilcrow', 'Paragraph sign'],
  ['•', 'Bullet', 'Bullet point'], ['…', 'Ellipsis', 'Horizontal ellipsis'], ['—', 'Em dash', 'Long dash'], ['–', 'En dash', 'Range dash'],
  ['“', 'Left double quote', 'Opening curly double quote'], ['”', 'Right double quote', 'Closing curly double quote'],
  ['‘', 'Left single quote', 'Opening curly single quote'], ['’', 'Right single quote', 'Closing curly single quote'],
  ['←', 'Left arrow', 'Leftwards arrow'], ['→', 'Right arrow', 'Rightwards arrow'], ['↑', 'Up arrow', 'Upwards arrow'],
  ['↓', 'Down arrow', 'Downwards arrow'], ['✓', 'Check mark', 'Check or success mark'], ['✕', 'Multiplication X', 'Cross mark'],
].map(([key, name, description]) => ({ key, name, description }));

export const emojiEntries: readonly ReferenceEntry[] = [
  ['😀', 'Grinning face', 'Smile happy face'], ['😂', 'Face with tears of joy', 'Laugh funny'], ['😊', 'Smiling face', 'Happy warm'],
  ['😍', 'Heart eyes', 'Love admiration'], ['🤔', 'Thinking face', 'Question considering'], ['😎', 'Sunglasses face', 'Cool confident'],
  ['😢', 'Crying face', 'Sad tear'], ['😡', 'Angry face', 'Angry upset'], ['👍', 'Thumbs up', 'Approve yes'], ['👎', 'Thumbs down', 'Disapprove no'],
  ['👏', 'Clapping hands', 'Applause congratulations'], ['🙏', 'Folded hands', 'Thanks please'], ['💪', 'Flexed biceps', 'Strength'],
  ['👋', 'Waving hand', 'Hello goodbye'], ['❤️', 'Red heart', 'Love'], ['💡', 'Light bulb', 'Idea insight'], ['🔥', 'Fire', 'Popular excellent'],
  ['✨', 'Sparkles', 'New clean'], ['🎉', 'Party popper', 'Celebrate'], ['✅', 'Check mark button', 'Complete success'], ['❌', 'Cross mark', 'Incorrect failure'],
  ['⚠️', 'Warning', 'Caution alert'], ['🚀', 'Rocket', 'Launch fast'], ['🔒', 'Locked', 'Secure private'], ['🔗', 'Link', 'URL connection'],
  ['📌', 'Pushpin', 'Pinned important'], ['📝', 'Memo', 'Write note'], ['📚', 'Books', 'Study reference'], ['💻', 'Laptop', 'Computer developer'],
  ['🛠️', 'Tools', 'Build settings'], ['🌐', 'Globe', 'Web international'], ['📊', 'Bar chart', 'Analytics data'], ['🎨', 'Palette', 'Design creative'],
].map(([key, name, description]) => ({ key, name, description }));
