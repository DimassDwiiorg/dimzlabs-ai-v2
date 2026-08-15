import axios from "axios";

export async function humanizeText(text) {
  const response = await axios.post(
    "https://api.zerogpt.com/api/transform/humanize",
    {
      string: text,
      skipRealtime: 1,
      humanizerReadability: "High School",
      humanizerPurpose: "General Writing",
      humanizerStrength: "Balanced",
      humanizerModel: "v11",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Origin: "https://www.zerogpt.com",
        Referer: "https://www.zerogpt.com/ai-humanizer",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      },
      timeout: 30000,
    }
  );
  return response.data;
}
