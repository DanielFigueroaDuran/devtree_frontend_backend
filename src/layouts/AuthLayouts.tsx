import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"


const AuthLayouts = () => {
      return (
            <>
                  <div className="bg-slate-800">
                        <div className="max-w-lg mx-auto pt-10 px-5">
                              <img src="/logo.svg" alt="Logo Devtree" />
                              <div className="py-18">
                                    <Outlet />
                              </div>
                        </div>
                  </div>

                  <Toaster position="top-right" richColors />
            </>
      )
}

export default AuthLayouts