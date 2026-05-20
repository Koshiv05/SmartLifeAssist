const GEMINI_API_KEY = 'AIzaSyBV1FIbD4LEuubfGYCAyUpf-WgzXZ5KnAE';

const fallbackSuggestions = [
    'Break this task into smaller steps.',
    'Set a reminder for this task.',
    'Finish the most important part first.',
    'Plan this task before starting.',
    'Avoid distractions while completing this task.',
];

export async function generateTaskSuggestion(taskTitle: string) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Give one short productivity suggestion for this task: ${taskTitle}`,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return getFallbackSuggestion();
        }

        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (aiText && aiText.trim().length > 0) {
            return aiText
                .replace(/\*\*/g, '')
                .trim();
        }

        return getFallbackSuggestion();
    } catch (error) {
        return getFallbackSuggestion();
    }
}

function getFallbackSuggestion() {
    const randomIndex = Math.floor(Math.random() * fallbackSuggestions.length);
    return fallbackSuggestions[randomIndex];
}