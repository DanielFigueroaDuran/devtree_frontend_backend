import { Switch } from "@headlessui/react";
import { DevtreeLink } from "../types"
import { classNames } from "../utlis";

type DevTreeInputProps = {
      item: DevtreeLink
      handleChange: (element: React.ChangeEvent<HTMLInputElement>) => void
      handleEnableLink: (SocialNetwork: string) => void
};

const DetreeInput = ({ item, handleChange, handleEnableLink }: DevTreeInputProps) => {

      return (
            <div className="bg-white shadow-sm p-5 grid  lg:grid-rows-none lg:flex lg:gap-5 md:grid-rows-none  sm:grid-cols-1 sm:space-y-4">
                  <div
                        className="w-12 h-12 bg-cover"
                        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
                  >
                  </div>

                  <div className="flex items-center justify-between  w-full">
                        <input
                              className=" flex-1 border-gray-100 rounded-lg"
                              type="text"
                              value={item.url}
                              onChange={handleChange}
                              name={item.name}
                        />
                        <Switch
                              checked={item.enabled}
                              onChange={() => handleEnableLink(item.name)}
                              className={classNames(
                                    item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                              )}
                        >
                              <span
                                    aria-hidden="true"
                                    className={classNames(
                                          item.enabled ? 'translate-x-5' : 'translate-x-0',
                                          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                              />
                        </Switch>
                  </div>


            </div>
      )
};

export default DetreeInput