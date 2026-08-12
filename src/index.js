export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetPath = url.pathname === "/" ? "/index.html" : url.pathname;

    const assetRequest = new Request(new URL(assetPath, url.origin), request);
    const response = await env.ASSETS.fetch(assetRequest);

    if (response.status !== 404) {
      return response;
    }

    return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain" } });
  },
};
