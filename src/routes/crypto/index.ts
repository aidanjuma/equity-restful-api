import Binance from "equity-scraper/dist/providers/crypto";
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
} from "fastify";

import binance from "./binance";
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  await fastify.register(binance, { prefix: "/binance" });

  fastify.get(
    "/assets",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const queries: { limit: number; offset: number } = {
        limit: 20,
        offset: 0,
      };
    }
  );

  fastify.get(
    "/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );
};

export default routes;
