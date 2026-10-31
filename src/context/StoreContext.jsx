import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStore, writeStore } from '../utils/format'
const StoreContext = createContext(null)
export function StoreProvider({ children }) {
  const [cart,setCart] = useState(()=>readStore('tv_cart',[]))
  const [wishlist,setWishlist] = useState(()=>readStore('tv_wishlist',[]))
  const [compare,setCompare] = useState(()=>readStore('tv_compare',[]))
  const [recent,setRecent] = useState(()=>readStore('tv_recent',[]))
  const [user,setUser] = useState(()=>readStore('tv_user',null))
  useEffect(()=>writeStore('tv_cart',cart),[cart])
  useEffect(()=>writeStore('tv_wishlist',wishlist),[wishlist])
  useEffect(()=>writeStore('tv_compare',compare),[compare])
  useEffect(()=>writeStore('tv_recent',recent),[recent])
  useEffect(()=>writeStore('tv_user',user),[user])
  const addToCart = (product, variant={}) => setCart(old=>{ const key=product.id+JSON.stringify(variant); const found=old.find(i=>i.key===key); return found?old.map(i=>i.key===key?{...i,quantity:Math.min(i.quantity+1,product.stock)}:i):[...old,{key,productId:product.id,name:product.name,price:product.price,image:product.image,stock:product.stock,quantity:1,variant}] })
  const setQuantity = (key,quantity) => setCart(old=>quantity<=0?old.filter(i=>i.key!==key):old.map(i=>i.key===key?{...i,quantity:Math.min(quantity,i.stock)}:i))
  const toggleWishlist = id => setWishlist(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id])
  const toggleCompare = id => setCompare(old=>old.includes(id)?old.filter(x=>x!==id):(old.length>=4?old:[...old,id]))
  const viewProduct = id => setRecent(old=>[id,...old.filter(x=>x!==id)].slice(0,6))
  const value=useMemo(()=>({cart,wishlist,compare,recent,user,setUser,addToCart,setQuantity,toggleWishlist,toggleCompare,viewProduct,setCart,setCompare,setWishlist}),[cart,wishlist,compare,recent,user])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)