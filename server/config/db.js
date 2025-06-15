
 import mongoose from 'mongoose'

  const ConnectDb= async ()=>{
    
    try{
       
        const connect = await mongoose.connect(process.env.MONGO_URI);
    
         if(connect){
            console.log("Database Connected Successfully")
         }else{
            throw Error;
         }

    }catch(error){
        console.log("Error Connecting to the Database: ", error);

    }
  }

  export default ConnectDb;