
function parse(txt){
 const rows=txt.trim().split(/\r?\n/).map(r=>r.split('\t'));
 const head=rows.shift().map(x=>x.trim().toUpperCase());
 return {head,rows};
}
function idx(head,names){
 for(const n of names){
  const i=head.indexOf(n.toUpperCase());
  if(i!=-1) return i;
 }
 return -1;
}
function compare(){
 const zm=parse(document.getElementById('zm').value);
 const qr=parse(document.getElementById('qr').value);

 const zmOrder=idx(zm.head,['ORDER ID']);
 const map=new Set(zm.rows.map(r=>(r[zmOrder]||'').trim()));

 const qOrder=idx(qr.head,['ORDER ID']);
 const qRRN=idx(qr.head,['RRN']);
 const qAmt=idx(qr.head,['AMOUNT']);
 const qMemo=idx(qr.head,['MEMO']);

 const tb=document.querySelector('#out tbody');
 tb.innerHTML='';
 qr.rows.forEach(r=>{
   const id=(r[qOrder]||'').trim();
   if(id && !map.has(id)){
      const memo=(r[qMemo]||'').split('||')[0];
      tb.innerHTML+=`<tr><td>${memo}</td><td>${id}</td><td>${r[qRRN]||''}</td><td>${r[qAmt]||''}</td></tr>`;
   }
 });
}
function copyTable(){
 let t='';
 document.querySelectorAll('#out tr').forEach(r=>{
   t+=[...r.cells].map(c=>c.innerText).join('\t')+'\n';
 });
 navigator.clipboard.writeText(t);
 alert('Hasil disalin');
}
