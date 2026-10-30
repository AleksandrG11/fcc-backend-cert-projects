import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET='CERT50-local-testing-secret-that-is-not-for-production';
const { default: app }=await import('./index.js');

test('JWT-based authentication and role-aware watchlist CRUD',async t=>{
 const fixturePath=path.join(import.meta.dirname,'data/watchlists.json');
 const baseline=fs.readFileSync(fixturePath);
 const server=app.listen(0);
 t.after(async()=>{
  await new Promise(resolve=>server.close(resolve));
  fs.writeFileSync(fixturePath,baseline);
 });
 const root='http://127.0.0.1:'+server.address().port;
 const json=(p,token,method='GET',body)=>{
  const headers={'content-type':'application/json'};
  if(token)headers.authorization='Bearer '+token;
  return fetch(root+p,{method,headers,body:body?JSON.stringify(body):undefined});
 };
 const dad=(await(await json('/api/auth/login',null,'POST',{username:'dad_miller',password:'parent456'})).json()).token;
 const child=(await(await json('/api/auth/login',null,'POST',{username:'jake_miller',password:'child123'})).json()).token;
 assert.ok(dad && child,'valid accounts should be able to sign in');
 assert.equal((await json('/api/auth/login',null,'POST',{})).status,400);
 assert.equal((await json('/api/auth/login',null,'POST',{username:'unknown',password:'test'})).status,401);
 assert.equal((await json('/api/auth/login',null,'POST',{username:'dad_miller',password:'wrong'})).status,401);
 assert.equal((await json('/api/watchlist/3')).status,401);
 assert.equal((await json('/api/watchlist/3','not-a-jwt')).status,401);
 const crossRead=await json('/api/watchlist/1',child);
 assert.equal(crossRead.status,403,'children must not read siblings records');
 const ownRead=await json('/api/watchlist/3',child);
 assert.equal(ownRead.status,200);
 assert.ok(Array.isArray(await ownRead.json()));
 const parentRead=await json('/api/watchlist/3',dad);
 assert.equal(parentRead.status,200);
 assert.ok(Array.isArray(await parentRead.json()));
 assert.equal((await json('/api/watchlist/4/movies',child,'POST',{title:'Dune',genre:'Sci-fi'})).status,403);
 const owned=await json('/api/watchlist/3/movies',child,'POST',{title:'Dune',genre:'Sci-Fi'});
 assert.equal(owned.status,201);
 const {id}=await owned.json();
 assert.ok(Number.isInteger(id));
 assert.equal((await json('/api/watchlist/3/movies/'+id,child,'PUT',{title:{unsafe:true}})).status,400);
 assert.equal((await json('/api/watchlist/3/movies/'+id,child,'PUT',{genre:'  '})).status,400);
 assert.equal((await json('/api/watchlist/3/movies/'+id,child,'PUT',{unknownField:'x'})).status,400);
 assert.equal((await json('/api/watchlist/3/movies/'+id,child,'PUT',{watched:'yes'})).status,400);
 const changed=await json('/api/watchlist/3/movies/'+id,child,'PUT',{watched:true});
 assert.equal(changed.status,200);
 assert.equal((await changed.json()).watched,true);
 assert.equal((await json('/api/watchlist/3/movies/'+id,child,'DELETE')).status,200);
 const other=await json('/api/watchlist/3/movies',dad,'POST',{title:'Arrival',genre:'Sci-Fi'});
 assert.equal(other.status,201);
 const {id:otherId}=await other.json();
 assert.equal((await json('/api/watchlist/3/movies/'+otherId,dad,'PUT',{title:'Interstellar'})).status,200);
 assert.equal((await json('/api/watchlist/3/movies/'+otherId,dad,'DELETE')).status,200);
 const token=jwt.sign({id:3,username:'jake_miller',role:'child'},process.env.JWT_SECRET,{expiresIn:'1s'});
 assert.equal((await json('/api/watchlist/3',token)).status,200);
 const expired=jwt.sign({id:3,role:'child'},process.env.JWT_SECRET,{expiresIn:-1});
 assert.equal((await json('/api/watchlist/3',expired)).status,401);
});

