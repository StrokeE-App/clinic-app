"use client";

import { useEffect, useState } from "react";
import { StrokeeLogo } from "@/components/StrokeeLogo";
import EditProfileForm from "@/components/EditProfileForm";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { UserUpdateData } from "@/types";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import apiClient from "@/api/apiClient";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserUpdateData | null >(null);
  const { user } = useAuth();

  useEffect(() => {
    if(!user)return;
    const loadingToast = toast.loading('Cargando Ambulancias...');
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/healthCenter/${user.uid}`);
        setUserData(response.data.healthCenterStaff);
        toast.success('Usuario cargado.', {id: loadingToast});
      } catch (error) {
        console.error("Error fetching the user:", error);
        toast.error('Error al cargar el usuario, intente mas tarde.', {id: loadingToast});
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if(!userData && !loading){
    return(
      <>
      <div className="w-11/12 mx-auto p-6 ">
        <div className="text-center space-y-6">
          <div className="pb-4">
            <h1 className="text-2xl font-bold inline-block px-4 pb-1">
              Error al cargar el usuario
            </h1>
          </div>
        </div>
      </div>
    </>
    )
  }
  // else if(loading){
  //   return (
  //     <div className="w-11/12 mx-auto p-6 ">
  //       <div className="text-center space-y-6">
  //         <div className="pb-4">
  //           <h1 className="text-2xl font-bold inline-block px-4 pb-1">
  //             Cargando Usuario...
  //           </h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  else{
    return (
      <main>
        <div className="text-customRed mt-4 ml-4">
          <Link href="/dashboard">
            <ArrowBigLeft size={48} />
          </Link>
        </div>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
        <StrokeeLogo />
  
        {loading ? (
          <div className="w-6 h-6 border-2 border-customRed border-t-transparent rounded-full animate-spin" />
        ) : (
          <EditProfileForm firstName={userData ? userData.firstName : ''} lastName={userData? userData.lastName : ''} />
        )}
      </div>
      </main>
    );
  }
}
