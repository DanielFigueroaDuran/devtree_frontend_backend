import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"
import { getUserByHandle } from "../api/DevtreeApi";
import HandleData from "../components/HandleData";

const HandleView = () => {
      const params = useParams();
      // console.log(params);
      const handle = params.handle!;
      // console.log(handle);

      const { data, error, isLoading } = useQuery({
            queryFn: () => getUserByHandle(handle),
            queryKey: ['handle', handle],
            retry: 1
      });

      if (isLoading) return <p className="text-white text-center">Cargando...</p>
      if (error) return <Navigate to={'/404'} />;

      if (data) return <HandleData data={data} />
}

export default HandleView