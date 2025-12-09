import globalErrorHandler from "../middlewares/error.middleware.js";
import authRouter from "../modules/auth/auth.router.js";
import menuRouter from "../modules/menu/menu.router.js";
import analyticsRouter from "../modules/analytics/analytics.router.js";
import tableRouter from "../modules/tables/table.router.js";
import orderRouter from "../modules/orders/order.router.js";
const init = (express, app) => {
  app.use(express.json());
  app.use("/api/orders", orderRouter);
  app.use("/api/menu", menuRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/tables", tableRouter);
  app.use(globalErrorHandler);
};
export default init;
