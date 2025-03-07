/* eslint-disable @typescript-eslint/no-unused-vars */
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { registerRestaurant } from "@/api/register-restaurant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const singupForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SingUpFormType = z.infer<typeof singupForm>;

export function SingUp() {
  const form = useForm<SingUpFormType>();
  const navigate = useNavigate();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function singup(data: SingUpFormType) {
    try {
      await registerRestaurantFn(data);
      form.reset();

      toast.success("Estabelecimento cadastrado com sucesso!", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Ocorreu um erro ao cadastrar o estabelecimento.");
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-in">Fazer login</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e comece suas vendas!
          </p>
        </div>

        <form onSubmit={form.handleSubmit(singup)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
            <Input
              required
              {...form.register("restaurantName")}
              id="restaurantName"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input
              required
              {...form.register("managerName")}
              id="managerName"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu telefone</Label>
            <Input required {...form.register("phone")} id="phone" type="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              required
              {...form.register("email")}
              id="email"
              type="email"
            />
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            className="w-full"
            type="submit"
          >
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com os nossos{" "}
            <a className="underline underline-offset-4" href="#">
              termos de serviço
            </a>{" "}
            e{" "}
            <a className="underline underline-offset-4" href="#">
              políticas de privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
