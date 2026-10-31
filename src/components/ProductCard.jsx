import { Link } from 'react-router-dom'
import { Heart, Scale, Star, ShoppingBag, Check } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { money } from '../utils/format'
export default function ProductCard({product}) {
 const {wishlist,compare,toggleWishlist,toggleCompare,addToCart}=useStore()
 const saved=wishlist.includes(product.id), compared=compare.includes(product.id)
 return <article className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-3 transition hover:-translate-y-1 hover:shadow-soft sm:p-4">
  <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">{product.badge&&<span className="rounded-md bg-brand px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">{product.badge}</span>}{product.oldPrice&&<span className="w-fit rounded-md bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-600">-{Math.round((1-product.price/product.oldPrice)*100)}%</span>}</div>
  <div className="absolute right-3 top-3 z-10 flex flex-col gap-2"><button onClick={()=>toggleWishlist(product.id)} aria-label={saved?'Remove from wishlist':'Add to wishlist'} className={`grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ${saved?'text-rose-500':'text-slate-400 hover:text-rose-500'}`}><Heart size={16} fill={saved?'currentColor':'none'}/></button><button onClick={()=>toggleCompare(product.id)} aria-label="Compare product" className={`grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ${compared?'text-brand':'text-slate-400 hover:text-brand'}`}><Scale size={16}/></button></div>
  <Link to={`/product/${product.slug}`} className="product-image mb-4 aspect-[4/3] rounded-xl p-3"><img src={product.image} alt={product.name} loading="lazy"/></Link>
  <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">{product.brand} · {product.category}</div>
  <Link to={`/product/${product.slug}`} className="mb-2 min-h-[42px] text-sm font-bold leading-5 hover:text-brand">{product.name}</Link>
  <div className="mb-3 flex items-center gap-1 text-xs"><Star size={13} className="fill-amber-400 text-amber-400"/><b>{product.rating}</b><span className="text-slate-400">({product.reviews})</span><span className={`ml-auto text-[10px] font-semibold ${product.stock<=5?'text-rose-600':'text-emerald-600'}`}>{product.stock<=5?'Only '+product.stock+' left':'In stock'}</span></div>
  <div className="mt-auto flex items-end justify-between gap-2"><div><div className="text-lg font-extrabold tracking-tight">{money(product.price)}</div>{product.oldPrice&&<div className="text-xs text-slate-400 line-through">{money(product.oldPrice)}</div>}</div><button onClick={()=>addToCart(product)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white transition hover:bg-brand" aria-label={`Add ${product.name} to cart`}><ShoppingBag size={17}/></button></div>
 </article>
}