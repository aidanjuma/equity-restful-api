import { IBinanceAsset } from "equity-scraper/dist/models/types";
import Binance from "equity-scraper/dist/providers/crypto";
import { binarySearch } from "../../utils/search";
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
} from "fastify";

const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  const binance = new Binance();

  fastify.get("/", (_, rp) => {
    rp.status(200).send({
      intro: `Welcome to the Binance provider for the Equity API! Check out the provider's own website at ${binance.toString.baseUrl} The available routes are listed below.`,
      routes: ["/assets", "/search/:query", "/asset/:ticker"],
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

      const assets = await binance.getAvailableAssets(limit, offset);

      reply.status(200).send(assets);
    }
  );

  fastify.get(
    "/search/:query",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const query: string = decodeURIComponent(
        (request.params as { query: string }).query
      ).toUpperCase();

      if (query.length > 255)
        reply
          .status(500)
          .send(
            `500: The query ${query} is too long (greater than 255 characters). Please try a shorter query.`
          );

      const assets: IBinanceAsset[] = await binance.getAvailableAssets();

      /*
        Insertion Sort:
          Worst/Average-Case: O(n^2)
          Best-Case: O(n)
      */
      const sortedArray: IBinanceAsset[] = assets.sort((a, b) =>
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

      const results: IBinanceAsset[] = matches.map((i) => assets[i]);

      reply.status(200).send({ results: results });
    }
  );

  fastify.get(
    "/asset/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const ticker: string = decodeURIComponent(
        (request.params as { ticker: string }).ticker
      );

      const assetData = await binance.getAssetPrice(ticker);

      reply.status(200).send(assetData);
    }
  );
};

export default routes;
