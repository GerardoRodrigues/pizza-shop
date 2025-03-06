import { ArrowRight, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        8asd49846547
      </TableCell>
      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Gerardo Rodrigues</TableCell>
      <TableCell className="font-medium">R$ 140,50</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <X className="mr-2 h3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
