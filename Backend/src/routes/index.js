import globalErrorHandler from "../middlewares/error.middleware.js";
import authRouter from "../modules/orders/order.router.js";
import menuRouter from "../modules/menu/menu.router.js";

const init = (express, app) => {
  app.use(express.json());
  app.use("/api/orders", authRouter);
  app.use("/api/menu", menuRouter);
  app.use(globalErrorHandler);
};
export default init;
