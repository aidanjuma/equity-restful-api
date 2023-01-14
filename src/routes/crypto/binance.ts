import Binance from "equity-scraper/dist/providers/crypto";
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
      routes: ["/:query", "/:ticker"],
    });
  });

  fastify.get(
    "/:query",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );

  fastify.get(
    "/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );
};

export default routes;
