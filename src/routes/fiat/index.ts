import GoogleFinance from "equity-scraper/dist/providers/fiat";
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
} from "fastify";

import gfi from "./googlefinance";
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  await fastify.register(gfi, { prefix: "/google" });

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
