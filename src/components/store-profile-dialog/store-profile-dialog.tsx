import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  getManagedRestaurant,
  restaurantBody,
} from "@/api/get-managed-restaurant";
import { updateProfile } from "@/api/update-profile";

import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function StoreDialogProfile() {
  const queryClient = useQueryClient();

  const { data: restaurant } = useQuery({
    queryKey: ["restaurant"],
    queryFn: getManagedRestaurant,
  });

  const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
  });

  type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

  const form = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name || "",
      description: restaurant?.description || "",
    },
  });

  function updateRestaurantCache(data: StoreProfileSchema) {
    const cached = queryClient.getQueryData<restaurantBody>(["restaurant"]);
    if (cached) {
      queryClient.setQueryData<restaurantBody>(["restaurant"], {
        ...cached,
        name: data.name,
        description: data.description,
      });
    }
    return cached;
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate(data) {
      const chached = updateRestaurantCache(data);
      return { previusProfile: chached };
    },
    onError(_, __, context) {
      if (context?.previusProfile) {
        updateRestaurantCache(context.previusProfile);
      }
    },
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });
      toast.success("Perfil atualizado com sucesso");
    } catch {
      toast.error("Erro ao atualizar perfil");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              {...form.register("name")}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...form.register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="sucess"
            disabled={form.formState.isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
