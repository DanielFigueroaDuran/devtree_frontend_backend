import { Link } from "react-router-dom"

const RegisterViews = () => {
      return (
            <>
                  <nav className="mt-10">
                        <Link
                              className="text-center text-white text-lg block"
                              to="/auth/login">
                              ¿Ya tienes una cuenta?  Inicia Sessión
                        </Link>
                  </nav>
            </>
      )
}

export default RegisterViews