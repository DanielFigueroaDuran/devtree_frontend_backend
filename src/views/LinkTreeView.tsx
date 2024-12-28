import { useState } from "react"
import { social } from "../data/social"
import DetreeInput from "../components/DetreeInput";


const LinkTreeView = () => {
      const [devtreeLinks, setDevtreeLinks] = useState(social);
      console.log(devtreeLinks);
      return (
            <div className="space-y-5">
                  {devtreeLinks.map(item => (
                        <DetreeInput key={item.name} item={item} />
                  ))}
            </div>
      )
}

export default LinkTreeView