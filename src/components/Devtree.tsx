import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import NavigationTabs from "./NavigationTabs";
import { SocialNetwork, User } from "../types";
import DevtreeLink from "./DevtreeLink";
import Header from './Header';

type DevtreeProps = {
      data: User
};

const Devtree = ({ data }: DevtreeProps) => {
      // console.log(JSON.parse(data.links).filter(item => item.enabled));
      const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter(
            (item: SocialNetwork) => item.enabled));
      //console.log(enabledLinks);
      // console.log(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled));

      useEffect(() => {
            setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled));
      }, [data]);

      const queryClient = useQueryClient();

      const handleDragEnd = (element: DragEndEvent) => {
            // console.log(element.active);
            // console.log(element.over);
            const { active, over } = element;
            const prevIndex = enabledLinks.findIndex(Link => Link.id === active.id);
            const newIndex = enabledLinks.findIndex(Link => Link.id === over?.id);
            // console.log('preindex', prevIndex);
            // console.log('newindex', newIndex);
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order);

            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled);

            // console.log(disabledLinks);
            // console.log(order);

            const links = order.concat(disabledLinks);
            //console.log(links);

            queryClient.setQueryData(['user'], (prevData: User) => {
                  return {
                        ...prevData,
                        links: JSON.stringify(links)
                  };
            });

      };

      return (
            <>
                  <Header />
                  <div className="bg-gray-100  min-h-screen py-10">
                        <main className="mx-auto max-w-5xl p-10 md:p-0">

                              <NavigationTabs />

                              <div className="flex justify-end">
                                    <Link
                                          className="font-bold text-center  text-slate-800 text-2xl "
                                          to={`/${data.handle}`}
                                          target="_blank"
                                          rel="noreferrer noopener"
                                    >Visitar Mi Perfil /{data.handle}</Link>
                              </div>

                              <div className="flex flex-col md:flex-row gap-10 mt-10">
                                    <div className="flex-1 ">
                                          <Outlet />
                                    </div>
                                    <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                                          <p className="text-4xl text-center text-white">{data.handle}</p>
                                          {
                                                data.image &&
                                                <img
                                                      src={data.image}
                                                      alt="Imagen de Perfil"
                                                      className="mx-auto max-w-[200px]"
                                                />
                                          }
                                          <p className="text-center text-lg font-black text-white">{data.description}</p>

                                          <DndContext
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleDragEnd}
                                          >
                                                <div className="mt-20 flex-col gap-5">
                                                      <SortableContext
                                                            items={enabledLinks}
                                                            strategy={verticalListSortingStrategy}
                                                      >
                                                            {enabledLinks.map(link => (
                                                                  <DevtreeLink
                                                                        link={link}
                                                                        key={link.name}
                                                                  />
                                                            ))
                                                            }
                                                      </SortableContext>
                                                </div>
                                          </DndContext>

                                    </div>
                              </div>
                        </main>
                  </div>
                  <Toaster position="top-right" />
            </>
      )
}

export default Devtree