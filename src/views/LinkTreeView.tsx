import { useState } from "react"
import { social } from "../data/social"
import DetreeInput from "../components/DetreeInput";
import { isValidUrl } from "../utlis";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/DevtreeApi";

const LinkTreeView = () => {
      const [devtreeLinks, setDevtreeLinks] = useState(social);
      const { mutate } = useMutation({
            mutationFn: updateProfile,
            onError: (error) => {
                  toast.error(error.message);
            },
            onSuccess: () => {
                  toast.success('Actualizado Correctamente');
            }
      });

      const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
            // console.log(element.target.value);
            // console.log(element.target.name);
            const updatedLinks = devtreeLinks.map(link => link.name === element.target.name
                  ? { ...link, url: element.target.value }
                  : link);
            setDevtreeLinks(updatedLinks);
      };

      const handleEnableLink = (socialNetwork: string) => {
            const updatedLinks = devtreeLinks.map(link => {
                  if (link.name === socialNetwork) {
                        if (isValidUrl(link.url)) {
                              return { ...link, enabled: !link.enabled };
                        };
                        toast.error('URL no valida');
                  };
                  return link;
            });

            // console.log(updatedLinks);
            setDevtreeLinks(updatedLinks);
      };

      return (
            <div className="space-y-5">
                  {devtreeLinks.map(item => (
                        <DetreeInput
                              key={item.name}
                              item={item}
                              handleChange={handleChange}
                              handleEnableLink={handleEnableLink}
                        />
                  ))}
                  <button
                        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
                  >
                        Guardar Cambios
                  </button>
            </div>
      )
}

export default LinkTreeView