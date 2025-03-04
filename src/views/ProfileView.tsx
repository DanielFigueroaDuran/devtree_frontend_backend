import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevtreeApi";
import { toast } from "sonner";


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
            onError: (error) => {
                  toast.error(error.message);
            },
            onSuccess: (data) => {
                  toast.success(data)
                  queryClient.invalidateQueries({ queryKey: ['user'] });
            }
      });

      const uploadImageMutation = useMutation({
            mutationFn: uploadImage,
            onError: (error) => {
                  toast.error(error.message);
            },

            onSuccess: (data) => {
                  console.log(data);
                  //To optimize the image and make it faster we use this code
                  queryClient.setQueryData(['user'], (prevData: User) => {
                        //console.log(prevData);
                        return {
                              ...prevData,
                              image: data
                        }
                  });
            }
      });

      const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
            if (element.target.files) {
                  //console.log(element.target.files[0]);
                  uploadImageMutation.mutate(element.target.files[0]);
            }
      };

      const handleUserProfileForm = (fomData: ProfileForm) => {
            const user: User = queryClient.getQueryData(['user'])!;
            user.description = fomData.description;
            user.handle = fomData.handle
            updateProfileMutation.mutate(user);
            // console.log(user);
            // console.log(fomData);
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
                              onChange={handleChange}
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