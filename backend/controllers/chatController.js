import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chatPrompt = `
      You are a helpful AI assistant for a doctor's clinic. Your role is to answer user questions about appointments, common health queries, and clinic information.
      
      IMPORTANT: You must always include the following disclaimer at the end of every response: "Disclaimer: I am an AI assistant and not a medical professional. Please consult with a real doctor for any medical advice."
      
      User's question: "${message}"
    `;

    const result = await model.generateContent(chatPrompt);
    const response = result.response;
    const text = response.text();

    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Failed to get response from AI." });
  }
};

export {
    chatWithBot
}
