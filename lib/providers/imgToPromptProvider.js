import axios from "axios";

const BASE_URL = "https://aiconvert.online/api";
const UA =
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function imageToPrompt(base64Image, mimeType) {
  const submitRes = await axios.post(
    `${BASE_URL}/submit-prompt-job`,
    {
      imageData: base64Image,
      mimeType: mimeType || "image/jpeg",
      language: "en",
      promptType: "nano-banana-pro",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": UA,
        Referer: "https://aiconvert.online/prompt-generator",
      },
      timeout: 30000,
    }
  );

  const taskId = submitRes.data?.taskId;
  if (!taskId) {
    throw new Error(submitRes.data?.message || "Gagal submit gambar");
  }

  const maxTries = 20;
  const delay = 2000;

  for (let i = 0; i < maxTries; i++) {
    const statusRes = await axios.get(`${BASE_URL}/check-status-kv`, {
      params: { taskId },
      headers: { "User-Agent": UA, Referer: "https://aiconvert.online/prompt-generator" },
      timeout: 10000,
    });

    const data = statusRes.data;
    if (data.status === "SUCCESS" && data.result) {
      return data.result.generatedPrompt;
    }
    if (data.status !== "PENDING" && data.status !== "PROCESSING") {
      throw new Error(data.message || "Gagal mendapatkan prompt");
    }
    if (i < maxTries - 1) await wait(delay);
  }

  throw new Error("Waktu habis, prompt tidak kunjung selesai");
}
