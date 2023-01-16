import Fastify from "fastify";
import FastifyCors from "@fastify/cors";
import crypto from "./routes/crypto";
import fiat from "./routes/fiat";

(async () => {
  const fastify = Fastify({
    maxParamLength: 1000,
    logger: true,
  });

  await fastify.register(FastifyCors, {
    origin: "*",
    methods: "GET",
  });

  await fastify.register(crypto, { prefix: "/crypto" });
  await fastify.register(fiat, { prefix: "/fiat" });

  try {
    fastify.get("/", (_, rp) => {
      rp.status(200).send("Welcome the the Equity Finance API! 🤑");
    });

    fastify.get("*", (request, reply) => {
      reply.status(404).send({
        errorCode: 404,
        message: "Page not found. Please try a different route.",
      });
    });

    fastify.listen({ port: 3000, host: "0.0.0.0" }, (e, address) => {
      if (e) throw e;
      console.log(`Fastify listening on "${address}".`);
    });
  } catch (err: any) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
