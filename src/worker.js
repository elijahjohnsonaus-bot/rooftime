export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/videos") {
      const keys = [];
      let cursor;
      do {
        const page = await env.VIDEOS.list({ cursor });
        keys.push(...page.objects.map((o) => o.key));
        cursor = page.truncated ? page.cursor : undefined;
      } while (cursor);
      const videos = keys.filter((k) => /\.(mp4|webm)$/i.test(k));
      return Response.json(videos, { headers: { "cache-control": "no-store" } });
    }
    return new Response("Not found", { status: 404 });
  },
};
