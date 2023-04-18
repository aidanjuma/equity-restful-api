import { FastifyInstance, RegisterOptions } from "fastify";

import binance from "./binance";
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  await fastify.register(binance, { prefix: "/binance" });

  fastify.get("/", (_, rp) => {
    rp.status(200).send({
      intro:
        "Welcome to the CRYPTO asset endpoint. The available routes are listed below.",
      routes: ["/binance"],
    });
  });
};

export default routes;
