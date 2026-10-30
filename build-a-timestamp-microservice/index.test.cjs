const test=require('node:test');
const assert=require('node:assert/strict');
const {app}=require('./index.js');
test('date parsing and validation', async t=>{
 const server=app.listen(0); t.after(()=>server.close());
 const base='http://127.0.0.1:'+server.address().port+'/api/';
 const fixtures=[
  ['1451001600000',{unix:1451001600000,utc:'Fri, 25 Dec 2015 00:00:00 GMT'}],
  ['2015-12-25',{unix:1451001600000,utc:'Fri, 25 Dec 2015 00:00:00 GMT'}],
  ['invalid',{error:'Invalid Date'}],
 ];
 for(const [input,expected] of fixtures){
  const res=await fetch(base+input);assert.equal(res.status,200);assert.deepEqual(await res.json(),expected);
 }
 const current=await(await fetch(base)).json();
 assert.equal(typeof current.unix,'number');assert.equal(new Date(current.utc).getTime(),current.unix-(current.unix%1000));
 assert.ok(Math.abs(Date.now()-current.unix)<5000);
});
