
import { currentUser } from "@clerk/nextjs/server"

const getUserRole=async ()=>{
    const user=await currentUser()
    if(!user){
        return null
    }
    const role=user.publicMetadata.role as string
    return role
}

export default getUserRole