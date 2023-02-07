import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RegisterOptions,
} from "fastify";

import google from "./googlefinance";
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
  await fastify.register(google, { prefix: "/google" });

  fastify.get("/", (_, rp) => {
    rp.status(200).send({
      intro:
        "Welcome to the FIAT asset endpoint. The available routes are listed below.",
      routes: ["/google"],
    });
  });

  fastify.get(
    "/:fiatProvider",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const fiatProvider = decodeURIComponent(
        (request.params as { fiatProvider: string }).fiatProvider
      );

      try {
        // TODO: Redirect if in PROVIDERS_LIST (create).
        if (fiatProvider === "google") {
          reply.redirect(`/fiat/${fiatProvider}`);
        } else {
          reply.status(404).send({
            message:
              "Not a valid provider; please try a different value for provider.",
          });
        }
      } catch (err) {
        reply.status(500).send("Something went wrong. Please try again later.");
      }
    }
  );
};

export default routes;
