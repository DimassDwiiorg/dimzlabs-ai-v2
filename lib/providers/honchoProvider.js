import https from "https";

const HOST = "my-honcho.plasticlabs.workers.dev";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

function cleanText(text) {
  if (!text) return "";
  return text
    .replace(/\\n/g, " ")
    .replace(/\\r/g, " ")
    .replace(/\\t/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function generateId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

/**
 * @param {{role: "user"|"assistant", content: string}[]} messages
 */
export function chatHoncho(messages) {
  return new Promise((resolve, reject) => {
    const payload = {
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: new Date().toISOString(),
        id: generateId(),
      })),
      localTime: new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    };

    const jsonPayload = JSON.stringify(payload);

    const req = https.request(
      {
        hostname: HOST,
        port: 443,
        path: "/api/chat/guest-turn",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(jsonPayload),
          "User-Agent": UA,
        },
      },
      (res) => {
        let buffer = "";
        let fullContent = "";
        let resolved = false;

        res.on("data", (chunk) => {
          buffer += chunk.toString();
          const lines = buffer.split("\n");
          buffer = lines.pop();

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") continue;
              try {
                const event = JSON.parse(jsonStr);
                if (event.type === "content_block_delta") {
                  fullContent += event.delta?.text || "";
                }
                if (event.type === "finish") {
                  resolved = true;
                  resolve(cleanText(event.outputContent || fullContent));
                }
              } catch (e) {
                /* ignore malformed chunk */
              }
            }
          }
        });

        res.on("end", () => {
          if (!resolved) {
            if (fullContent) resolve(cleanText(fullContent));
            else reject(new Error("Tidak ada respons dari model"));
          }
        });
      }
    );

    req.on("error", reject);
    req.write(jsonPayload);
    req.end();
  });
}
