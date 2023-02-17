import { IGoogleFinanceAsset } from "equity-scraper/dist/models/types";
import GoogleFinance from "equity-scraper/dist/providers/fiat";
import { binarySearch } from "../../utils/search";
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
} from "fastify";

// TODO: Improve error handling...
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  const googleFinance = new GoogleFinance();

  fastify.get("/", (_, rp) => {
    rp.status(200).send({
      intro: `Welcome to the Google Finance provider for the Equity API! Check out the provider's own website at ${googleFinance.toString.baseUrl} The available routes are listed below.`,
      routes: [
        "/assets",
        "/news",
        "/search/:query",
        "/asset/:ticker",
        "/currency/:ticker",
      ],
    });
  });

  fastify.get(
    "/assets",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const QUERIES = request.query as { limit: string; offset: string };

      let limit: number | undefined = parseInt(
        decodeURIComponent(QUERIES.limit)
      );
      isNaN(limit) ? (limit = undefined) : null;

      let offset: number | undefined = parseInt(
        decodeURIComponent(QUERIES.offset)
      );
      isNaN(offset) ? (offset = undefined) : null;

      const assets = await googleFinance.getAvailableAssets(limit, offset);

      reply.status(200).send(assets);
    }
  );

  fastify.get("/news", async (request: FastifyRequest, reply: FastifyReply) => {
    const news = await googleFinance.getLatestNews();

    reply.status(200).send(news);
  });

  fastify.get(
    "/search/:query",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const query: string = decodeURIComponent(
        (request.params as { query: string }).query
      ).toUpperCase();

      const assets: IGoogleFinanceAsset[] =
        await googleFinance.getAvailableAssets();

      /*
        Insertion Sort:
          Worst/Average-Case: O(n^2)
          Best-Case: O(n)
      */
      const sortedArray: IGoogleFinanceAsset[] = assets.sort((a, b) =>
        a.ticker > b.ticker ? 1 : b.ticker > a.ticker ? -1 : 0
      );

      /*
        Binary Search:
          Worst/Average-Case: O(log n)
          Best-Case: O(1)
      */
      const matches: number[] = binarySearch(
        sortedArray.map((asset) => asset.ticker),
        query
      );

      if (matches.length <= 0) {
        reply
          .status(404)
          .send(`404: No results returned for query: "${query}"`);
        return;
      }

      const results: IGoogleFinanceAsset[] = matches.map((i) => assets[i]);

      reply.status(200).send(results);
    }
  );

  fastify.get(
    "/asset/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ticker: string = decodeURIComponent(
        (request.params as { ticker: string }).ticker
      );

      const assetData = await googleFinance.getAssetData(ticker);

      reply.status(200).send(assetData);
    }
  );

  fastify.get(
    "/currency/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ticker: string = decodeURIComponent(
        (request.params as { ticker: string }).ticker
      );

      // TODO!
    }
  );
};

export default routes;
