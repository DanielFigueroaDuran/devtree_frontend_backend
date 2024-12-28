import { useState } from "react"
import { social } from "../data/social"


const LinkTreeView = () => {
      const [devtreeLinks, setDevtreeLinks] = useState(social);
      console.log(devtreeLinks);
      return (
            <div>LinkTreeView</div>
      )
}

export default LinkTreeView