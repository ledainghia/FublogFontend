export function extractHashtags(text: string) {
  // Use a regular expression to find hashtags
  const regex = />#([^<]+)</g;
  let match;
  const hashtags = [];

  while ((match = regex.exec(text)) !== null) {
    hashtags.push(match[1]);
  }
  if (hashtags.length === 0) {
    return [];
  } else return hashtags;
}
