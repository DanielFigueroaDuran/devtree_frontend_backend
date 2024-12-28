import { useState } from "react"
import { social } from "../data/social"
import DetreeInput from "../components/DetreeInput";


const LinkTreeView = () => {
      const [devtreeLinks, setDevtreeLinks] = useState(social);

      const handleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
            // console.log(element.target.value);
            // console.log(element.target.name);
            const updatedLinks = devtreeLinks.map(link => link.name === element.target.name
                  ? { ...link, url: element.target.value }
                  : link);
            setDevtreeLinks(updatedLinks);
      };

      return (
            <div className="space-y-5">
                  {devtreeLinks.map(item => (
                        <DetreeInput
                              key={item.name}
                              item={item}
                              handleChange={handleChange}
                        />
                  ))}
            </div>
      )
}

export default LinkTreeView