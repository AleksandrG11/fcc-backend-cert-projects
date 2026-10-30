'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const WebSocket=require('ws');
const {WebSocketServer}=WebSocket;
const PORT=Number(process.env.PORT)||3001;
const server=http.createServer((_req,res)=>{
 fs.readFile(path.join(__dirname,'public','index.html'),(err,html)=>{
  if(err){res.writeHead(500,{'Content-Type':'text/plain'});res.end('Internal Server Error');return;}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);
 });
});
const wss=new WebSocketServer({server});
function broadcast(payload){
 const msg=JSON.stringify(payload);
 wss.clients.forEach(client=>{if(client.readyState===WebSocket.OPEN) client.send(msg);});
}
wss.on('connection',(socket,req)=>{
 const username=new URL(req.url,'http://localhost').searchParams.get('username')||'Anonymous';
 broadcast({type:'system',text:username+' joined'});
 socket.on('message',raw=>{
  let parsed;
  try{parsed=JSON.parse(raw.toString());}
  catch{return socket.send(JSON.stringify({type:'error',text:'Invalid JSON'}));}
  if(typeof parsed?.text!=='string' || !parsed.text.trim())return;
  broadcast({type:'chat',username,text:parsed.text});
 });
 socket.on('close',()=>broadcast({type:'system',text:username+' left'}));
});
if(require.main===module)server.listen(PORT,()=>console.log('Chat server running at http://localhost:3001'));
module.exports={server,wss,broadcast};
