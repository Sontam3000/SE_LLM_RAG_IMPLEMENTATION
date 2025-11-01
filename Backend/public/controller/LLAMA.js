const LLAMA_API_URL = "http://csai01:8000/generate"; // have to change the real one
import { Payload } from '../model/Payload.js';

export async function talkToLLM(prompt)
{


    const payloadObj = await Payload.init();
    const LLMConfig = payloadObj.getPayload();
    
    console.log(LLMConfig);
    const payload = {
        prompt,
        ...LLMConfig
      };

    try {
        const response = await fetch(LLAMA_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Server error:", errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response:", data);
        return data.response;
    } catch (error) {
        console.error("Error calling API", error);
        throw error;
    }
}

