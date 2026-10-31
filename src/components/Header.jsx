import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Heart, UserRound, Menu, X, ChevronDown, Zap } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { categories } from '../data/products'
export default function Header() {
  const [query,setQuery]=useState(''); const [mobile,setMobile]=useState(false)
  const {cart,wishlist}=useStore(); const navigate=useNavigate()
  const submit=e=>{e.preventDefault();navigate(`/search?q=${encodeURIComponent(query)}`);setMobile(false)}
  const navClass=({isActive})=>`text-sm font-semibold transition ${isActive?'text-brand':'text-slate-600 hover:text-ink'}`
  return <>
    <div className="bg-ink text-white text-xs"><div className="container-wide flex justify-between py-2"><span className="hidden sm:block">Complimentary shipping on orders over $100</span><span className="mx-auto sm:mx-0 flex items-center gap-2"><Zap size={13} className="text-yellow-300"/> Tech Week: fresh finds, sharper prices</span><span className="hidden sm:block text-slate-300">Need help? Support center</span></div></div>
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-wide flex h-[76px] items-center gap-5">
        <button className="md:hidden p-2" onClick={()=>setMobile(!mobile)} aria-label="Toggle menu">{mobile?<X/>:<Menu/>}</button>
        <Link to="/" className="flex shrink-0 items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white"><Zap size={20} fill="currentColor"/></span><span className="font-display text-[22px] font-bold tracking-tight">tech<span className="text-brand">vault</span></span></Link>
        <form onSubmit={submit} className="hidden md:flex flex-1 max-w-[580px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-brand"><Search size={18} className="text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} className="w-full bg-transparent px-3 py-3 text-sm outline-none" placeholder="Search phones, laptops, audio and more..." aria-label="Search products"/><button className="text-xs font-bold text-brand">Search</button></form>
        <div className="ml-auto flex items-center gap-4">
          <Link to="/account" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand"><UserRound size={19}/><span className="hidden lg:block">Account</span></Link>
          <Link to="/wishlist" className="relative flex items-center gap-1 text-slate-600 hover:text-brand" aria-label="Wishlist"><Heart size={20}/><span className="hidden lg:block text-sm font-semibold">Saved</span>{wishlist.length>0&&<i className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] not-italic text-white">{wishlist.length}</i>}</Link>
          <Link to="/cart" className="relative flex items-center gap-1 text-slate-600 hover:text-brand" aria-label="Shopping cart"><ShoppingBag size={21}/><span className="hidden lg:block text-sm font-semibold">Cart</span>{cart.length>0&&<i className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] not-italic text-white">{cart.reduce((s,i)=>s+i.quantity,0)}</i>}</Link>
        </div>
      </div>
      <nav className="hidden border-t border-slate-100 md:block"><div className="container-wide flex h-11 items-center gap-7"><NavLink to="/products" className={navClass}>All products</NavLink>{categories.map(c=><NavLink key={c.name} to={`/category/${encodeURIComponent(c.name)}`} className={navClass}>{c.name}</NavLink>)}<NavLink to="/products?sort=newest" className="ml-auto text-sm font-bold text-brand">New arrivals <span>↗</span></NavLink></div></nav>
      {mobile&&<div className="border-t bg-white p-4 md:hidden"><form onSubmit={submit} className="mb-4 flex rounded-lg border px-3"><Search size={18} className="my-auto text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} className="w-full p-3 outline-none" placeholder="Search TechVault"/></form><div className="grid grid-cols-2 gap-3">{['All products',...categories.map(c=>c.name),'Compare','Order history'].map(n=><Link onClick={()=>setMobile(false)} className="rounded-lg bg-slate-50 p-3 text-sm font-semibold" key={n} to={n==='All products'?'/products':n==='Compare'?'/compare':n==='Order history'?'/orders':`/category/${encodeURIComponent(n)}`}>{n}</Link>)}</div></div>}
    </header>
  </>
}