import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile } from "../api/DevtreeApi";


export default function ProfileView() {
      const queryClient = useQueryClient();
      const data: User = queryClient.getQueryData(['user'])!;

      const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
            defaultValues: {
                  handle: data.handle,
                  description: data.description
            }
      });

      const updateProfileMutation = useMutation({
            mutationFn: updateProfile,
            onError: () => {
                  console.log('Hubo un error');
            },
            onSuccess: () => {
                  console.log('Todo bien ');
            }
      });



      const handleUserProfileForm = (fomData: ProfileForm) => {
            updateProfileMutation.mutate(fomData);
      };

      return (
            <form
                  className="bg-white p-10 rounded-lg space-y-5"
                  onSubmit={handleSubmit(handleUserProfileForm)}
            >
                  <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
                  <div className="grid grid-cols-1 gap-2">
                        <label
                              htmlFor="handle"
                        >Handle:</label>
                        <input
                              type="text"
                              className="border-none bg-slate-100 rounded-lg p-2"
                              placeholder="handle o Nombre de Usuario"
                              {...register('handle', {
                                    required: "El Nombre de Usuario es Obligatorio"
                              })}
                        />
                        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                        <label
                              htmlFor="description"
                        >Descripción:</label>
                        <textarea
                              className="border-none bg-slate-100 rounded-lg p-2"
                              placeholder="Tu Descripción"
                              {...register('description', {
                                    required: 'La Descripción es Obligatoria'
                              })}
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                        <label
                              htmlFor="handle"
                        >Imagen:</label>
                        <input
                              id="image"
                              type="file"
                              name="handle"
                              className="border-none bg-slate-100 rounded-lg p-2"
                              accept="image/*"
                              onChange={() => { }}
                        />
                  </div>

                  <input
                        type="submit"
                        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                        value='Guardar Cambios'
                  />
            </form>
      )
}