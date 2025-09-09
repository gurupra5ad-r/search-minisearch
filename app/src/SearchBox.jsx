// @ts-check
import React, { useEffect, useMemo, useState } from 'react';
export default function SearchBox(){
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const debounced = useDebounce(q, 200);
  useEffect(()=>{ if(!debounced){ setResults([]); return; }
    fetch(`http://localhost:3002/search?q=${encodeURIComponent(debounced)}`).then(r=>r.json()).then(setResults);
  },[debounced]);
  return (
    <div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{padding:8,width:'100%'}}/>
      <ul>
        {results.map(r=> <li key={r.id}><Highlight text={r.title} matches={r.match} /></li>)}
      </ul>
    </div>
  );
}
function useDebounce(v, ms){
  const [s, setS] = useState(v);
  useEffect(()=>{ const t=setTimeout(()=>setS(v), ms); return ()=>clearTimeout(t); },[v,ms]);
  return s;
}
function Highlight({ text, matches }){
  const tokens = useMemo(()=>{
    const m = matches?.flatMap(x=> x?.terms || []) || [];
    const pattern = m.length ? new RegExp(`(${m.join('|')})`, 'ig') : null;
    return pattern ? text.split(pattern) : [text];
  },[text, matches]);
  return <span>{tokens.map((t,i)=> i%2 ? <mark key={i}>{t}</mark> : <span key={i}>{t}</span>)}</span>;
}
