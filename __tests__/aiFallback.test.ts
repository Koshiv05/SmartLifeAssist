const fallbackSuggestions = [
  'Break this task into smaller steps.',
  'Set a reminder for this task.',
  'Finish the most important part first.',
];

// Function to get a fallback suggestion by index
function getFallbackSuggestion(index: number) {
  return fallbackSuggestions[index];
}

describe('AI Suggestion Fallback', () => {
  test('Fallback suggestion should exist', () => {
    const suggestion = getFallbackSuggestion(0);

    expect(suggestion).toBeTruthy();
  });

  test('Fallback suggestion should be readable text', () => {
    const suggestion = getFallbackSuggestion(1);

    expect(typeof suggestion).toBe('string');
  });

  test('Fallback list should contain multiple suggestions', () => {
    expect(fallbackSuggestions.length).toBeGreaterThan(1);
  });
});