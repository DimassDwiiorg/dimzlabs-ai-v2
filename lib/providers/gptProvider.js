import https from "https";

const HOST = "chatgpt.org";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

function getCsrf() {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: HOST, port: 443, path: "/", method: "GET", headers: { "User-Agent": UA } },
      (res) => {
        let data = "";
        const setCookie = res.headers["set-cookie"];
        if (setCookie) {
          const cookie = setCookie.map((c) => c.split(";")[0]).join("; ");
          const match = cookie.match(/XSRF-TOKEN=([^;]+)/);
          if (match) {
            resolve({ cookie, csrfToken: decodeURIComponent(match[1]) });
            return;
          }
        }
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const match = data.match(/XSRF-TOKEN[=:]\s*["']?([^"'\s&]+)/i);
          if (match) resolve({ cookie: "", csrfToken: match[1] });
          else reject(new Error("CSRF token tidak ditemukan"));
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

/**
 * @param {{role: "user"|"assistant", content: string}[]} messages
 */
export function chatGPT(messages) {
  return new Promise(async (resolve, reject) => {
    try {
      const { cookie, csrfToken } = await getCsrf();
      const payload = JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      });

      const req = https.request(
        {
          hostname: HOST,
          port: 443,
          path: "/api/chat",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Cookie: cookie,
            "User-Agent": UA,
            Accept: "text/event-stream",
            Referer: "https://chatgpt.org/",
            Origin: "https://chatgpt.org",
            "Content-Length": Buffer.byteLength(payload),
          },
        },
        (res) => {
          let buffer = "";
          let fullResponse = "";

          res.on("data", (chunk) => {
            buffer += chunk.toString();
            const lines = buffer.split("\n");
            buffer = lines.pop();
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const dataStr = line.slice(6);
                if (dataStr === "[DONE]") continue;
                try {
                  const data = JSON.parse(dataStr);
                  if (data.choices?.[0]?.delta?.content) {
                    fullResponse += data.choices[0].delta.content;
                  }
                } catch (e) {
                  /* ignore malformed chunk */
                }
              }
            }
          });

          res.on("end", () => resolve(fullResponse.trim()));
        }
      );

      req.on("error", reject);
      req.write(payload);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}
