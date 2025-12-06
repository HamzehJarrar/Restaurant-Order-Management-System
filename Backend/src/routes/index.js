import globalErrorHandler from "../middlewares/error.middleware.js";
import authRouter from "../modules/orders/order.router.js";

const init = (express, app) => {
  app.use(express.json());
  app.use("/api/orders", authRouter);
  app.use(globalErrorHandler);
};
export default init;
