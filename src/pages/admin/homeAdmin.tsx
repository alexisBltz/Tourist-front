import {useAuth} from "../../service/authContext.tsx";
import "../../styles/Login.css"

export default function HomeAdmin (){

    const { user } = useAuth();

    // Asegúrate de que datosUsuarios existe y tiene al menos un elemento
    const nombreCompleto = user?.datosUsuarios?.length > 0 ?
        `${user?.datosUsuarios[0].nombre} 
        ${user?.datosUsuarios[0].apellidoPaterno.toUpperCase()} 
        ${user?.datosUsuarios[0].apellidoMaterno.toUpperCase()}`
        : '';
    return(
        <div>
            <h1 className="text-center p-96 login-page text-6xl font-semibold"> BIENVENIDO {nombreCompleto}</h1>
        </div>
    )
}