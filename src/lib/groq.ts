import config from "@/conf/congif";
import Groq from "groq-sdk";
const groq = new Groq({apiKey:config.groqApiKey,
  dangerouslyAllowBrowser: true,
})

const generateComplition = async (query: string) => {
const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: "llama-3.3-70b-versatile"
  });
  return response.choices[0].message.content;
}
export default generateComplition;