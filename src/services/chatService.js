const CRISIS_KEYWORDS = [
  'suicide',
  'kill myself',
  'end my life',
  'hurt myself',
  'emergency',
];

export function hasCrisisKeyword(message) {
  return CRISIS_KEYWORDS.some((keyword) =>
    message.toLowerCase().includes(keyword)
  );
}

export async function sendChatMessage({
  message,
  userProfile,
  resources,
  apiKey,
}) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey || ''}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: `You are an intake assistant for CommunityCare Network, a non-profit that helps connect people with social services. You respond with valid JSON only.`,
        },
        {
          role: 'user',
          content: `User profile:
- Name: ${userProfile?.name || 'Guest'}
- Age: ${userProfile?.age || 'N/A'}
- Occupation: ${userProfile?.occupation || 'N/A'}

Available resources (use these exact ids in recommendedResourceIds):
${resources.map((r) => `- id "${r.id}": ${r.name} (${r.category}): ${r.description}`).join('\n')}

User's request: "${message}"

Respond with ONLY this JSON (no other text):
{
  "message": "Your empathetic response and 1-2 clarifying questions. Suggest relevant resources from the list by name.",
  "recommendedResourceIds": ["1", "2"]
}`,
        },
      ],
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || 'API request failed');
  }

  const responseText = data.choices?.[0]?.message?.content ?? '';
  let parsedResponse;
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    parsedResponse = JSON.parse(jsonMatch ? jsonMatch[0] : responseText);
  } catch {
    parsedResponse = { message: responseText, recommendedResourceIds: [] };
  }

  return parsedResponse;
}
