/* =========================================================================
   MODERN TRADE — Stores & operating companies, plus interactive
   match-the-following cards placed between the MCQs.
   Loads after mt.data.js. Source for the store list:
   Modern_Trade_Stores_and_Operating_Companies.docx (17 stores).
   Match cards use the engine's Q.match shape: [[left, right], …].
   ========================================================================= */

const OWNERS=[
 ['DMart','Avenue Supermarts Ltd.'],
 ['Reliance Smart Bazaar','Reliance Retail Ltd. – Reliance Industries'],
 ['Le Marche','DS Group (Dharampal Satyapal Group)'],
 ['Lifestyle','Lifestyle International Pvt. Ltd. – Landmark Group'],
 ['Croma','Infiniti Retail Ltd. – Tata Group'],
 ['More Supermarket','More Retail Pvt. Ltd.'],
 ['SPAR Hypermarket','Max Hypermarkets India Pvt. Ltd. – Landmark Group'],
 ['Vishal Mega Mart','Vishal Mega Mart Ltd.'],
 ['Garg Dastak','Garg family-owned retail business'],
 ['Modern Bazaar','Modern Bazaar Departmental Stores Pvt. Ltd.'],
 ['Nature’s Basket','Nature’s Basket Ltd. – Spencer’s Retail / RP-Sanjiv Goenka Group'],
 ['Pantaloons','Aditya Birla Fashion and Retail Ltd.'],
 ['Big Bazaar','Future Retail Ltd. (historical; format discontinued)'],
 ['Shoppers Stop','Shoppers Stop Ltd.'],
 ['Spencer’s','Spencer’s Retail Ltd. – RP-Sanjiv Goenka Group'],
 ['Reliance Fresh','Reliance Retail Ltd.'],
 ['Star Bazaar','Trent Hypermarket Pvt. Ltd. – Trent (Tata Group) and Tesco JV']
];
const own=names=>names.map(n=>{const o=OWNERS.find(x=>x[0]===n);if(!o)throw new Error('unknown store '+n);return o;});

TOPICS.splice(TOPICS.findIndex(t=>t.id==='formats')+1,0,
 {id:'owners', name:'Stores & Owners', kick:'match each MT store to its operating company'});

/* insert a question straight after the one whose stem contains `stem` */
function insertAfter(stem,q){
  const i=QUIZ.findIndex(x=>x.q.indexOf(stem)>=0);
  if(i<0)throw new Error('insertAfter: no question with '+stem);
  QUIZ.splice(i+1,0,q);
}

/* ---------------- Stores & Owners: match cards between MCQs ---------------- */
QUIZ.push(
 {t:'owners',tag:'concept',diff:'medium',cols:['Store','Operating company'],
  q:'<b>Set 1.</b> Match each store to the company that runs it.',
  match:own(['DMart','Croma','Le Marche','Pantaloons','SPAR Hypermarket','Lifestyle']),
  why:'The banner rarely matches the company: DMart is <b>Avenue Supermarts</b>, Croma is <b>Infiniti Retail</b> (Tata). SPAR and Lifestyle are both Landmark, but through different companies — SPAR runs via <b>Max Hypermarkets India</b>.'},

 {t:'owners',tag:'concept',diff:'medium',
  q:'Which pair of stores is run by the <b>Landmark Group</b>?',
  opts:['Lifestyle and SPAR Hypermarket',
        'Lifestyle and Shoppers Stop',
        'SPAR Hypermarket and Star Bazaar',
        'Pantaloons and Lifestyle'],
  why:'<b>Landmark runs Lifestyle (Lifestyle International Pvt. Ltd.) and SPAR Hypermarket (Max Hypermarkets India Pvt. Ltd.).</b><div class="work">Landmark → Lifestyle · SPAR Hypermarket\nTata     → Croma · Star Bazaar\nReliance → Smart Bazaar · Reliance Fresh\nRPSG     → Spencer’s · Nature’s Basket</div>Shoppers Stop is its own listed company; Pantaloons is Aditya Birla; Star Bazaar is Trent (Tata).<br><br>Four groups run two banners each — learn them as pairs.'},

 {t:'owners',tag:'concept',diff:'medium',
  q:'Which two stores sit under the <b>Tata Group</b>?',
  opts:['Croma and Star Bazaar',
        'Croma and Shoppers Stop',
        'Star Bazaar and SPAR Hypermarket',
        'Croma and More Supermarket'],
  why:'<b>Tata runs Croma through Infiniti Retail Ltd. and Star Bazaar through Trent Hypermarket Pvt. Ltd.</b> (a Trent–Tesco joint venture).<div class="work">Croma       → Infiniti Retail Ltd. → Tata Group\nStar Bazaar → Trent Hypermarket Pvt. Ltd. → Trent (Tata) + Tesco JV</div>SPAR is Landmark; More is More Retail; Shoppers Stop is its own company.<br><br>An electronics specialist and a hypermarket — one group, two very different formats.'},

 {t:'owners',tag:'concept',diff:'medium',cols:['Store','Operating company'],
  q:'<b>Set 2.</b> Match each store to the company that runs it.',
  match:own(['Star Bazaar','More Supermarket','Nature’s Basket','Spencer’s','Reliance Fresh','Shoppers Stop']),
  why:'Nature’s Basket sits under <b>Spencer’s Retail</b>, which sits under the <b>RP-Sanjiv Goenka Group</b> — two RPSG companies in one set. Star Bazaar is <b>Trent Hypermarket</b> (Tata, with Tesco), and Reliance Fresh runs through <b>Reliance Retail</b>.'},

 {t:'owners',tag:'concept',diff:'medium',trap:true,
  q:'Nature’s Basket and Spencer’s share which parent group?',
  opts:['RP-Sanjiv Goenka Group',
        'Reliance Industries Group',
        'Aditya Birla Group',
        'Tata Group of companies'],
  why:'<b>Both sit under the RP-Sanjiv Goenka Group</b>: Spencer’s Retail Ltd. runs Spencer’s, and Nature’s Basket Ltd. sits under Spencer’s Retail.<div class="work">RPSG → Spencer’s Retail Ltd. → Spencer’s\n                             → Nature’s Basket Ltd. → Nature’s Basket</div>The trap is Reliance: “Retail” in both names, and Reliance owns many grocery banners — but not these two.<br><br>Mass supermarket and premium gourmet store under one group: a portfolio play across shopper segments.'},

 {t:'owners',tag:'concept',diff:'easy',
  q:'Which store in the list is a <b>historical</b> chain whose former format has been discontinued?',
  opts:['Big Bazaar',
        'Star Bazaar',
        'Smart Bazaar',
        'Modern Bazaar'],
  why:'<b>Big Bazaar (Future Retail Ltd.) is included for reference only — its former store format has been discontinued.</b><div class="work">Big Bazaar    → Future Retail (historical)\nStar Bazaar   → Trent Hypermarket (Tata)\nSmart Bazaar  → Reliance Retail\nModern Bazaar → Modern Bazaar Departmental Stores</div>Four “Bazaars”, four different owners — a favourite for match-the-following.<br><br>Ownership can change: verify current details before quoting any of them as formal fact.'},

 {t:'owners',tag:'concept',diff:'medium',cols:['Store','Operating company'],
  q:'<b>Set 3.</b> Match each store to the company that runs it.',
  match:own(['Reliance Smart Bazaar','Vishal Mega Mart','Garg Dastak','Modern Bazaar','Big Bazaar']),
  why:'Three of these are standalone or family-run: <b>Vishal Mega Mart Ltd.</b>, the <b>Garg family</b> business and <b>Modern Bazaar Departmental Stores</b>. Smart Bazaar runs through <b>Reliance Retail</b>; Big Bazaar (Future Retail) is historical.'},

 {t:'owners',tag:'concept',diff:'medium',
  q:'Which store on the list is run by a <b>family-owned</b> retail business rather than a corporate group or listed chain?',
  opts:['Garg Dastak',
        'Vishal Mega Mart',
        'DMart',
        'More Supermarket'],
  why:'<b>Garg Dastak is a Garg family-owned retail business.</b><div class="work">Garg Dastak      → family-owned\nVishal Mega Mart → Vishal Mega Mart Ltd.\nDMart            → Avenue Supermarts Ltd.\nMore             → More Retail Pvt. Ltd.</div>In retailer-construct terms, a family-run chain usually means owner-led buying: quick decisions and direct negotiation.<br><br>Ownership shapes how an FMCG company sells in — owner, central buyer or category team.'},

 {t:'owners',tag:'concept',diff:'hard',cols:['Store','Parent group'],
  q:'<b>Set 4 — one level up.</b> Match each store to its <b>parent group</b>, not the operating company.',
  match:[['Reliance Smart Bazaar','Reliance Industries'],['Croma','Tata Group'],['SPAR Hypermarket','Landmark Group'],
         ['Nature’s Basket','RP-Sanjiv Goenka Group'],['Pantaloons','Aditya Birla Group'],['Le Marche','DS Group (Dharampal Satyapal)']],
  why:'Store → operating company → group is a three-level chain. Smart Bazaar → Reliance Retail → <b>Reliance Industries</b>; Croma → Infiniti Retail → <b>Tata</b>; SPAR → Max Hypermarkets → <b>Landmark</b>; Nature’s Basket → Spencer’s → <b>RPSG</b>.'}
);

/* ---------------- match cards in other sections ---------------- */
insertAfter('guided along one defined path',
 {t:'shopper',tag:'concept',diff:'medium',cols:['Layout','Best suited for'],
  q:'Match each store layout to the format it suits best.',
  match:[['Grid','Grocery, pharmacy and convenience stores'],['Loop / racetrack','Fashion, department and lifestyle stores'],
         ['Free-flow','Boutique, luxury and specialty stores'],['Spine','Large-format electronics and home improvement'],
         ['Hybrid','Hypermarkets with several shopping missions']],
  why:'Grid for efficiency and density; loop for a guided path past every category; free-flow for open, organic browsing; spine for one main aisle with departments off it; hybrid when one store has several missions.'});

insertAfter('Lulu Hypermarket runs',
 {t:'formats',tag:'concept',diff:'medium',cols:['Type of MT chain','Example'],
  q:'Match each type of modern trade chain to an example of it.',
  match:[['National / large hypermarket chain','DMart, Reliance Smart Bazaar'],['Supermarket chain','Nature’s Basket, More'],
         ['Regional MT chain','Ratnadeep, Vijetha'],['Cash & carry / wholesale','METRO Wholesale'],['Convenience / mini-supermarket','Reliance Smart Point']],
  why:'Construct and format are separate axes, but each chain type has signature examples. Cash & carry is the only one selling B2B — kiranas and food service — with bulk packs and slab schemes.'});

insertAfter('In a WMS, what happens immediately after the GRN',
 {t:'scm',tag:'concept',diff:'medium',cols:['Document / system','What it does'],
  q:'Match each document or system to its job in the PO-to-shelf process.',
  match:[['Purchase order','Places the order with the supplier'],['Delivery appointment','Fixes the date and time slot at the DC'],
         ['Delivery challan','Travels with the goods from the supplier'],['GRN','Records the quantity actually accepted'],
         ['Invoice','The supplier’s bill, matched before payment'],['WMS','Runs receiving, put-away, picking and dispatch']],
  why:'PO + GRN + invoice is the three-way match before payment. The challan travels with the goods; the GRN records what was accepted; the WMS runs everything inside the DC.'});

insertAfter('Of 200 store orders, 170 arrived on time',
 {t:'inventory',tag:'calc',diff:'medium',cols:['Metric','Formula'],
  q:'Match each supply chain metric to its formula.',
  match:[['Fill rate','Quantity supplied ÷ quantity ordered'],['OTIF','Orders on time and in full ÷ total orders'],
         ['On-shelf availability','Outlets with the product in stock ÷ outlets'],['Inventory turnover','COGS ÷ average inventory'],
         ['Days of inventory','Average inventory ÷ COGS × 365'],['Forecast accuracy','1 − |forecast − actual| ÷ actual']],
  why:'Turnover and days of inventory are the same idea inverted (days = 365 ÷ turns). Fill rate counts units; OTIF counts whole orders that were both on time and complete; forecast error is divided by the <b>actual</b>.'});

insertAfter('A leader brand holds a dominant share',
 {t:'cm',tag:'concept',diff:'hard',cols:['Brand role','Placement lever'],
  q:'Match each brand role to how the retailer places it on the shelf.',
  match:[['Destination','Strategic, disproportionate space'],['Traffic','In line with sales; high-margin items highlighted'],
         ['Service','Normal; extra space only in seasonal categories'],['Image','Worst areas of the store, least footfall']],
  why:'Placement follows the role. Destination brands earn prime, outsized space; traffic brands get space in line with sales; service brands sit normally; image brands go where footfall is lowest.'});

/* ---------------- lesson ---------------- */
LESSONS.owners={eyebrow:'Section 04', title:'Stores & Operating Companies', sub:'17 modern trade banners and who runs them',
 steps:[
  {type:'table', title:'All seventeen', head:['#','MT store','Operating company / parent group'],
   rows:OWNERS.map((o,i)=>[String(i+1),o[0],o[1]])},
  {type:'table', title:'Groups with more than one banner', head:['Group','Banners','Via'],
   rows:[['Reliance Industries','Reliance Smart Bazaar · Reliance Fresh','Reliance Retail Ltd.'],
         ['Tata Group','Croma · Star Bazaar','Infiniti Retail Ltd. · Trent Hypermarket Pvt. Ltd. (Tesco JV)'],
         ['Landmark Group','Lifestyle · SPAR Hypermarket','Lifestyle International · Max Hypermarkets India'],
         ['RP-Sanjiv Goenka Group','Spencer’s · Nature’s Basket','Spencer’s Retail Ltd. · Nature’s Basket Ltd.']]},
  {type:'watch', title:'Traps and a caution',
   body:'The store name rarely matches the company: <b>DMart → Avenue Supermarts</b>, <b>Croma → Infiniti Retail</b>, <b>SPAR → Max Hypermarkets</b>, <b>Star Bazaar → Trent Hypermarket</b>. Four “Bazaars” have four owners. Big Bazaar is historical. Ownership and operating arrangements change, so verify current corporate details before using any of these as a formal reference. The interactive match-the-following cards are in the Practice Quiz.'}],
 check:[
  {t:'owners',tag:'concept',diff:'easy',
   q:'DMart is operated by…',
   opts:['Avenue Supermarts Ltd.','Reliance Retail Ltd.','More Retail Pvt. Ltd.','Future Retail Ltd. (historic)'],
   why:'DMart is run by Avenue Supermarts Ltd. — the banner name and the company name differ, which is exactly what matching questions test.'},
  {t:'owners',tag:'concept',diff:'easy',
   q:'Le Marche is part of which group?',
   opts:['DS Group (Dharampal Satyapal)','Landmark Group (via Lifestyle)','Tata Group via Trent','Aditya Birla Fashion & Retail'],
   why:'Le Marche belongs to the DS Group (Dharampal Satyapal Group), not to any of the four multi-banner groups.'}]};

/* ---------------- map ---------------- */
CMAP.splice(CMAP.length-1,0,{h:'Stores → operating companies',
 note:'Store name first; company and group after.',
 rows:OWNERS.map(o=>{const p=o[1].split(' – ');return p.length>1?[o[0],p[0],p.slice(1).join(' – ')]:[o[0],o[1]];})});
