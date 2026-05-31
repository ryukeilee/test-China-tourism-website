const API_BASE: string =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json = (await res.json()) as ApiEnvelope<T>;

  if (!res.ok || !json.success) {
    const statusCode = String(res.status);
    throw new Error(json.error ?? `请求失败 (${statusCode})`);
  }

  return json.data as T;
}

/** GET request */
export function get<T>(path: string): Promise<T> {
  return request<T>(path);
}

/** POST with JSON body */
export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** SSE streaming request */
export function streamPost(
  path: string,
  body: unknown,
  onChunk: (text: string) => void,
  onError: (error: string) => void,
  onDone: () => void,
): AbortController {
  const controller = new AbortController();

  void (async () => {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok) {
        const statusCode = String(res.status);
        const errBody: unknown = await res.json().catch(() => null);
        const apiErr =
          errBody && typeof errBody === "object" && "error" in errBody
            ? (errBody as ApiEnvelope<null>)
            : null;
        onError(apiErr?.error ?? `请求失败 (${statusCode})`);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        onError("无法读取流式响应");
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      while (true) {
        const result = await reader.read();
        if (result.done) break;
        const { value } = result;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const jsonStr = trimmed.slice(6);

          try {
            const chunk = JSON.parse(jsonStr) as {
              content: string;
              error?: string;
              done: boolean;
            };
            if (chunk.error) {
              onError(chunk.error);
              return;
            }
            if (chunk.done) {
              onDone();
              return;
            }
            onChunk(chunk.content);
          } catch {
            // Skip unparseable SSE chunks
          }
        }
      }

      onDone();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      const message = error instanceof Error ? error.message : "网络异常";
      onError(message);
    }
  })();

  return controller;
}
