import { SocialNetwork } from "../types"

type DevtreeLinkProps = {
      link: SocialNetwork
}

const DevtreeLink = ({ link }: DevtreeLinkProps) => {
      return (

            <div className="bg-white mb-3 px-5 py-2 flex items-center gap-5 rounded-lg">
                  <div
                        className="w-12 h-12 bg-cover"
                        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
                  >
                  </div>
                  <p className="capitalize">Visita mi: <span className="font-bold">{link.name}</span></p>
            </div>
      )
}

export default DevtreeLink