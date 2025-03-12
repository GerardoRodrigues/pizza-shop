import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

import { GetMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthCanceledAmountCard() {
  const { data: monthcanceledOrdersAmount } = useQuery({
    queryFn: GetMonthCanceledOrdersAmount,
    queryKey: ["metrics", "month-canceled-orders-amount"],
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
      {monthcanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthcanceledOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthcanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthcanceledOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthcanceledOrdersAmount.diffFromLastMonth}%
                  </span>{" "}
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
