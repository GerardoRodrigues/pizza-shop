/* eslint-disable @typescript-eslint/no-unused-vars */
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginForm = z.object({
  email: z.string().email(),
});

type LoginFormType = z.infer<typeof loginForm>;

export function SignIn() {
  const [ searchParams ] = useSearchParams()

  const form = useForm<LoginFormType>({
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function login(data: LoginFormType) {
    try {
      await authenticate({ email: data.email });
      form.reset();

      toast.success("Link de autenticação enviado ao email", {
        action: {
          label: "Reenviar",
          onClick: () => login(data),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas");
    }
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-up">Novo estabelecimento</Link>
      </Button>
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(login)} className="space-y-4">
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
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
