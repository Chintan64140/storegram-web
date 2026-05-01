const DEFAULT_API_URL = "https://storegram-backend-39ki.onrender.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

function sanitizeFilename(filename, fileUrl) {
  const fallbackName = fileUrl?.split("?")[0]?.split("#")[0]?.split("/").pop() || "storegram-file";
  const rawName = filename || fallbackName;

  return rawName
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

async function getPublicFile(shortId) {
  const baseUrls = [...new Set([API_URL, DEFAULT_API_URL].map((value) => value?.trim()).filter(Boolean))];
  let lastError = null;

  for (const baseUrl of baseUrls) {
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/files/${shortId}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        lastError = new Error(`Fetch failed with status ${response.status} for ${baseUrl}`);
        continue;
      }

      const data = await response.json();
      return data?.file || null;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastError) {
    console.error("Failed to load public download file", lastError);
  }

  return null;
}

export async function GET(_request, { params }) {
  const { shortId } = await params;
  const file = await getPublicFile(shortId);

  if (!file?.file_url) {
    return new Response("File not found", { status: 404 });
  }

  const upstreamResponse = await fetch(file.file_url, {
    cache: "no-store",
  });

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return new Response("Unable to download file", { status: 502 });
  }

  const filename = sanitizeFilename(file.title, file.file_url);
  const headers = new Headers();

  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", upstreamResponse.headers.get("content-type") || "application/octet-stream");
  headers.set(
    "Content-Disposition",
    `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`
  );

  const contentLength = upstreamResponse.headers.get("content-length");
  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }

  return new Response(upstreamResponse.body, {
    headers,
    status: 200,
  });
}
