import { useState, useEffect, useRef } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1493632458221158501/DlMzqxexKQDI2wce6tpzZ1v0_YbWsoLnoJcLPbLdKGdC_w2BXejinlmGTdWdU9k4ZbhH";
const STAFF_PASSWORD = "dzstore2025"; // ← change ça

// ─── DATA ─────────────────────────────────────────────────────────────────
const WILAYAS = ["Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet","El M'Ghair","El Meniaa"];
const SIZES_SHOES = ["38","39","40","41","42","43","44","45","46"];
const SIZES_CLOTHES = ["XS","S","M","L","XL","XXL","3XL"];

const INITIAL_PRODUCTS = [
  { id:1, category:"sneakers", name:"Nike Air Max Plus TN Utility", price:12000, stock:15, sizes:SIZES_SHOES, colors:["Noir/Volt","Blanc/Rouge","Gris/Bleu"], description:"La Nike Air Max Plus TN Utility allie le design iconique des TN à une construction renforcée. Amorti Air Max visible, tige en mesh texturé et finitions premium.", badge:"NEW", rating:4.8, reviews:124 },
  { id:2, category:"sneakers", name:"Jordan 1 Retro High OG", price:15500, stock:8, sizes:SIZES_SHOES, colors:["Chicago","Bred","Royal"], description:"L'indémodable Jordan 1 Retro High OG. Cuir de qualité supérieure, semelle Air et design iconique qui traverse les générations.", badge:"HOT", rating:4.9, reviews:89 },
  { id:3, category:"sneakers", name:"Adidas Ultra Boost 23", price:11000, stock:20, sizes:SIZES_SHOES, colors:["Core Black","Cloud White"], description:"La technologie Boost de nouvelle génération pour un amorti exceptionnel. Tige Primeknit adaptative et semelle Continental.", badge:null, rating:4.6, reviews:67 },
  { id:4, category:"sneakers", name:"New Balance 550", price:9500, stock:12, sizes:SIZES_SHOES, colors:["Blanc/Vert","Blanc/Rouge"], description:"Silhouette rétro revisitée avec une finition moderne. Tige en cuir et mesh, semelle à profil plat signature NB.", badge:"SALE", rating:4.5, reviews:43 },
  { id:5, category:"ensembles", name:"Ensemble Lacoste Sport Dégradé", price:9500, stock:18, sizes:SIZES_CLOTHES, colors:["Bleu/Marine","Noir/Gris","Blanc/Bleu"], description:"Ensemble survêtement Lacoste Sport avec imprimé dégradé exclusif. Veste zippée et pantalon coordonné en tissu technique respirant.", badge:"NEW", rating:4.7, reviews:56 },
  { id:6, category:"ensembles", name:"Ensemble Nike Tech Fleece", price:11500, stock:10, sizes:SIZES_CLOTHES, colors:["Noir","Anthracite","Marine"], description:"Le Tech Fleece de Nike : légèreté et chaleur sans compromis. Tissu innovant double épaisseur, coupe ajustée moderne.", badge:"HOT", rating:4.8, reviews:92 },
  { id:7, category:"ensembles", name:"Ensemble Adidas Originals SST", price:8500, stock:25, sizes:SIZES_CLOTHES, colors:["Noir/Blanc","Marine/Blanc","Gris/Blanc"], description:"L'iconique SST d'Adidas Originals. Les 3 bandes emblématiques sur veste et pantalon, tissu French Terry confortable.", badge:null, rating:4.4, reviews:38 },
  { id:8, category:"tshirts", name:"Nike Dri-FIT Premium", price:4500, stock:30, sizes:SIZES_CLOTHES, colors:["Noir","Blanc","Gris","Marine"], description:"T-shirt technique Nike Dri-FIT avec tissu évacuant l'humidité. Coupe athlétique, col rond renforcé et logo brodé.", badge:null, rating:4.3, reviews:29 },
  { id:9, category:"tshirts", name:"Supreme Box Logo Tee", price:6500, stock:5, sizes:SIZES_CLOTHES, colors:["Blanc","Noir","Rouge"], description:"Le T-shirt Box Logo Supreme, pièce culte du streetwear. 100% coton lourd 280g, coupe relax, impression sérigraphiée.", badge:"LIMITED", rating:4.9, reviews:156 },
  { id:10, category:"tshirts", name:"Off-White Industrial Tee", price:7500, stock:14, sizes:SIZES_CLOTHES, colors:["Blanc","Noir"], description:"T-shirt Off-White avec les détails signature de la marque. Bandes industrielles, imprimés graphiques, coton premium oversized.", badge:"HOT", rating:4.7, reviews:78 },
  { id:11, category:"goodies", name:"Casquette Jordan Jumpman", price:2800, stock:40, sizes:["Unique"], colors:["Noir","Blanc","Rouge"], description:"Casquette ajustable Jordan avec logo Jumpman brodé. Visière courbée, sangle réglable à l'arrière.", badge:null, rating:4.2, reviews:41 },
  { id:12, category:"goodies", name:"Chaussettes Nike Multi-Pack", price:1800, stock:60, sizes:["36-40","41-46"], colors:["Blanc","Noir","Mix"], description:"Pack de 6 paires de chaussettes Nike. Tissu respirant, coussin intégré, logo tissé.", badge:"PROMO", rating:4.1, reviews:67 },
  { id:13, category:"goodies", name:"Sac Nike Heritage", price:3500, stock:22, sizes:["Unique"], colors:["Noir","Gris","Marine"], description:"Sac à dos Nike Heritage 25L. Compartiment principal zippé, poche avant, bretelles rembourrées.", badge:null, rating:4.5, reviews:33 },
  { id:14, category:"goodies", name:"Bonnet Adidas Originals", price:1500, stock:35, sizes:["Unique"], colors:["Noir","Blanc","Marine"], description:"Bonnet tricoté Adidas Originals. Logo 3 bandes rebroché, tissu doux acrylique chaud.", badge:"NEW", rating:4.3, reviews:22 },
];

const INITIAL_PROMOS = [
  { code:"DZSTORE10", discount:10, type:"percent", active:true, uses:0 },
  { code:"BIENVENUE", discount:1000, type:"fixed", active:true, uses:0 },
];

const CATEGORY_MAP = { all:"Tout", sneakers:"Sneakers", ensembles:"Ensembles", tshirts:"T-Shirts", goodies:"Goodies" };

function getPlaceholderBg(cat) {
  return { sneakers:"#0f0f1a", ensembles:"#0a1628", tshirts:"#1a0a28", goodies:"#0a1a0a" }[cat] || "#111";
}
function getEmoji(cat) {
  return { sneakers:"👟", ensembles:"🧥", tshirts:"👕", goodies:"🎒" }[cat] || "📦";
}

// ─── WEBHOOK ──────────────────────────────────────────────────────────────
async function sendToDiscord(order) {
  const itemsText = order.items.map(i =>
    `> **${i.name}** | Taille: ${i.size} | Couleur: ${i.color} | Qté: ${i.qty} | Prix: ${(i.price * i.qty).toLocaleString()} DA`
  ).join("\n");

  const promoText = order.promoCode
    ? `\n🎟️ **Code promo:** \`${order.promoCode}\` (-${order.promoDiscount.toLocaleString()} DA)`
    : "";

  const payload = {
    username: "DZ STORE 🛍️",
    avatar_url: "https://i.imgur.com/4M34hi2.png",
    embeds: [{
      title: `🛒 Nouvelle Commande — #${order.orderId}`,
      color: 0xE53935,
      fields: [
        { name: "👤 Client", value: order.name, inline: true },
        { name: "📞 Téléphone", value: `+213${order.phone.replace(/^0/, "")}`, inline: true },
        { name: "📧 Email", value: order.email || "Non fourni", inline: true },
        { name: "📍 Wilaya", value: order.wilaya, inline: true },
        { name: "🏠 Adresse", value: order.address, inline: false },
        { name: "📦 Articles", value: itemsText || "—", inline: false },
        { name: "💰 Total", value: `**${order.total.toLocaleString()} DA** (après promo)${promoText}`, inline: false },
      ],
      footer: { text: `DZ STORE • ${new Date().toLocaleString("fr-DZ")}` },
      thumbnail: { url: "https://flagcdn.com/dz.svg" }
    }]
  };

  const res = await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok && res.status !== 204) throw new Error("Webhook failed: " + res.status);
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────

function Modal({ children, onClose }) {
  useEffect(() => {
    const h = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(6px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"var(--card-bg)", borderRadius:20, maxWidth:920, width:"100%", maxHeight:"93vh", overflowY:"auto", position:"relative", border:"1px solid var(--border)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:16, right:16, zIndex:10, background:"var(--border)", border:"none", borderRadius:"50%", width:36, height:36, fontSize:18, cursor:"pointer", color:"var(--text)", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        {children}
      </div>
    </div>
  );
}

function Notification({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:2000, background:"var(--accent)", color:"#fff", borderRadius:14, padding:"14px 20px", fontWeight:600, fontSize:14, boxShadow:"0 8px 30px rgba(0,0,0,0.3)", display:"flex", alignItems:"center", gap:10, maxWidth:360, animation:"slideUp 0.3s ease" }}>
      ✅ {msg}
    </div>
  );
}

function ProductCard({ product, onClick, onToggleFav, isFav, onAddCart }) {
  const [hovered, setHovered] = useState(false);
  const outOfStock = product.stock === 0;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:16, overflow:"hidden", cursor: outOfStock ? "not-allowed" : "pointer", transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)", transform: hovered && !outOfStock ? "translateY(-6px)" : "none", boxShadow: hovered && !outOfStock ? "0 20px 40px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)", position:"relative", opacity: outOfStock ? 0.6 : 1 }}>
      {product.badge && !outOfStock && (
        <div style={{ position:"absolute", top:12, left:12, zIndex:3, background: product.badge==="SALE"||product.badge==="PROMO"?"#E53935":product.badge==="LIMITED"?"#6A1B9A":product.badge==="HOT"?"#F4511E":"#1565C0", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:6, letterSpacing:"0.08em" }}>{product.badge}</div>
      )}
      {outOfStock && (
        <div style={{ position:"absolute", top:12, left:12, zIndex:3, background:"#555", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:6 }}>RUPTURE</div>
      )}
      <button onClick={e => { e.stopPropagation(); onToggleFav(product.id); }} style={{ position:"absolute", top:12, right:12, zIndex:3, background:"rgba(0,0,0,0.4)", border:"none", borderRadius:"50%", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:16, backdropFilter:"blur(4px)" }}>
        {isFav ? "❤️" : "🤍"}
      </button>
      <div onClick={() => !outOfStock && onClick(product)} style={{ width:"100%", paddingBottom:"100%", position:"relative", background:getPlaceholderBg(product.category), overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
          <div style={{ fontSize:52, filter:"brightness(0.9)" }}>{getEmoji(product.category)}</div>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase" }}>{product.name.slice(0,18)}</div>
        </div>
      </div>
      <div onClick={() => !outOfStock && onClick(product)} style={{ padding:"14px 16px" }}>
        <div style={{ color:"var(--text-secondary)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>{CATEGORY_MAP[product.category]}</div>
        <div style={{ color:"var(--text)", fontWeight:600, fontSize:14, marginBottom:8, lineHeight:1.3 }}>{product.name}</div>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          <span style={{ color:"#FFB300", fontSize:12 }}>{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5-Math.floor(product.rating))}</span>
          <span style={{ color:"var(--text-secondary)", fontSize:11 }}>({product.reviews})</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ color:"var(--accent)", fontWeight:700, fontSize:17 }}>{product.price.toLocaleString()} DA</div>
          <button disabled={outOfStock} onClick={e => { e.stopPropagation(); if (!outOfStock) onAddCart(product); }} style={{ background: outOfStock ? "#555" : "var(--accent)", color:"#fff", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, cursor: outOfStock ? "not-allowed" : "pointer" }}>
            {outOfStock ? "Épuisé" : "+ Panier"}
          </button>
        </div>
        <div style={{ color:"var(--text-secondary)", fontSize:11, marginTop:6 }}>
          {outOfStock ? "❌ Hors stock" : product.stock <= 5 ? `⚠️ Plus que ${product.stock} en stock` : `✅ En stock (${product.stock})`}
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onOrder, onAddCart, isFav, onToggleFav }) {
  const [selSize, setSelSize] = useState(null);
  const [selColor, setSelColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [rotate, setRotate] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    let angle = 0;
    const spin = () => { angle = (angle + 0.3) % 360; setRotate(angle); rafRef.current = requestAnimationFrame(spin); };
    rafRef.current = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
      <div style={{ background:getPlaceholderBg(product.category), borderRadius:"20px 0 0 20px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, minHeight:480, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.05, background:"radial-gradient(circle at 50% 50%, #fff 0%, transparent 70%)" }}/>
        <div style={{ fontSize:120, transform:`rotateY(${rotate}deg)`, transition:"none", filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}>{getEmoji(product.category)}</div>
        <div style={{ marginTop:24, color:"rgba(255,255,255,0.4)", fontSize:11, letterSpacing:"0.12em" }}>VUE 3D — ROTATION AUTO</div>
      </div>
      <div style={{ padding:36 }}>
        <div style={{ display:"flex", alignItems:"start", justifyContent:"space-between", marginBottom:8 }}>
          <div style={{ color:"var(--text-secondary)", fontSize:12, textTransform:"uppercase", letterSpacing:"0.1em" }}>{CATEGORY_MAP[product.category]}</div>
          <button onClick={() => onToggleFav(product.id)} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer" }}>{isFav ? "❤️" : "🤍"}</button>
        </div>
        <h2 style={{ color:"var(--text)", fontWeight:700, fontSize:22, marginBottom:8, lineHeight:1.2 }}>{product.name}</h2>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <span style={{ color:"#FFB300", fontSize:14 }}>{"★".repeat(Math.floor(product.rating))}</span>
          <span style={{ color:"var(--text)", fontWeight:600 }}>{product.rating}</span>
          <span style={{ color:"var(--text-secondary)", fontSize:13 }}>({product.reviews} avis)</span>
        </div>
        <div style={{ color:"var(--accent)", fontWeight:800, fontSize:28, marginBottom:8 }}>{product.price.toLocaleString()} DA</div>
        <div style={{ color: product.stock===0?"#E53935":product.stock<=5?"#FF9800":"#4CAF50", fontSize:13, fontWeight:600, marginBottom:16 }}>
          {product.stock===0 ? "❌ Rupture de stock" : product.stock<=5 ? `⚠️ Dernières pièces (${product.stock})` : `✅ En stock (${product.stock} dispo)`}
        </div>
        <p style={{ color:"var(--text-secondary)", fontSize:14, lineHeight:1.7, marginBottom:24 }}>{product.description}</p>
        <div style={{ marginBottom:20 }}>
          <div style={{ color:"var(--text)", fontWeight:600, fontSize:13, marginBottom:10 }}>Couleur : <span style={{ fontWeight:400 }}>{selColor}</span></div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {product.colors.map(c => (
              <button key={c} onClick={() => setSelColor(c)} style={{ padding:"6px 14px", borderRadius:20, border: selColor===c?"2px solid var(--accent)":"1px solid var(--border)", background: selColor===c?"var(--accent-light)":"transparent", color: selColor===c?"var(--accent)":"var(--text)", fontSize:12, fontWeight:600, cursor:"pointer" }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:24 }}>
          <div style={{ color:"var(--text)", fontWeight:600, fontSize:13, marginBottom:10 }}>Taille : {!selSize && <span style={{ color:"#E53935", fontWeight:400 }}>*Requis</span>}</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSelSize(s)} style={{ width: product.sizes[0].length>3?64:44, height:44, borderRadius:10, border: selSize===s?"2px solid var(--accent)":"1px solid var(--border)", background: selSize===s?"var(--accent)":"transparent", color: selSize===s?"#fff":"var(--text)", fontSize:13, fontWeight:600, cursor:"pointer" }}>{s}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <span style={{ color:"var(--text)", fontWeight:600, fontSize:13 }}>Quantité :</span>
          <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width:32, height:32, borderRadius:8, border:"1px solid var(--border)", background:"transparent", color:"var(--text)", fontSize:18, cursor:"pointer" }}>-</button>
          <span style={{ fontWeight:700, fontSize:16, minWidth:24, textAlign:"center" }}>{qty}</span>
          <button onClick={() => setQty(q => Math.min(product.stock, q+1))} style={{ width:32, height:32, borderRadius:8, border:"1px solid var(--border)", background:"transparent", color:"var(--text)", fontSize:18, cursor:"pointer" }}>+</button>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={() => { if(!selSize){alert("Veuillez choisir une taille");return;} onAddCart({...product,selSize,selColor,qty}); }} style={{ flex:1, background:"var(--border)", color:"var(--text)", border:"none", borderRadius:12, padding:"14px 0", fontWeight:700, fontSize:15, cursor:"pointer" }}>🛒 Ajouter</button>
          <button disabled={product.stock===0} onClick={() => { if(!selSize){alert("Veuillez choisir une taille");return;} onOrder({...product,selSize,selColor,qty}); }} style={{ flex:2, background: product.stock===0?"#555":"var(--accent)", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontWeight:700, fontSize:15, cursor: product.stock===0?"not-allowed":"pointer" }}>
            {product.stock===0 ? "Épuisé" : "Commander →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Cart({ items, onClose, onRemove, onOrder, onUpdateQty }) {
  const total = items.reduce((s,i) => s+(i.price*(i.qty||1)), 0);
  return (
    <div style={{ padding:28, minWidth:320 }}>
      <h3 style={{ color:"var(--text)", fontWeight:700, marginBottom:20 }}>🛒 Mon Panier ({items.length})</h3>
      {items.length===0 ? (
        <div style={{ color:"var(--text-secondary)", textAlign:"center", padding:40 }}>Votre panier est vide</div>
      ) : (
        <>
          {items.map((item,i) => (
            <div key={i} style={{ display:"flex", gap:12, padding:"12px 0", borderBottom:"1px solid var(--border)", alignItems:"center" }}>
              <div style={{ width:50, height:50, borderRadius:10, background:getPlaceholderBg(item.category), display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{getEmoji(item.category)}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:"var(--text)", fontSize:13, fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</div>
                <div style={{ color:"var(--text-secondary)", fontSize:11 }}>{item.selSize} · {item.selColor}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                  <button onClick={() => onUpdateQty(i,-1)} style={{ width:22, height:22, borderRadius:6, border:"1px solid var(--border)", background:"transparent", color:"var(--text)", cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>-</button>
                  <span style={{ fontSize:13, fontWeight:600 }}>{item.qty||1}</span>
                  <button onClick={() => onUpdateQty(i,1)} style={{ width:22, height:22, borderRadius:6, border:"1px solid var(--border)", background:"transparent", color:"var(--text)", cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                <div style={{ color:"var(--accent)", fontWeight:700, fontSize:13 }}>{(item.price*(item.qty||1)).toLocaleString()} DA</div>
                <button onClick={() => onRemove(i)} style={{ background:"none", border:"none", color:"#E53935", cursor:"pointer", fontSize:16 }}>🗑</button>
              </div>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderTop:"2px solid var(--border)", marginTop:8 }}>
            <span style={{ fontWeight:700, color:"var(--text)" }}>Total</span>
            <span style={{ fontWeight:800, color:"var(--accent)", fontSize:20 }}>{total.toLocaleString()} DA</span>
          </div>
          <button onClick={onOrder} style={{ width:"100%", background:"var(--accent)", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontWeight:700, fontSize:15, cursor:"pointer" }}>
            Commander maintenant →
          </button>
        </>
      )}
    </div>
  );
}

// ─── ORDER MODAL (with promo code + webhook) ──────────────────────────────
function OrderModal({ items, onClose, onSuccess, promos, setPromos }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", address:"", wilaya:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const subtotal = items.reduce((s,i) => s+(i.price*(i.qty||1)), 0);
  const discount = appliedPromo ? (appliedPromo.type==="percent" ? Math.round(subtotal * appliedPromo.discount / 100) : appliedPromo.discount) : 0;
  const total = Math.max(0, subtotal - discount);
  const orderId = "DZ" + Date.now().toString(36).toUpperCase();

  const applyPromo = () => {
    setPromoError(""); setPromoSuccess("");
    const code = promoInput.trim().toUpperCase();
    const found = promos.find(p => p.code === code && p.active);
    if (!found) { setPromoError("Code invalide ou expiré"); return; }
    setAppliedPromo(found);
    setPromoSuccess(found.type==="percent" ? `-${found.discount}% appliqué !` : `-${found.discount.toLocaleString()} DA appliqué !`);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nom requis";
    const phone = form.phone.replace(/\s/g,"");
    if (!/^(05|06|07)\d{8}$/.test(phone) && !/^\+213\d{9}$/.test(phone)) e.phone = "Format invalide (ex: 0612345678 ou +213612345678)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.address.trim()) e.address = "Adresse requise";
    if (!form.wilaya) e.wilaya = "Wilaya requise";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const order = {
        orderId,
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        wilaya: form.wilaya,
        items: items.map(i => ({ name:i.name, size:i.selSize, color:i.selColor, qty:i.qty||1, price:i.price })),
        subtotal,
        promoCode: appliedPromo?.code || null,
        promoDiscount: discount,
        total,
        date: new Date().toLocaleString("fr-DZ")
      };
      await sendToDiscord(order);
      // Update promo uses
      if (appliedPromo) {
        setPromos(prev => prev.map(p => p.code===appliedPromo.code ? {...p, uses: p.uses+1} : p));
      }
      setLoading(false);
      onSuccess(orderId);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
  };

  const F = ({ label, name, type="text", placeholder, as }) => (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", color:"var(--text)", fontWeight:600, fontSize:13, marginBottom:6 }}>{label}</label>
      {as==="select" ? (
        <select value={form[name]} onChange={e => setForm(f => ({...f,[name]:e.target.value}))} style={{ width:"100%", padding:"10px 14px", borderRadius:10, border: errors[name]?"1px solid #E53935":"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:14 }}>
          <option value="">-- Choisir --</option>
          {WILAYAS.map((w,i) => <option key={w} value={w}>{String(i+1).padStart(2,"0")} - {w}</option>)}
        </select>
      ) : (
        <input type={type} value={form[name]} onChange={e => setForm(f => ({...f,[name]:e.target.value}))} placeholder={placeholder} style={{ width:"100%", padding:"10px 14px", borderRadius:10, border: errors[name]?"1px solid #E53935":"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:14, boxSizing:"border-box" }}/>
      )}
      {errors[name] && <div style={{ color:"#E53935", fontSize:12, marginTop:4 }}>⚠ {errors[name]}</div>}
    </div>
  );

  return (
    <div style={{ padding:36 }}>
      <h2 style={{ color:"var(--text)", fontWeight:700, fontSize:22, marginBottom:6 }}>Finaliser la commande</h2>
      <div style={{ color:"var(--text-secondary)", fontSize:13, marginBottom:28 }}>Commande #{orderId} — Paiement à la livraison</div>

      {/* Récap */}
      <div style={{ background:"var(--bg)", borderRadius:12, padding:16, marginBottom:24, border:"1px solid var(--border)" }}>
        <div style={{ color:"var(--text)", fontWeight:600, fontSize:14, marginBottom:12 }}>📦 Récapitulatif</div>
        {items.map((item,i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom: i<items.length-1?"1px solid var(--border)":"none" }}>
            <div>
              <div style={{ color:"var(--text)", fontSize:13, fontWeight:500 }}>{item.name}</div>
              <div style={{ color:"var(--text-secondary)", fontSize:12 }}>Taille: {item.selSize} · Couleur: {item.selColor} · Qté: {item.qty||1}</div>
            </div>
            <div style={{ color:"var(--accent)", fontWeight:700 }}>{(item.price*(item.qty||1)).toLocaleString()} DA</div>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, paddingTop:10, borderTop:"1px dashed var(--border)" }}>
          <span style={{ color:"var(--text-secondary)" }}>Sous-total</span>
          <span style={{ color:"var(--text)" }}>{subtotal.toLocaleString()} DA</span>
        </div>
        {discount > 0 && (
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
            <span style={{ color:"#4CAF50" }}>🎟️ Réduction ({appliedPromo.code})</span>
            <span style={{ color:"#4CAF50", fontWeight:700 }}>-{discount.toLocaleString()} DA</span>
          </div>
        )}
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:10, paddingTop:10, borderTop:"2px solid var(--border)" }}>
          <span style={{ fontWeight:700, color:"var(--text)" }}>Total à payer</span>
          <span style={{ color:"var(--accent)", fontWeight:800, fontSize:18 }}>{total.toLocaleString()} DA</span>
        </div>
        <div style={{ color:"var(--text-secondary)", fontSize:12, marginTop:8, background:"rgba(255,193,7,0.1)", padding:"8px 12px", borderRadius:8, border:"1px solid rgba(255,193,7,0.3)" }}>
          🚚 Livraison incluse · Paiement à la réception
        </div>
      </div>

      {/* Code promo */}
      <div style={{ marginBottom:24 }}>
        <div style={{ color:"var(--text)", fontWeight:600, fontSize:13, marginBottom:8 }}>🎟️ Code promo</div>
        <div style={{ display:"flex", gap:8 }}>
          <input
            value={promoInput}
            onChange={e => setPromoInput(e.target.value.toUpperCase())}
            placeholder="Ex: DZSTORE10"
            disabled={!!appliedPromo}
            style={{ flex:1, padding:"10px 14px", borderRadius:10, border: promoError?"1px solid #E53935":"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:14 }}
          />
          {!appliedPromo ? (
            <button onClick={applyPromo} style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:10, padding:"0 20px", fontWeight:700, cursor:"pointer", fontSize:14 }}>Appliquer</button>
          ) : (
            <button onClick={() => { setAppliedPromo(null); setPromoInput(""); setPromoSuccess(""); }} style={{ background:"#555", color:"#fff", border:"none", borderRadius:10, padding:"0 16px", fontWeight:700, cursor:"pointer", fontSize:13 }}>Retirer</button>
          )}
        </div>
        {promoError && <div style={{ color:"#E53935", fontSize:12, marginTop:6 }}>⚠ {promoError}</div>}
        {promoSuccess && <div style={{ color:"#4CAF50", fontSize:12, marginTop:6 }}>✅ {promoSuccess}</div>}
      </div>

      {/* Formulaire */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 20px" }}>
        <div style={{ gridColumn:"1/-1" }}><F label="Nom complet" name="name" placeholder="Votre nom et prénom"/></div>
        <F label="Téléphone (+213)" name="phone" placeholder="0612345678"/>
        <F label="Email" name="email" type="email" placeholder="email@exemple.com"/>
        <div><F label="Wilaya" name="wilaya" as="select"/></div>
        <div style={{ gridColumn:"1/-1" }}><F label="Adresse complète" name="address" placeholder="Rue, cité, numéro..."/></div>
      </div>

      <button onClick={submit} disabled={loading} style={{ width:"100%", background: loading?"var(--border)":"var(--accent)", color:"#fff", border:"none", borderRadius:12, padding:"16px 0", fontWeight:700, fontSize:16, cursor: loading?"not-allowed":"pointer", marginTop:8, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
        {loading ? "⏳ Envoi en cours..." : "✅ Confirmer la commande"}
      </button>
    </div>
  );
}

// ─── STAFF PANEL ──────────────────────────────────────────────────────────
function StaffPanel({ products, setProducts, promos, setPromos, onClose }) {
  const [tab, setTab] = useState("products");
  const [newPromo, setNewPromo] = useState({ code:"", discount:"", type:"percent" });
  const [promoMsg, setPromoMsg] = useState("");

  const updateProduct = (id, field, value) => {
    setProducts(prev => prev.map(p => p.id===id ? {...p, [field]: field==="price"||field==="stock" ? Number(value) : value} : p));
  };

  const addPromo = () => {
    if (!newPromo.code.trim() || !newPromo.discount) { setPromoMsg("Remplis tous les champs"); return; }
    const code = newPromo.code.trim().toUpperCase();
    if (promos.find(p => p.code===code)) { setPromoMsg("Ce code existe déjà"); return; }
    setPromos(prev => [...prev, { code, discount:Number(newPromo.discount), type:newPromo.type, active:true, uses:0 }]);
    setNewPromo({ code:"", discount:"", type:"percent" });
    setPromoMsg("✅ Code ajouté !");
    setTimeout(() => setPromoMsg(""), 3000);
  };

  const togglePromo = code => setPromos(prev => prev.map(p => p.code===code ? {...p, active:!p.active} : p));
  const deletePromo = code => setPromos(prev => prev.filter(p => p.code!==code));

  return (
    <div style={{ padding:28, minWidth:320 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
        <h2 style={{ color:"var(--text)", fontWeight:800, fontSize:22 }}>🔧 Panel Staff</h2>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:24 }}>
        {["products","promos"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"8px 20px", borderRadius:20, border:"none", background: tab===t?"var(--accent)":"var(--border)", color: tab===t?"#fff":"var(--text)", fontWeight:600, cursor:"pointer", fontSize:13 }}>
            {t==="products" ? "📦 Produits" : "🎟️ Codes Promo"}
          </button>
        ))}
      </div>

      {tab==="products" && (
        <div>
          <div style={{ color:"var(--text-secondary)", fontSize:12, marginBottom:16 }}>Modifie les prix et stocks directement ici.</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {products.map(p => (
              <div key={p.id} style={{ background:"var(--bg)", borderRadius:12, padding:"12px 16px", border:"1px solid var(--border)", display:"grid", gridTemplateColumns:"1fr auto auto", gap:12, alignItems:"center" }}>
                <div>
                  <div style={{ color:"var(--text)", fontWeight:600, fontSize:13 }}>{getEmoji(p.category)} {p.name}</div>
                  <div style={{ color:"var(--text-secondary)", fontSize:11 }}>{CATEGORY_MAP[p.category]}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <label style={{ color:"var(--text-secondary)", fontSize:11 }}>Prix (DA):</label>
                    <input type="number" value={p.price} onChange={e => updateProduct(p.id,"price",e.target.value)} style={{ width:90, padding:"4px 8px", borderRadius:8, border:"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:13, textAlign:"right" }}/>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <label style={{ color:"var(--text-secondary)", fontSize:11 }}>Stock:</label>
                    <input type="number" value={p.stock} onChange={e => updateProduct(p.id,"stock",e.target.value)} style={{ width:70, padding:"4px 8px", borderRadius:8, border:"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:13, textAlign:"right" }}/>
                  </div>
                </div>
                <div style={{ width:10, height:10, borderRadius:"50%", background: p.stock===0?"#E53935":p.stock<=5?"#FF9800":"#4CAF50" }}/>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="promos" && (
        <div>
          {/* Add new */}
          <div style={{ background:"var(--bg)", borderRadius:12, padding:16, marginBottom:20, border:"1px solid var(--border)" }}>
            <div style={{ color:"var(--text)", fontWeight:600, marginBottom:12 }}>➕ Nouveau code promo</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:10 }}>
              <input value={newPromo.code} onChange={e => setNewPromo(p => ({...p, code:e.target.value.toUpperCase()}))} placeholder="CODE" style={{ padding:"8px 12px", borderRadius:8, border:"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:13 }}/>
              <input type="number" value={newPromo.discount} onChange={e => setNewPromo(p => ({...p, discount:e.target.value}))} placeholder="Valeur" style={{ padding:"8px 12px", borderRadius:8, border:"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:13 }}/>
              <select value={newPromo.type} onChange={e => setNewPromo(p => ({...p, type:e.target.value}))} style={{ padding:"8px 12px", borderRadius:8, border:"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:13 }}>
                <option value="percent">% Pourcentage</option>
                <option value="fixed">DA Fixe</option>
              </select>
            </div>
            <button onClick={addPromo} style={{ width:"100%", background:"var(--accent)", color:"#fff", border:"none", borderRadius:8, padding:"10px 0", fontWeight:700, cursor:"pointer" }}>Créer le code</button>
            {promoMsg && <div style={{ color: promoMsg.startsWith("✅")?"#4CAF50":"#E53935", fontSize:12, marginTop:8 }}>{promoMsg}</div>}
          </div>
          {/* List */}
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {promos.map(p => (
              <div key={p.code} style={{ background:"var(--bg)", borderRadius:10, padding:"12px 16px", border:"1px solid var(--border)", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ flex:1 }}>
                  <span style={{ color:"var(--text)", fontWeight:700, fontFamily:"monospace", fontSize:14 }}>{p.code}</span>
                  <span style={{ color:"var(--text-secondary)", fontSize:12, marginLeft:10 }}>
                    {p.type==="percent" ? `-${p.discount}%` : `-${p.discount.toLocaleString()} DA`} · {p.uses} utilisation{p.uses!==1?"s":""}
                  </span>
                </div>
                <button onClick={() => togglePromo(p.code)} style={{ padding:"4px 12px", borderRadius:20, border:"none", background: p.active?"#4CAF5022":"#E5393522", color: p.active?"#4CAF50":"#E53935", fontWeight:600, cursor:"pointer", fontSize:12 }}>
                  {p.active ? "Actif" : "Inactif"}
                </button>
                <button onClick={() => deletePromo(p.code)} style={{ background:"none", border:"none", color:"#E53935", cursor:"pointer", fontSize:16 }}>🗑</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STAFF LOGIN ──────────────────────────────────────────────────────────
function StaffLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  return (
    <div style={{ padding:40, textAlign:"center" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
      <h3 style={{ color:"var(--text)", fontWeight:700, marginBottom:8 }}>Accès Staff</h3>
      <p style={{ color:"var(--text-secondary)", fontSize:13, marginBottom:24 }}>Entrez le mot de passe staff pour continuer</p>
      <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }} placeholder="Mot de passe..." onKeyDown={e => e.key==="Enter" && (pw===STAFF_PASSWORD ? onLogin() : setErr("Mot de passe incorrect"))} style={{ width:"100%", padding:"12px 16px", borderRadius:10, border: err?"1px solid #E53935":"1px solid var(--border)", background:"var(--card-bg)", color:"var(--text)", fontSize:15, marginBottom:12, boxSizing:"border-box" }}/>
      {err && <div style={{ color:"#E53935", fontSize:13, marginBottom:12 }}>⚠ {err}</div>}
      <button onClick={() => pw===STAFF_PASSWORD ? onLogin() : setErr("Mot de passe incorrect")} style={{ width:"100%", background:"var(--accent)", color:"#fff", border:"none", borderRadius:10, padding:"12px 0", fontWeight:700, fontSize:15, cursor:"pointer" }}>Entrer</button>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [promos, setPromos] = useState(INITIAL_PROMOS);
  const [selProduct, setSelProduct] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showFavs, setShowFavs] = useState(false);
  const [showSuccess, setShowSuccess] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showStaff, setShowStaff] = useState(false);
  const [staffAuth, setStaffAuth] = useState(false);

  const notify = msg => setNotification(msg);

  const filtered = products.filter(p => {
    if (cat!=="all" && p.category!==cat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (sizeFilter && !p.sizes.includes(sizeFilter)) return false;
    return true;
  }).sort((a,b) => {
    if (sortBy==="price-asc") return a.price-b.price;
    if (sortBy==="price-desc") return b.price-a.price;
    if (sortBy==="rating") return b.rating-a.rating;
    return 0;
  });

  const toggleFav = id => {
    setFavs(f => f.includes(id) ? f.filter(x => x!==id) : [...f, id]);
    notify(favs.includes(id) ? "Retiré des favoris" : "Ajouté aux favoris ❤️");
  };

  const addToCart = product => {
    setCart(c => {
      const ex = c.findIndex(i => i.id===product.id && i.selSize===product.selSize && i.selColor===product.selColor);
      if (ex>=0) { const n=[...c]; n[ex]={...n[ex],qty:(n[ex].qty||1)+(product.qty||1)}; return n; }
      return [...c, {...product, qty:product.qty||1}];
    });
    notify(`${product.name} ajouté au panier 🛒`);
  };

  const updateCartQty = (idx, delta) => {
    setCart(c => { const n=[...c]; const nq=(n[idx].qty||1)+delta; if(nq<=0){n.splice(idx,1);}else{n[idx]={...n[idx],qty:nq};} return n; });
  };

  const cssVars = dark ? {
    "--bg":"#0d0d0d","--card-bg":"#161616","--text":"#f0f0f0","--text-secondary":"#888","--border":"#2a2a2a","--accent":"#E53935","--accent-light":"rgba(229,57,53,0.15)","--header-bg":"rgba(13,13,13,0.95)"
  } : {
    "--bg":"#f5f5f5","--card-bg":"#ffffff","--text":"#111","--text-secondary":"#666","--border":"#e0e0e0","--accent":"#E53935","--accent-light":"rgba(229,57,53,0.1)","--header-bg":"rgba(245,245,245,0.97)"
  };

  return (
    <div style={{ ...cssVars, background:"var(--bg)", color:"var(--text)", minHeight:"100vh", fontFamily:"'Inter',system-ui,sans-serif", transition:"background 0.3s,color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }
        input,select { outline:none; } button:focus { outline:none; }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:none;opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* HEADER */}
      <header style={{ position:"sticky", top:0, zIndex:100, background:"var(--header-bg)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)", padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div style={{ fontWeight:900, fontSize:20, letterSpacing:"-0.03em" }}>
            <span style={{ color:"var(--accent)" }}>DZ</span>STORE
          </div>
          <nav style={{ display:"flex", gap:4 }}>
            {Object.entries(CATEGORY_MAP).map(([k,v]) => (
              <button key={k} onClick={() => setCat(k)} style={{ padding:"6px 14px", borderRadius:20, border:"none", background: cat===k?"var(--accent)":"transparent", color: cat===k?"#fff":"var(--text-secondary)", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}>{v}</button>
            ))}
          </nav>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
            <span style={{ position:"absolute", left:10, color:"var(--text-secondary)", fontSize:14 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..." style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:20, padding:"7px 14px 7px 32px", color:"var(--text)", fontSize:13, width:200 }}/>
          </div>
          <button onClick={() => { setShowFavs(true); setShowCart(false); }} style={{ position:"relative", background:"transparent", border:"none", cursor:"pointer", fontSize:20, padding:6 }}>
            ❤️{favs.length>0&&<span style={{ position:"absolute", top:0, right:0, background:"var(--accent)", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{favs.length}</span>}
          </button>
          <button onClick={() => { setShowCart(true); setShowFavs(false); }} style={{ position:"relative", background:"transparent", border:"none", cursor:"pointer", fontSize:20, padding:6 }}>
            🛒{cart.length>0&&<span style={{ position:"absolute", top:0, right:0, background:"var(--accent)", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>{cart.length}</span>}
          </button>
          <button onClick={() => setDark(d => !d)} style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:20, padding:"6px 12px", cursor:"pointer", fontSize:14, color:"var(--text)" }}>
            {dark?"☀️ Clair":"🌙 Sombre"}
          </button>
          {/* Staff button — discreet */}
          <button onClick={() => setShowStaff(true)} title="Staff" style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:12, color:"var(--text-secondary)" }}>⚙️</button>
        </div>
      </header>

      {/* HERO */}
      {cat==="all" && !search && (
        <div style={{ background:"linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 50%, #1a0a0a 100%)", padding:"70px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, opacity:0.15, background:"radial-gradient(circle at 30% 50%, #E53935 0%, transparent 50%), radial-gradient(circle at 70% 50%, #1565C0 0%, transparent 50%)" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:16 }}>Streetwear Algérien</div>
            <h1 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(36px,6vw,72px)", letterSpacing:"-0.03em", marginBottom:16, lineHeight:1 }}>
              Nouvelle<br/><span style={{ color:"var(--accent)" }}>Collection 2025</span>
            </h1>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, maxWidth:480, margin:"0 auto 32px" }}>Sneakers, ensembles et accessoires premium. Livraison dans toute l'Algérie.</p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => setCat("sneakers")} style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:12, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer" }}>Voir les Sneakers</button>
              <button onClick={() => setCat("ensembles")} style={{ background:"rgba(255,255,255,0.1)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", borderRadius:12, padding:"14px 28px", fontWeight:700, fontSize:15, cursor:"pointer", backdropFilter:"blur(10px)" }}>Ensembles</button>
            </div>
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div style={{ padding:"20px 24px", display:"flex", gap:12, alignItems:"center", flexWrap:"wrap", borderBottom:"1px solid var(--border)" }}>
        <div style={{ color:"var(--text-secondary)", fontSize:13 }}>{filtered.length} produit{filtered.length!==1?"s":""}</div>
        <div style={{ flex:1 }}/>
        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)} style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 12px", color:"var(--text)", fontSize:13 }}>
          <option value="">Toutes tailles</option>
          {[...SIZES_SHOES,...SIZES_CLOTHES].filter((v,i,a) => a.indexOf(v)===i).map(s => <option key={s}>{s}</option>)}
        </select>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color:"var(--text-secondary)", fontSize:13 }}>Prix max:</span>
          <input type="range" min={0} max={20000} step={500} value={priceRange[1]} onChange={e => setPriceRange([0,+e.target.value])} style={{ width:100 }}/>
          <span style={{ color:"var(--text)", fontSize:13, minWidth:72, fontWeight:600 }}>{priceRange[1].toLocaleString()} DA</span>
        </div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 12px", color:"var(--text)", fontSize:13 }}>
          <option value="default">Trier par</option>
          <option value="price-asc">Prix ↑</option>
          <option value="price-desc">Prix ↓</option>
          <option value="rating">Mieux notés</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div style={{ padding:"28px 24px" }}>
        {filtered.length===0 ? (
          <div style={{ textAlign:"center", padding:80, color:"var(--text-secondary)" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <div style={{ fontSize:18, fontWeight:600, marginBottom:8 }}>Aucun produit trouvé</div>
            <div style={{ fontSize:14 }}>Essayez d'autres filtres</div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onClick={setSelProduct} onToggleFav={toggleFav} isFav={favs.includes(p.id)} onAddCart={item => addToCart({...item, selSize:item.sizes[0], selColor:item.colors[0], qty:1})}/>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid var(--border)", padding:"40px 24px", textAlign:"center" }}>
        <div style={{ fontWeight:900, fontSize:24, marginBottom:8 }}><span style={{ color:"var(--accent)" }}>DZ</span>STORE</div>
        <div style={{ color:"var(--text-secondary)", fontSize:13, marginBottom:16 }}>Streetwear premium · Livraison partout en Algérie · Paiement à la livraison</div>
        <div style={{ display:"flex", justifyContent:"center", gap:20, color:"var(--text-secondary)", fontSize:13 }}>
          <span>📞 0558 XXX XXX</span>
          <span>📍 Algérie</span>
          <span>🚚 Livraison sous 48h</span>
        </div>
      </footer>

      {/* ─── MODALS ─── */}
      {selProduct && (
        <Modal onClose={() => setSelProduct(null)}>
          <ProductModal product={selProduct} onClose={() => setSelProduct(null)} isFav={favs.includes(selProduct.id)} onToggleFav={toggleFav}
            onAddCart={item => { addToCart(item); setSelProduct(null); }}
            onOrder={item => { setOrderItems([item]); setSelProduct(null); }}
          />
        </Modal>
      )}

      {showCart && (
        <Modal onClose={() => setShowCart(false)}>
          <Cart items={cart} onClose={() => setShowCart(false)} onRemove={i => setCart(c => c.filter((_,idx) => idx!==i))} onUpdateQty={updateCartQty}
            onOrder={() => { setOrderItems(cart); setShowCart(false); }}
          />
        </Modal>
      )}

      {showFavs && (
        <Modal onClose={() => setShowFavs(false)}>
          <div style={{ padding:28 }}>
            <h3 style={{ color:"var(--text)", fontWeight:700, marginBottom:20 }}>❤️ Mes Favoris ({favs.length})</h3>
            {favs.length===0 ? (
              <div style={{ color:"var(--text-secondary)", textAlign:"center", padding:40 }}>Aucun favori pour l'instant</div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 }}>
                {products.filter(p => favs.includes(p.id)).map(p => (
                  <ProductCard key={p.id} product={p} onClick={p => { setSelProduct(p); setShowFavs(false); }} onToggleFav={toggleFav} isFav={true} onAddCart={item => addToCart({...item, selSize:item.sizes[0], selColor:item.colors[0], qty:1})}/>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}

      {orderItems && !showSuccess && (
        <Modal onClose={() => setOrderItems(null)}>
          <OrderModal items={orderItems} onClose={() => setOrderItems(null)} promos={promos} setPromos={setPromos}
            onSuccess={id => { setOrderItems(null); setShowSuccess(id); setCart([]); }}
          />
        </Modal>
      )}

      {showSuccess && (
        <Modal onClose={() => setShowSuccess(null)}>
          <div style={{ padding:48, textAlign:"center" }}>
            <div style={{ fontSize:64, marginBottom:20 }}>✅</div>
            <h2 style={{ color:"var(--text)", fontWeight:800, fontSize:26, marginBottom:12 }}>Commande confirmée !</h2>
            <div style={{ color:"var(--accent)", fontWeight:700, fontSize:18, marginBottom:16 }}>#{showSuccess}</div>
            <p style={{ color:"var(--text-secondary)", fontSize:15, maxWidth:400, margin:"0 auto 28px" }}>Votre commande a bien été enregistrée. Notre équipe vous contactera dans les plus brefs délais pour confirmer la livraison.</p>
            <div style={{ background:"var(--bg)", borderRadius:12, padding:"14px 24px", marginBottom:28, display:"inline-block" }}>
              <div style={{ color:"var(--text-secondary)", fontSize:12, marginBottom:4 }}>Paiement</div>
              <div style={{ color:"var(--text)", fontWeight:600 }}>💵 À la livraison</div>
            </div>
            <br/>
            <button onClick={() => setShowSuccess(null)} style={{ background:"var(--accent)", color:"#fff", border:"none", borderRadius:12, padding:"12px 32px", fontWeight:700, fontSize:15, cursor:"pointer" }}>Continuer les achats</button>
          </div>
        </Modal>
      )}

      {showStaff && (
        <Modal onClose={() => { setShowStaff(false); setStaffAuth(false); }}>
          {!staffAuth ? (
            <StaffLogin onLogin={() => setStaffAuth(true)}/>
          ) : (
            <StaffPanel products={products} setProducts={setProducts} promos={promos} setPromos={setPromos} onClose={() => { setShowStaff(false); setStaffAuth(false); }}/>
          )}
        </Modal>
      )}

      {notification && <Notification msg={notification} onDone={() => setNotification(null)}/>}
    </div>
  );
}
