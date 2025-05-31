const sendMessageToGemini  = async (input: string): Promise<string> =>{
    try{
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ contents: [{ parts: [{text: input}]}]}),
            }
        );
        const jsonResponse = await response.json();
        if(!jsonResponse?.candidates?.[0]?.content?.parts?.[0]?.text){
            throw new Error("Không có phản hồi từ API.");
        }
        return jsonResponse.candidates[0].content.parts[0].text;
    }catch(error){
        console.error("Lỗi khi gọi Gemini API:", error);
        throw new Error("Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
};
export { sendMessageToGemini };