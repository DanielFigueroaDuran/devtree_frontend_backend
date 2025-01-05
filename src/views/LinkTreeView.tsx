import { useEffect, useState } from "react"
import { social } from "../data/social"
import DetreeInput from "../components/DetreeInput";
import { isValidUrl } from "../utlis";
import { toast } from "sonner";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from "../api/DevtreeApi";
import { SocialNetwork, User } from "../types";

const LinkTreeView = () => {
      const [devtreeLinks, setDevtreeLinks] = useState(social);
      const queryClient = useQueryClient();
      const user: User = queryClient.getQueryData(['user'])!;
      //console.log(JSON.parse(user.links));

      const { mutate } = useMutation({
            mutationFn: updateProfile,
            onError: (error) => {
                  toast.error(error.message);
            },
            onSuccess: () => {
                  toast.success('Actualizado Correctamente');
            }
      });

      useEffect(() => {
            const updatedData = devtreeLinks.map(item => {
                  const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name);
                  if (userlink) {
                        return { ...item, url: userlink.url, enabled: userlink.enabled }
                  }
                  return item;
            })
            //console.log(devtreeLinks);
            setDevtreeLinks(updatedData);

      }, []);

      const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
            // console.log(element.target.value);
            // console.log(element.target.name);
            const updatedLinks = devtreeLinks.map(link => link.name === element.target.name
                  ? { ...link, url: element.target.value }
                  : link);
            setDevtreeLinks(updatedLinks);
      };

      const links: SocialNetwork[] = JSON.parse(user.links);

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

            //console.log(socialNetwork);

            let updatedItems: SocialNetwork[] = [];

            const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork);
            //console.log(selectSocialNetwork);
            if (selectedSocialNetwork?.enabled) {
                  //console.log('Habilitando', selectedSocialNetwork);
                  //console.log(links.length);
                  const id = links.filter(link => link.id).length + 1;
                  if (links.some(link => link.name === socialNetwork)) {
                        updatedItems = links.map(link => {
                              if (link.name === socialNetwork) {
                                    return {
                                          ...link,
                                          enabled: true,
                                          id: id
                                    }
                              } else {
                                    return link;
                              }
                        });
                  } else {
                        const newItem = {
                              ...selectedSocialNetwork,
                              id: id
                        };
                        updatedItems = [...links, newItem];
                  }

                  // console.log(newItem);
                  console.log(updatedItems);

            } else {
                  const indexToUpdate = links.findIndex(link => link.name === socialNetwork);
                  updatedItems = links.map(link => {
                        if (link.name === socialNetwork) {
                              return {
                                    ...link,
                                    id: 0,
                                    enabled: false
                              };
                        } else if (link.id > indexToUpdate) {
                              return {
                                    ...link,
                                    id: link.id - 1
                              };

                        } else {
                              return link
                        };
                  });
                  console.log(indexToUpdate);
            };
            console.log(updatedItems);

            // store in database

            queryClient.setQueryData(['user'], (prevData: User) => {
                  return {
                        ...prevData,
                        links: JSON.stringify(updatedItems)
                  };
            });
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
                        onClick={() => mutate(user)}
                  >
                        Guardar Cambios
                  </button>
            </div>
      )
}

export default LinkTreeView