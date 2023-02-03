import GoogleFinance from "equity-scraper/dist/providers/fiat";
import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  RegisterOptions,
} from "fastify";

const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  const googleFinance = new GoogleFinance();

  fastify.get("/", (_, rp) => {
    rp.status(200).send({
      intro: `Welcome to the Google Finance provider for the Equity API! Check out the provider's own website at ${googleFinance.toString.baseUrl} The available routes are listed below.`,
      routes: [
        "/assets",
        "/search/:query",
        "/asset/:ticker",
        "/currency/:ticker",
      ],
    });
  });

  fastify.get(
    "/assets",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );

  fastify.get(
    "/search/:query",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );

  fastify.get(
    "/ticker/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );

  fastify.get(
    "/currency/:ticker",
    async (request: FastifyRequest, reply: FastifyReply) => {}
  );
};

export default routes;
