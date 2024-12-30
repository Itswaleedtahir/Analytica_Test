const axios = require('axios');
const OpenAI = require("openai")
const openai = new OpenAI(process.env.OPENAI_API_KEY);
module.exports = {
    generatePrompt: async (req, res) => {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ msg: "Please provide a prompt", success: false });
        }
    
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt },  // Dynamic prompt from the request body
                ],
            });
    
            // Extract the content, ensuring to maintain formatting
            const generatedText = completion.choices[0].message.content;
    
            // Format the text for HTML display if needed or keep it as plain text
            const formattedText = `<pre>${generatedText}</pre>`;
    
            return res.status(200).json({ msg: "Response generated successfully", success: true, data: formattedText });
        } catch (error) {
            console.error("error", error);
            return res.status(500).json({ msg: "Failed to generate response", error: error.message, success: false });
        }
    },    
}