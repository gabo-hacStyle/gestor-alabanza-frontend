'use client';

import { getServicesByUserId } from "@/service/backend/users";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { useRouter } from "next/navigation";
import { hasRole, User } from "@/utils/roleUtils";

export default function UserDashboard({user}: {user: User}) {

  console.log(user);
  const router = useRouter();

  const [misServicios, setMisServicios] = useState<Service[]>([]);
  const [serviciosComoDirector, setServiciosComoDirector] = useState<Service[]>([]);

  useEffect(() => {
    const fetchMisServicios = async () => {
      const response = await getServicesByUserId(user.id);
  
      const serviciosComoDirector = response.filter(servicio =>
        Array.isArray(servicio.directors) && servicio.directors.some(director => director.id === user.id)
      );
  
      const serviciosComoMusico = response.filter(servicio =>
        (!Array.isArray(servicio.directors) || !servicio.directors.some(director => director.id === user.id)) &&
        Array.isArray(servicio.musiciansList) && servicio.musiciansList.some(musico => musico.musician.find(u => u.id === user.id))
      );
  
      setMisServicios(serviciosComoMusico);
      setServiciosComoDirector(serviciosComoDirector);
    };
    fetchMisServicios();
  }, []);




  //SOlo para directores, para editar canciones
  const handleAddSongs = (serviceId: string) => {
    console.log(serviceId);
    router.push(`/director/canciones/agregar/${serviceId}`);
  };


  const handleEditSongs = (serviceId: string) => {
    console.log(serviceId);
    router.push(`/director/canciones/editar/${serviceId}`);
  };

  
  return (
    <div className="space-y-6">
     <div className="grid gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Servicios asignados:</h3>
          <p className="text-3xl font-bold text-blue-600">{misServicios.length + serviciosComoDirector.length}</p>
          
        </div>

        {hasRole(user, 'DIRECTOR') && (
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-gray-900 mb-2">Servicios como director/directora:</h3>
            <p className="text-3xl font-bold text-blue-600">{serviciosComoDirector.length}</p>
            
          </div>
        )}
        
        {/* <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Próximo Servicio</h3>
          <p className="text-lg font-bold text-green-600">{misServicios[0].serviceDate}</p>
          <p className="text-sm text-gray-600">Servicio Dominical</p>
        </div> */}
      </div>
      <div className="bg-white rounded-lg shadow grid gap-4">
        {/* Servicios como director */}
        <div className="space-y-3">
          {hasRole(user, 'DIRECTOR') && serviciosComoDirector.map((servicio) => (
            <ServiceCard key={servicio.id} service={servicio} roles={user.roles || []}  
              onEditSongs={handleEditSongs}
              onAddSongs={handleAddSongs}
              instrument="director@"
            />
          ))}
        </div>
        
        {/* Servicios como musico */}
        <div className="space-y-3">

          {misServicios.map((servicio) => (
            <ServiceCard key={servicio.id} service={servicio} instrument={
              servicio.musiciansList?.find(musico => musico.musician.some(u => u.id === user.id))?.instrument || 'Instrumento no especificado'
            } />
          ))}
        </div>
      </div>

      

      

     
    </div>
  );
} 