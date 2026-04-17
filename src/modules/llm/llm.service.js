import Groq from "groq-sdk";

export const extractLeaveRequest = async (text) => {

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const prompt = `
You are an HR leave extraction system.

Convert user text into STRICT JSON only.

Rules:
1. Extract leaveType if mentioned (sick, casual, paid, emergency, etc.)
2. If NOT mentioned, use "normal leave"
3. Extract start date and end date
4. Convert all dates to YYYY-MM-DD format
5. If year missing, assume current year
6. Output ONLY valid JSON. No explanation.

JSON format:
{
  "leaveType": "",
  "from": "",
  "to": ""
}

User text:
${text}
`;

  try {

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You only return valid JSON. No extra text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

    let result = completion.choices[0].message.content.trim();

    // Ensure safe JSON parsing
    result = JSON.parse(result);

    return result;

  } catch (error) {
    console.error("Groq Error:", error.message || error);

    throw {
      status: 502,
      message: "Failed to extract leave request"
    };
  }
};