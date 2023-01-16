import { FastifyInstance, RegisterOptions } from "fastify";

const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  fastify.get("/", (_, rp) => {
    rp.status(200).send({
      intro:
        "Welcome to the CRYPTO asset endpoint. The available routes are listed below.",
      routes: ["/binance"],
    });
  });
};

export default routes;
