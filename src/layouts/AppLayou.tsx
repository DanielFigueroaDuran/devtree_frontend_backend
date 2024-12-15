import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevtreeApi";
import Devtree from "../components/Devtree";


export default function AppLayout() {

      const { data, isLoading, isError } = useQuery({
            queryFn: getUser,
            queryKey: ['user'],
            retry: 1,
            refetchOnWindowFocus: false
      });

      if (isLoading) return 'Cargando....';
      if (isError) return <Navigate to={'/auth/login'} />
      if (data) return <Devtree data={data} />
}