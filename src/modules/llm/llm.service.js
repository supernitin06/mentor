import Groq from "groq-sdk";

export const summarizeText = async (text) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const prompt = `Summarize the following text into 3-6 bullet points.

Text:
${text}
`;

  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const summary = completion.choices[0].message.content;

    return {
      summary: summary.trim(),
      model: "llama-3.3-70b-versatile"
    };

  } catch (error) {

    console.error("Groq API Error:", error.message || error);

    throw {
      status: 502,
      message: "Failed to generate summary from LLM."
    };

  }

};
