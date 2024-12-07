import { Link } from "react-router-dom"

const LoginViews = () => {
      return (
            <>

                  <nav>
                        <Link to="/auth/register">
                              ¿No tienes cuenta? Crea una aqui
                        </Link>
                  </nav>
            </>
      )
}

export default LoginViews