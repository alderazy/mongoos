import db from "@/app/lib/db/db"
import User from "@/app/lib/models/User"
import bcrypt from "bcryptjs"
import { NextResponse,NextRequest } from "next/server"
import { UserSchema} from "@/app/lib/zod/valid"



export async function POST(req:NextRequest):Promise<NextResponse>{

    try{

        const body = await req.json()
        
       
        const rusltValidUser =  UserSchema.safeParse(body)

        if(!rusltValidUser.success){

          return   NextResponse.json(
            {message:"validtion faild", error:rusltValidUser.error.issues},
            {status:400})
        }
      
        const {name,email,password} = rusltValidUser.data

        await db()
 
        const userExists = await User.findOne({email})
 console.log("body is ===>")
        console.log(rusltValidUser.data)
        if(userExists){
            return NextResponse.json({message:"the email already exists"},{status:400})
        }

        

        const hashedPassword = await bcrypt.hash(password,10)

        await User.create({name,email,password:hashedPassword})
        return NextResponse.json({message:"sacsesfull create new acount"},{status:201})

    }
    catch(error){

        console.log(error)
        return NextResponse.json({message:"error server"},{status:500})

    }








}

