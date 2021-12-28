import {connect, connection} from 'mongoose';

const conn = {
  isConnected: false,
} 

export async function dbConnect() {
  if(conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URI);
  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName)
}

connection.on('연결된', ()=> {
  console.log('우리 데이터베이스에 연결된 MongoDB')
})


connection.on('error', (err)=> {
  console.log('MongoDB 오류', err.massage)
})