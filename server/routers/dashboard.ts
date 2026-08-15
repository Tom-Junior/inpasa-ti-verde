import { publicProcedure, router } from "../_core/trpc";
import { getDashboardMetrics } from "../db";

export const dashboardRouter = router({
  metrics: publicProcedure.query(() => getDashboardMetrics()),
});
