import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

export function Orders() {
    return(
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
            </div>
            <div className="space-y-2.5">
                <form className="flex items-center gap-2" action="">
                    <span className="text-sm font-semibold">Filtros</span>
                    <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
                </form>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[140px]">Identificador</TableHead>
                                <TableHead className="w-[180px]">Realizado há</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="w-[140px]">Total do pedido</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Button variant="outline" size="xs">
                                        <Search className="h-3 w-3"/>
                                        <span className="sr-only">Detalhes do pedido</span>
                                    </Button>
                                </TableCell>
                                <TableCell className="font-mono text-xs font-medium">8asd49846547</TableCell>
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
                                        <ArrowRight className="mr-2 h3 w-3"/>
                                        Aprovar
                                    </Button>
                                </TableCell>
                                <TableCell>
                                <Button variant="outline" size="xs">
                                        <X className="mr-2 h3 w-3"/>
                                        Cancelar
                                    </Button>
                                </TableCell>
                            </TableRow>                       
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}