import React,{useEffect,useMemo,useRef,useState} from 'react'
import {createRoot} from 'react-dom/client'
import {AnimatePresence,motion} from 'framer-motion'
import gsap from 'gsap'
import {ArrowDownRight,ArrowRight,ArrowUpRight,Search,ShoppingBag,Heart,Menu,X,Plus,Minus,UserRound,SlidersHorizontal,Check,Star,Instagram,MoveUpRight} from 'lucide-react'
import {Toaster,toast} from 'sonner'
import {Button} from './button'
import {Dialog,DialogContent} from './dialog'
import OrbScene from './OrbScene'
import './index.css'
import './styles.css'
import './morrow-auth.css'
import './morrow-upgrades.css'

// [id, name, category, price, tag, tone, image url]
// EXACTLY 50 PRODUCTS

const productRows = [

  // BAGS (1-12)

  [1,'Arc Carryall','Bags',3890,'BEST SELLER','Olive / recycled nylon','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85'],
  [2,'Minimal Leather Tote','Bags',2490,'JUST LANDED','Black leather','https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85'],
  [3,'Urban Crossbody','Bags',1890,'EDITOR PICK','Cream','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85'],
  [4,'Weekend Travel Bag','Bags',4290,'TRENDING','Brown','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85'],
  [5,'Soft Structure Tote','Bags',3290,'LOW IMPACT','Sand','https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85'],
  [6,'Classic Shoulder Bag','Bags',3590,'BEST SELLER','Tan','https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85'],
  [7,'City Backpack','Bags',1990,'NEW ARRIVAL','Black','https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=900&q=85'],
  [8,'Mini Bucket Bag','Bags',2990,'EDITOR PICK','Beige','https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85'],
  [9,'Everyday Shopper','Bags',1490,'TRENDING','White','https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85'],
  [10,'Leather Sling Bag','Bags',2690,'ESSENTIAL','Brown','https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=900&q=85'],
  [11,'Modern Clutch','Bags',2190,'JUST LANDED','Black','https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85'],
  [12,'Premium Backpack','Bags',3990,'COMMUNITY FAVOURITE','Olive','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85'],

  // CLOTHING (13-24)

  [13,'Classic White T-Shirt','Clothing',790,'BEST SELLER','White cotton','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85'],
  [14,'Relaxed Linen Shirt','Clothing',1490,'JUST LANDED','Cream','https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85'],
  [15,'Oversized Cotton Tee','Clothing',990,'EDITOR PICK','Black','https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85'],
  [16,'Premium Hoodie','Clothing',2290,'TRENDING','Grey','https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85'],
  [17,'Straight Denim Jeans','Clothing',2590,'BEST SELLER','Blue denim','https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85'],
  [18,'Classic Denim Jacket','Clothing',2990,'NEW ARRIVAL','Blue','https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=85'],
  [19,'Minimal Summer Dress','Clothing',1890,'EDITOR PICK','Beige','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85'],
  [20,'Modern Blazer','Clothing',3590,'PREMIUM','Black','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85'],
  [21,'Casual Sweatshirt','Clothing',1790,'ESSENTIAL','Olive','https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85'],
  [22,'Relaxed Trousers','Clothing',1990,'JUST LANDED','Sand','https://images.unsplash.com/photo-1506629905607-d9d8e7c5a3a3?auto=format&fit=crop&w=900&q=85'],
  [23,'Elegant Knitwear','Clothing',2490,'TRENDING','Brown','https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85'],
  [24,'Everyday Jacket','Clothing',3290,'COMMUNITY FAVOURITE','Stone','https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=900&q=85'],

  // OBJECTS (25-36)

  [25,'Minimal Ceramic Vase','Objects',890,'BEST SELLER','White ceramic','https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85'],
  [26,'Sculptural Table Lamp','Objects',2490,'JUST LANDED','Warm white','https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85'],
  [27,'Essential Coffee Mug','Objects',490,'EDITOR PICK','Cream','https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85'],
  [28,'Handmade Ceramic Bowl','Objects',790,'TRENDING','Sand','https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85'],
  [29,'Scented Soy Candle','Objects',990,'BEST SELLER','Vanilla','https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85'],
  [30,'Modern Water Bottle','Objects',690,'NEW ARRIVAL','Silver','https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85'],
  [31,'Minimal Desk Setup','Objects',1590,'EDITOR PICK','Natural wood','https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85'],
  [32,'Modern Photo Frame','Objects',590,'ESSENTIAL','Oak','https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85'],
  [33,'Woven Storage Basket','Objects',1190,'LOW IMPACT','Natural','https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85'],
  [34,'Minimal Notebook','Objects',390,'BEST SELLER','Brown','https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85'],
  [35,'Modern Planter','Objects',890,'JUST LANDED','Green','https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85'],
  [36,'Premium Desk Organizer','Objects',1290,'TRENDING','Wood','https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85'],

  // FOOTWEAR (37-44)

  [37,'Classic White Sneakers','Footwear',2990,'BEST SELLER','White','https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85'],
  [38,'Minimal Leather Slides','Footwear',1490,'JUST LANDED','Brown','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85'],
  [39,'Urban Running Shoes','Footwear',3490,'EDITOR PICK','Black','https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'],
  [40,'Classic Chelsea Boots','Footwear',4290,'PREMIUM','Brown','https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=85'],
  [41,'Retro Court Sneakers','Footwear',2790,'TRENDING','White / green','https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85'],
  [42,'Everyday Loafers','Footwear',2490,'ESSENTIAL','Black','https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=85'],
  [43,'Premium Sandals','Footwear',1890,'NEW ARRIVAL','Tan','https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85'],
  [44,'Sport Trainers','Footwear',3290,'COMMUNITY FAVOURITE','Grey','https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=85'],

  // ACCESSORIES (45-50)

  [45,'Classic Sunglasses','Accessories',1290,'BEST SELLER','Black','https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85'],
  [46,'Minimal Wrist Watch','Accessories',2490,'PREMIUM','Silver','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'],
  [47,'Leather Wallet','Accessories',990,'ESSENTIAL','Brown','https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85'],
  [48,'Everyday Cap','Accessories',690,'NEW ARRIVAL','Black','https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85'],
  [49,'Minimal Silver Jewellery','Accessories',1590,'EDITOR PICK','Silver','https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85'],
  [50,'Premium Leather Belt','Accessories',1190,'TRENDING','Brown','https://images.unsplash.com/photo-1624222247344-550fb8f6c7b7?auto=format&fit=crop&w=900&q=85']

];

const products = productRows.map(([id,name,category,price,tag,tone,img]) => ({id,name,category,price,tag,tone,img}));

const fallbackImg = p => `https://picsum.photos/seed/morrow-${p.id}/900/1100`

const money=n=>'₹'+n.toLocaleString('en-IN')
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}

function App(){

 const [cart,setCart]=useState(()=>read('morrow-cart',[])),[saved,setSaved]=useState(()=>read('morrow-saved',[])),[category,setCategory]=useState('All'),[query,setQuery]=useState(''),[sort,setSort]=useState('featured')

 const [cartOpen,setCartOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false),[active,setActive]=useState(null),[authOpen,setAuthOpen]=useState(false),[user,setUser]=useState(()=>read('morrow-user',null)),[email,setEmail]=useState(''),[password,setPassword]=useState('')
 const [authMethod,setAuthMethod]=useState('email'),[phone,setPhone]=useState(''),[otp,setOtp]=useState(''),[otpSent,setOtpSent]=useState(false)
 const [assistantOpen,setAssistantOpen]=useState(false),[assistantText,setAssistantText]=useState(''),[assistantReply,setAssistantReply]=useState('Try asking me for bags, outfits, or products under ₹2,000.')

 const heroRef=useRef(null)

 useEffect(()=>{localStorage.setItem('morrow-cart',JSON.stringify(cart))},[cart])
 useEffect(()=>{localStorage.setItem('morrow-saved',JSON.stringify(saved))},[saved])
 useEffect(()=>{localStorage.setItem('morrow-user',JSON.stringify(user))},[user])

 useEffect(()=>{
   const ctx=gsap.context(()=>{
     gsap.from('.hero-kicker,.hero-title,.hero-copy,.hero-cta',{
       y:28,opacity:0,duration:.9,stagger:.13,ease:'power3.out',delay:.15
     })
   },heroRef)
   return()=>ctx.revert()
 },[])

 const total=cart.reduce((s,p)=>s+p.price*p.qty,0)
 const count=cart.reduce((s,p)=>s+p.qty,0)

 const filtered=useMemo(()=>{
   let a=products.filter(p=>
     (category==='All'||p.category===category)&&
     (p.name.toLowerCase().includes(query.toLowerCase())||
      p.category.toLowerCase().includes(query.toLowerCase()))
   )
   if(sort==='low')a.sort((x,y)=>x.price-y.price)
   if(sort==='high')a.sort((x,y)=>y.price-x.price)
   return a
 },[category,query,sort])

 const add=p=>{
   setCart(old=>{
     const f=old.find(x=>x.id===p.id)
     return f
       ?old.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x)
       :[...old,{...p,qty:1}]
   })
   toast.success(`${p.name} added to your bag`)
 }

 const qty=(id,n)=>
   setCart(old=>
     old.map(p=>p.id===id?{...p,qty:p.qty+n}:p).filter(p=>p.qty>0)
   )

 const toggleSave=p=>{
   setSaved(s=>s.includes(p.id)?s.filter(x=>x!==p.id):[...s,p.id])
   toast.success(saved.includes(p.id)?'Removed from saved items':'Saved for later')
 }

 const jump=id=>{
   document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
   setMenuOpen(false)
 }

 const sendOtp=e=>{
  e.preventDefault()
  if(authMethod==='email'&&!email)return
  if(authMethod==='phone'&&phone.length!==10)return
  setOtpSent(true)
  setOtp('')
  toast('OTP preview opened. Connect Firebase Authentication to send a real code.')
 }

 const verifyOtp=e=>{
  e.preventDefault()
  toast.error('Real OTP verification is not connected yet. Configure Firebase Authentication before accepting sign-ins.')
 }

 const onImgError=p=>e=>{
   e.currentTarget.onerror=null
   e.currentTarget.src=fallbackImg(p)
 }

 return <div className="min-h-screen bg-[#10110f] text-[#f4f1e9]">
<Toaster theme="dark" position="bottom-center" richColors/>

  <div className="announcement">
   <span>THE OBJECTS EDIT / 001</span>
   <span>FREE SHIPPING ON ORDERS OVER ₹2,999</span>
   <span>MADE TO MOVE WITH YOU ↗</span>
  </div>

  <header className="site-header">

   <a className="wordmark" href="#top" onClick={e=>{e.preventDefault();jump('top')}}>
    morrow<span>®</span>
   </a>

   <nav className={menuOpen?'nav-links show':'nav-links'}>
    <button onClick={()=>jump('shop')}>Shop all</button>
    <button onClick={()=>{setCategory('Clothing');jump('shop')}}>Wear</button>
    <button onClick={()=>{setCategory('Bags');jump('shop')}}>Carry</button>
    <button onClick={()=>{setCategory('Objects');jump('shop')}}>Objects</button>
    <button onClick={()=>jump('manifesto')}>Our point of view</button>
   </nav>

   <div className="header-right">

    <button className="header-icon" onClick={()=>{
      jump('shop')
      setTimeout(()=>document.getElementById('search')?.focus(),400)
    }} aria-label="Search">
     <Search size={18}/>
    </button>

    <button className="header-icon user-icon" onClick={()=>setAuthOpen(true)} aria-label="Account">
     <UserRound size={18}/>
    </button>

    <button className="bag-button" onClick={()=>setCartOpen(true)}>
     <ShoppingBag size={16}/>
     <span>Bag ({count})</span>
    </button>

    <button className="mobile-toggle" onClick={()=>setMenuOpen(!menuOpen)}>
     <Menu/>
    </button>

   </div>
  </header>

  <main id="top">

   <section className="hero" ref={heroRef}>

    <div className="hero-left">

     <div className="hero-kicker">
      <span className="pulse-dot"/>
      A NEW PERSPECTIVE ON EVERYDAY
     </div>

     <h1 className="hero-title">
      Objects for<br/>
      the life you're<br/>
      <em>making.</em>
     </h1>

     <p className="hero-copy">
      A considered collection of things to wear, carry and keep.
      Designed for real life, made to outlast the scroll.
     </p>

     <div className="hero-cta">
      <Button size="lg" onClick={()=>jump('shop')}>
       Explore the collection
       <ArrowUpRight size={17}/>
      </Button>
      <span>01 / 04 — THE EVERYDAY EDIT</span>
     </div>

     <div className="hero-bottom-note">
      <span>DESIGNED WITH INTENTION</span>
      <span>EST. 2024 · INDIA</span>
     </div>

    </div>

    <div className="hero-right">

     <div className="orb-label label-top">
      FORM STUDY Nº 001<br/>
      <b>THE LIVING OBJECT</b>
     </div>

     <OrbScene/>

     <div className="orb-ring ring-one"/>
     <div className="orb-ring ring-two"/>

     <div className="orb-label label-bottom">
      A LITTLE LESS ORDINARY
      <ArrowDownRight size={15}/>
     </div>

     <div className="orb-index">3D / INTERACTIVE</div>

    </div>

    <div className="vertical-note">
     SCROLL TO DISCOVER — 2026
    </div>

   </section>

   <section className="ticker">
    <div>
     GOOD DESIGN, GOOD ENERGY <i>✳</i>
     EVERYDAY, ELEVATED <i>✳</i>
     KEEP WHAT MATTERS <i>✳</i>
     GOOD DESIGN, GOOD ENERGY <i>✳</i>
    </div>
   </section>

   {/* SHOP SECTION */}

   <section className="shop-section" id="shop">

    <div className="section-head">
     <div>
      <div className="eyebrow">01 — THE COLLECTION</div>
      <h2>Find your <em>everyday.</em></h2>
     </div>
     <p>
      Less noise. Better objects.<br/>
      A few things worth keeping.
     </p>
    </div>

    <div className="shop-controls">

     <div className="filters">
      {['All','Clothing','Bags','Objects','Footwear','Accessories'].map(c=>
       <button
        key={c}
        className={category===c?'filter-active':''}
        onClick={()=>setCategory(c)}
       >
        {c}
       </button>
      )}
     </div>

     <div className="shop-tools">

      <label className="search-field">
       <Search size={15}/>
       <input
        id="search"
        value={query}
        onChange={e=>setQuery(e.target.value)}
        placeholder="Search the collection"
       />
      </label>

      <select value={sort} onChange={e=>setSort(e.target.value)}>
       <option value="featured">Featured</option>
       <option value="low">Price: low to high</option>
       <option value="high">Price: high to low</option>
      </select>

     </div>
    </div>

    <div className="product-grid">

     <AnimatePresence mode="popLayout">

      {filtered.map((p,i)=>(

       <motion.article
        className="product-card"
        key={p.id}
        layout
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        exit={{opacity:0,scale:.96}}
        transition={{
         duration:.3,
         delay:Math.min(i,12)*.025
        }}
       >

        <div className="product-photo" onClick={()=>setActive(p)}>

         <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          onError={onImgError(p)}
         />

         <span className="product-tag">{p.tag}</span>

         <button
          className={'save-button '+(saved.includes(p.id)?'saved':'')}
          onClick={e=>{
           e.stopPropagation()
           toggleSave(p)
          }}
          aria-label="Save product"
         >
          <Heart
           size={16}
           fill={saved.includes(p.id)?'currentColor':'none'}
          />
         </button>

         <button
          className="add-quick"
          onClick={e=>{
           e.stopPropagation()
           add(p)
          }}
         >
          ADD TO BAG
          <Plus size={14}/>
         </button>

        </div>

        <div className="product-meta">
         <div>
          <h3>{p.name}</h3>
          <p>{p.tone}</p>
         </div>
         <b>{money(p.price)}</b>
        </div>

       </motion.article>

      ))}

     </AnimatePresence>

    </div>

    {filtered.length===0&&
     <div className="no-results">
      No objects found. Try another search.
     </div>
    }

   </section>

   {/* CURATED EDITS */}
   <section className="curated-edits">
    <div className="section-head"><div><div className="eyebrow">CURATED FOR YOUR EVERYDAY</div><h2>A little edit of <em>good things.</em></h2></div><p>Thoughtful picks, made easier to discover.</p></div>
    <div className="edit-grid">
     <button className="edit-tile edit-large" onClick={()=>{setCategory('Bags');jump('shop')}}><img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85" alt="Bags collection"/><span>01 / CARRY BETTER</span><b>The everyday bag edit <ArrowUpRight size={17}/></b></button>
     <button className="edit-tile" onClick={()=>{setCategory('Clothing');jump('shop')}}><img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85" alt="Clothing collection"/><span>02 / LESS, BUT BETTER</span><b>Wear on repeat <ArrowUpRight size={17}/></b></button>
     <button className="edit-tile" onClick={()=>{setCategory('Objects');jump('shop')}}><img src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=85" alt="Objects collection"/><span>03 / SPACE TO KEEP</span><b>Objects with purpose <ArrowUpRight size={17}/></b></button>
    </div>
   </section>

   {/* MANIFESTO */}

   <section className="manifesto" id="manifesto">

    <div className="manifesto-image">
     <img
      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=85"
      alt="Thoughtfully curated wardrobe"
     />
     <span>
      NOT MADE FOR THE MOMENT.<br/>
      MADE FOR THE MANY.
     </span>
    </div>

    <div className="manifesto-copy">

     <div className="eyebrow">02 — OUR POINT OF VIEW</div>

     <h2>
      Keep the things<br/>
      that <em>mean</em><br/>
      something.
     </h2>

     <p>
      We don't believe in more. We believe in better.
      Morrow is a growing collection of thoughtful essentials,
      made with an eye for form, function and the small details
      that make a thing feel right.
     </p>

     <Button
      variant="secondary"
      onClick={()=>toast('Our story is coming soon')}
     >
      A little more about us
      <ArrowUpRight size={16}/>
     </Button>

     <div className="manifesto-sign">
      MAKE SPACE FOR WHAT MATTERS.
      <span>✳</span>
     </div>

    </div>

   </section>

   {/* NEWSLETTER */}

   <section className="newsletter">

    <div className="eyebrow">03 — NOTES FROM MORROW</div>

    <h2>
     Good things.<br/>
     <em>Occasionally.</em>
    </h2>

    <p>
     New arrivals, considered stories and things we're into.
     No noise.
    </p>

    <form onSubmit={e=>{
     e.preventDefault()
     toast.success('You are on the list. See you soon!')
     e.target.reset()
    }}>
     <input type="email" placeholder="Your email address" required/>
     <button aria-label="Subscribe">
      <ArrowRight/>
     </button>
    </form>

    <span>BY SIGNING UP, YOU AGREE TO OUR OCCASIONAL NOTES.</span>

   </section>

  </main>

  {/* MORROW SHOPPING ASSISTANT: local product discovery demo */}
  <div className="morrow-assistant">
   {assistantOpen && <motion.div className="assistant-panel" initial={{opacity:0,y:18,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:18}}>
    <div className="assistant-head"><div><span className="assistant-dot"/> MORROW CONCIERGE <small>SHOPPING HELPER</small></div><button onClick={()=>setAssistantOpen(false)} aria-label="Close assistant"><X size={17}/></button></div>
    <div className="assistant-message"><b>Welcome to Morrow.</b><p>{assistantReply}</p></div>
    <div className="assistant-prompts">
     <button onClick={()=>setAssistantReply('For college, try the City Backpack, Everyday Shopper, or Classic White T-Shirt. Browse Bags and Clothing in the collection.')}>College essentials</button>
     <button onClick={()=>setAssistantReply('Ideas under ₹2,000 include Urban Crossbody, Classic White T-Shirt, Essential Coffee Mug and Everyday Cap. Use the price sort to explore more.')}>Under ₹2,000</button>
     <button onClick={()=>setAssistantReply('For a simple everyday look, pair the Classic White T-Shirt with Straight Denim Jeans and a City Backpack.')}>Suggest an outfit</button>
    </div>
    <form className="assistant-input" onSubmit={e=>{e.preventDefault();const q=assistantText.toLowerCase();const matches=products.filter(p=>q.includes('bag')?p.category==='Bags':q.includes('shoe')||q.includes('sneaker')?p.category==='Footwear':q.includes('cloth')||q.includes('shirt')?p.category==='Clothing':p.price<=2000).slice(0,4);setAssistantReply(matches.length?`Some ideas: ${matches.map(p=>`${p.name} (${money(p.price)})`).join(', ')}.`:'Try asking for bags, clothing, footwear, or products under ₹2,000.');setAssistantText('')}}><input value={assistantText} onChange={e=>setAssistantText(e.target.value)} placeholder="Ask for a product idea…"/><button aria-label="Send message"><ArrowUpRight size={17}/></button></form>
    <small className="assistant-disclaimer">Product discovery preview · no external AI service connected</small>
   </motion.div>}
   <button className="assistant-launch" onClick={()=>setAssistantOpen(v=>!v)}><span>{assistantOpen?'Close':'Ask Morrow'}</span>{assistantOpen?<X size={18}/>:<span className="assistant-spark">✳</span>}</button>
  </div>

  {/* FOOTER */}

  <footer>

   <div className="footer-top">
    <a className="wordmark" href="#top">
     morrow<span>®</span>
    </a>
    <p>Objects for the life you're making.</p>
    <div className="footer-social">
     <Instagram size={17}/>
     <span>FOLLOW THE EVERYDAY</span>
    </div>
   </div>

   <div className="footer-bottom">
    <span>© MORROW 2026</span>
    <span>DESIGNED WITH INTENTION / MADE IN INDIA</span>
    <button onClick={()=>jump('top')}>BACK TO TOP ↑</button>
   </div>

  </footer>

  {/* CART DRAWER */}

  <AnimatePresence>

   {cartOpen&&<>

    <motion.div
     className="drawer-scrim"
     initial={{opacity:0}}
     animate={{opacity:1}}
     exit={{opacity:0}}
     onClick={()=>setCartOpen(false)}
    />

    <motion.aside
     className="cart-drawer"
     initial={{x:'100%'}}
     animate={{x:0}}
     exit={{x:'100%'}}
     transition={{
      type:'spring',
      damping:28,
      stiffness:240
     }}
    >

     <div className="drawer-head">

      <div>
       <div className="eyebrow">YOUR SELECTION</div>
       <h2>Shopping bag <small>({count})</small></h2>
      </div>

      <button
       className="close-button"
       onClick={()=>setCartOpen(false)}
      >
       <X/>
      </button>

     </div>

     {cart.length===0?

      <div className="empty-bag">
       <ShoppingBag size={35}/>
       <h3>Nothing in here. Yet.</h3>
       <p>Good things are waiting to be found.</p>
       <Button onClick={()=>setCartOpen(false)}>
        Explore the collection
       </Button>
      </div>

      :

      <>

       <div className="cart-list">

        {cart.map(p=>(

         <div className="cart-row" key={p.id}>

          <img
           src={p.img}
           alt={p.name}
           onError={onImgError(p)}
          />

          <div className="cart-row-info">
           <h3>{p.name}</h3>
           <p>{p.tone}</p>
           <b>{money(p.price)}</b>

           <div className="quantity">

            <button onClick={()=>qty(p.id,-1)}>
             <Minus size={12}/>
            </button>

            <span>{p.qty}</span>

            <button onClick={()=>qty(p.id,1)}>
             <Plus size={12}/>
            </button>

           </div>
          </div>

          <button
           className="remove-item"
           onClick={()=>qty(p.id,-p.qty)}
          >
           REMOVE
          </button>

         </div>

        ))}

       </div>

       <div className="cart-foot">

        <p>
         {total>=2999
          ?'You unlocked complimentary shipping.'
          :'Complimentary shipping over ₹2,999.'}
        </p>

        <div className="cart-total">
         <span>Subtotal</span>
         <b>{money(total)}</b>
        </div>

        <small>
         Taxes included. Shipping calculated at checkout.
        </small>

        <Button
         className="w-full mt-5"
         size="lg"
         onClick={()=>{
          setCartOpen(false)
          toast.success('Checkout demo: connect a payment provider to accept real orders.')
         }}
        >
         Continue to checkout
         <ArrowRight size={16}/>
        </Button>

       </div>

      </>

     }

    </motion.aside>

   </>}

  </AnimatePresence>

  {/* PRODUCT DETAILS */}

  <Dialog
   open={!!active}
   onOpenChange={o=>!o&&setActive(null)}
  >

   <DialogContent>

    {active&&

     <div className="detail-modal">

      <img
       src={active.img}
       alt={active.name}
       onError={onImgError(active)}
      />

      <div className="eyebrow">{active.tag}</div>

      <h2>{active.name}</h2>

      <p>{active.tone}</p>

      <b>{money(active.price)}</b>

      <p className="detail-description">
       An everyday essential with considered details,
       selected for its form, function and ability to
       become part of your routine.
      </p>

      <Button
       className="w-full"
       onClick={()=>{
        add(active)
        setActive(null)
        setCartOpen(true)
       }}
      >
       Add to bag
       <ShoppingBag size={16}/>
      </Button>

      <button
       className="save-detail"
       onClick={()=>toggleSave(active)}
      >
       <Heart size={15}/>
       {saved.includes(active.id)
        ?'Saved to your list'
        :'Save for later'}
      </button>

     </div>

    }

   </DialogContent>

  </Dialog>

  {/* LOGIN / ACCOUNT */}
  <Dialog open={authOpen} onOpenChange={setAuthOpen}>
   <DialogContent>
    <div className="auth-modal morrow-auth">
     <div className="auth-visual">
      <div className="auth-orbit"><span>m</span></div>
      <div className="eyebrow">A MORE CONSIDERED EVERYDAY</div>
      <p>Good things are better when they feel like yours.</p>
      <span className="auth-edition">MORROW® / MEMBER ACCESS</span>
     </div>

     <div className="auth-panel">
      <div className="eyebrow">YOUR MORROW ACCOUNT</div>
      <h2>{user ? 'Welcome back.' : otpSent ? 'Check your inbox.' : 'Come on in.'}</h2>
      <p className="auth-intro">
       {user ? `Signed in as ${user.email || user.phone}` : otpSent ? `Enter the 6-digit code sent to ${authMethod==='email'?email:'+91 '+phone}.` : 'Sign in or create an account to keep your saved objects close.'}
      </p>

      {user ? (
       <>
        <p className="auth-success">You're signed in as {user.email || user.phone}.</p>
        <Button type="button" variant="secondary" className="w-full" onClick={()=>{setUser(null);toast.success('Signed out')}}>Sign out</Button>
       </>
      ) : !otpSent ? (
       <>
        <div className="auth-methods" role="tablist" aria-label="Choose sign-in method">
         <button type="button" className={authMethod==='email'?'active':''} onClick={()=>setAuthMethod('email')}>Email</button>
         <button type="button" className={authMethod==='phone'?'active':''} onClick={()=>setAuthMethod('phone')}>Phone</button>
        </div>

        <form onSubmit={sendOtp} className="auth-form">
         {authMethod==='email' ? (
          <label>Email address
           <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
          </label>
         ) : (
          <label>Mobile number
           <div className="phone-field"><span>+91</span><input type="tel" required inputMode="numeric" pattern="[0-9]{10}" maxLength="10" value={phone} onChange={e=>setPhone(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number"/></div>
          </label>
         )}
         <Button className="w-full auth-submit" type="submit">Send verification code <ArrowRight size={16}/></Button>
        </form>

        <div className="auth-divider"><span>OR</span></div>
        <Button type="button" variant="secondary" className="w-full google-button" onClick={()=>toast('Google sign-in requires Google OAuth / Firebase configuration.')}>
         <span className="google-mark">G</span> Continue with Google
        </Button>
        <small className="auth-note">A one-time code keeps your account secure. No password needed.</small>
       </>
      ) : (
       <form onSubmit={verifyOtp} className="auth-form">
        <label>6-digit verification code
         <input className="otp-input" inputMode="numeric" autoComplete="one-time-code" maxLength="6" pattern="[0-9]{6}" required value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="••••••"/>
        </label>
        <Button className="w-full auth-submit" type="submit">Verify code <Check size={16}/></Button>
        <button type="button" className="auth-back" onClick={()=>{setOtpSent(false);setOtp('')}}>← Change {authMethod==='email'?'email address':'mobile number'}</button>
        <small className="auth-note">This is the OTP interface preview. Real SMS/email delivery and verification must be connected before launch.</small>
       </form>
      )}
     </div>
    </div>
   </DialogContent>
  </Dialog>

 </div>

}

createRoot(document.getElementById('root')).render(<App/>)
