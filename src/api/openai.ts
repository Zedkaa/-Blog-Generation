import OpenAI from "openai";

const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  apiKey: "tpsg-WHQ1EvPmBh55ILwKVq5bP5e9xLSE7dv",
  dangerouslyAllowBrowser: true, 
});

export const generateBlog = async (
  title: string,
  topic: string,
  keywords: string,
  style: string,
  target: string,
  length: number
) => {
  const prompt = `Write a ${length === 0 ? "short" : length === 50 ? "medium" : "long"} blog post about "${topic}" titled "${title}". 
  Use the following keywords: ${keywords}. 
  The tone should be ${style} and the target audience is ${target}.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", 
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7, 
  });

  return response.choices[0].message.content;
};



// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [
//     {"role": "user", "content": "write a haiku about ai"},
//   ],
// });

// completion.then((result) => console.log(result.choices[0].message));



