const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./index.js');
test('all required REST endpoints', async (t) => {
 const server=app.listen(0);
 t.after(()=>server.close());
 const base='http://127.0.0.1:'+server.address().port;
 for(const [path,expected] of [['/',"Welcome to Camper Bot's homepage!"],['/hobbies','I cycle, go boating, and play guitar.'],['/skills','JavaScript, Node.js, and Express.js!']]){
  let r=await fetch(base+path); assert.equal(r.status,200);assert.equal(await r.text(),expected);
 }
 let r=await fetch(base+'/api/profile');assert.equal(r.status,200);
 assert.deepEqual(await r.json(), {name:'Camper Bot',hobbies:['cycling','boating','guitar'],skills:['JavaScript','Node.js','Express.js']});
});
