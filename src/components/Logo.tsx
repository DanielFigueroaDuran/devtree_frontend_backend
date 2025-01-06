import { Link } from "react-router-dom"

const Logo = () => {
      return (
            <Link to={'/'}>
                  <img
                        className="w-full block"
                        src="/logo.svg"
                        alt="Logotipo Devtree"
                  />
            </Link>
      )
}

export default Logo