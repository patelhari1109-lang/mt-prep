/* =========================================================================
   MODERN TRADE — Stores & operating companies (match the following).
   Loads after mt.data.js and adds one section to it.
   Source: Modern_Trade_Stores_and_Operating_Companies.docx (17 stores).
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

TOPICS.splice(TOPICS.findIndex(t=>t.id==='formats')+1,0,
 {id:'owners', name:'Stores & Owners', kick:'match each MT store to its operating company'});

/* a match-the-following question: stores numbered, companies lettered */
function matchQ(stores,companies,pairs,why,extra){
  const body='<div class="work">'+stores.map((s,i)=>(i+1)+'  '+s).join('\n')+'\n\n'+
    companies.map((c,i)=>'ABCD'[i]+'  '+c).join('\n')+'</div>';
  return Object.assign({t:'owners',tag:'concept',diff:'medium',
    q:'<b>Match the following.</b> Pair each store with its operating company.'+body,
    opts:pairs, why:why},extra||{});
}

QUIZ.push(
 matchQ(['DMart','Croma','Le Marche','Pantaloons'],
  ['Aditya Birla Fashion and Retail Ltd.','Avenue Supermarts Ltd.','DS Group (Dharampal Satyapal)','Infiniti Retail Ltd. – Tata Group'],
  ['1-B, 2-D, 3-C, 4-A','1-B, 2-C, 3-D, 4-A','1-A, 2-D, 3-C, 4-B','1-D, 2-B, 3-C, 4-A'],
  '<b>Each store, its company.</b><div class="work">DMart      → Avenue Supermarts Ltd.\nCroma      → Infiniti Retail Ltd. (Tata Group)\nLe Marche  → DS Group (Dharampal Satyapal Group)\nPantaloons → Aditya Birla Fashion and Retail Ltd.</div>The store brand rarely matches the company name: DMart is run by <i>Avenue Supermarts</i>, Croma by <i>Infiniti Retail</i>.<br><br>Learn the operating company and the group behind it as a pair.'),

 matchQ(['SPAR Hypermarket','Lifestyle','Star Bazaar','More Supermarket'],
  ['Lifestyle International Pvt. Ltd. – Landmark','More Retail Pvt. Ltd.','Max Hypermarkets India Pvt. Ltd. – Landmark','Trent Hypermarket Pvt. Ltd. – Trent / Tata'],
  ['1-C, 2-A, 3-D, 4-B','1-A, 2-C, 3-D, 4-B','1-C, 2-A, 3-B, 4-D','1-D, 2-A, 3-C, 4-B'],
  '<b>Two Landmark companies, one for each format.</b><div class="work">SPAR Hypermarket → Max Hypermarkets India Pvt. Ltd. (Landmark Group)\nLifestyle        → Lifestyle International Pvt. Ltd. (Landmark Group)\nStar Bazaar      → Trent Hypermarket Pvt. Ltd. (Trent, Tata Group; Tesco JV)\nMore Supermarket → More Retail Pvt. Ltd.</div>The trap is swapping SPAR and Lifestyle — both are Landmark, but SPAR runs through <i>Max Hypermarkets</i>, and the hypermarket name is the clue.<br><br>Star Bazaar and SPAR are both hypermarkets, but with different parents: Tata and Landmark.',
  {trap:true}),

 matchQ(['Nature’s Basket','Spencer’s','Reliance Fresh','Shoppers Stop'],
  ['Shoppers Stop Ltd.','Spencer’s Retail Ltd. – RP-Sanjiv Goenka','Nature’s Basket Ltd. – Spencer’s / RPSG','Reliance Retail Ltd.'],
  ['1-C, 2-B, 3-D, 4-A','1-B, 2-C, 3-D, 4-A','1-C, 2-B, 3-A, 4-D','1-D, 2-B, 3-C, 4-A'],
  '<b>Nature’s Basket sits under Spencer’s, which sits under RPSG.</b><div class="work">Nature’s Basket → Nature’s Basket Ltd. (Spencer’s Retail / RP-Sanjiv Goenka)\nSpencer’s       → Spencer’s Retail Ltd. (RP-Sanjiv Goenka Group)\nReliance Fresh  → Reliance Retail Ltd.\nShoppers Stop   → Shoppers Stop Ltd.</div>Two RPSG companies again — the premium supermarket keeps its own company under Spencer’s.<br><br>Reliance Fresh and Reliance Smart Bazaar both run through Reliance Retail.'),

 matchQ(['Vishal Mega Mart','Garg Dastak','Modern Bazaar','Big Bazaar'],
  ['Future Retail Ltd. (historical chain)','Garg family-owned retail business','Modern Bazaar Departmental Stores Pvt. Ltd.','Vishal Mega Mart Ltd.'],
  ['1-D, 2-B, 3-C, 4-A','1-A, 2-B, 3-C, 4-D','1-D, 2-C, 3-B, 4-A','1-D, 2-B, 3-A, 4-C'],
  '<b>Standalone and family-run chains.</b><div class="work">Vishal Mega Mart → Vishal Mega Mart Ltd.\nGarg Dastak      → Garg family-owned retail business\nModern Bazaar    → Modern Bazaar Departmental Stores Pvt. Ltd.\nBig Bazaar       → Future Retail Ltd. (historical; format discontinued)</div>Big Bazaar is listed for reference only: Future Retail’s format has been discontinued.<br><br>Modern Bazaar (Delhi NCR) is also one of the regional premium supermarkets in the formats section.'),

 matchQ(['Reliance Smart Bazaar','Croma','SPAR Hypermarket','Nature’s Basket'],
  ['Landmark Group','RP-Sanjiv Goenka Group','Reliance Industries','Tata Group'],
  ['1-C, 2-D, 3-A, 4-B','1-C, 2-A, 3-D, 4-B','1-D, 2-C, 3-A, 4-B','1-C, 2-D, 3-B, 4-A'],
  '<b>This time, match to the parent group.</b><div class="work">Reliance Smart Bazaar → Reliance Retail → Reliance Industries\nCroma                 → Infiniti Retail → Tata Group\nSPAR Hypermarket      → Max Hypermarkets India → Landmark Group\nNature’s Basket       → Spencer’s Retail → RP-Sanjiv Goenka Group</div>Store → operating company → group is a three-level chain; exam questions can ask for either level.<br><br>Know which groups run more than one MT banner: Reliance, Tata, Landmark, RPSG.'),

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
  why:'<b>Tata runs Croma through Infiniti Retail Ltd. and Star Bazaar through Trent Hypermarket Pvt. Ltd.</b> (a Trent–Tesco joint venture).<div class="work">Croma       → Infiniti Retail Ltd. → Tata Group\nStar Bazaar → Trent Hypermarket Pvt. Ltd. → Trent (Tata) + Tesco JV</div>SPAR is Landmark; More is More Retail; Shoppers Stop is its own company.<br><br>Electronics specialist plus hypermarket — the same group runs two very different formats.'},

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

 {t:'owners',tag:'concept',diff:'medium',
  q:'Which store on the list is run by a <b>family-owned</b> retail business rather than a corporate group or listed chain?',
  opts:['Garg Dastak',
        'Vishal Mega Mart',
        'DMart',
        'More Supermarket'],
  why:'<b>Garg Dastak is a Garg family-owned retail business.</b><div class="work">Garg Dastak      → family-owned\nVishal Mega Mart → Vishal Mega Mart Ltd.\nDMart            → Avenue Supermarts Ltd.\nMore             → More Retail Pvt. Ltd.</div>In retailer-construct terms, a family-run chain usually means owner-led buying: quick decisions and direct negotiation.<br><br>Ownership shapes how an FMCG company sells in — owner, central buyer or category team.'}
);

/* ---------------- lesson ---------------- */
const SHORT=OWNERS.map(o=>[o[1].split(' – ')[0].replace(' (historical; format discontinued)',' (historical)'),o[1]]);
function matcher(stores){
  const opts=[['','— choose —']].concat(OWNERS.map((o,i)=>[String(i),SHORT[i][0]]).sort((a,b)=>a[1].localeCompare(b[1])));
  return {hint:'Pick the operating company for each store, then read your score.',
    ins:stores.map(s=>({k:'s'+s,nm:OWNERS[s][0],type:'select',opts:opts,def:''})),
    run:v=>{
      let ok=0,miss=[];
      stores.forEach(s=>{if(v['s'+s]===String(s))ok++;else miss.push(OWNERS[s][0]+' → '+SHORT[s][0]);});
      const done=stores.every(s=>v['s'+s]!=='');
      return (done?'':'Choose a company for every store.\n')+'Correct: '+ok+' of '+stores.length+
        '<span class="big">'+ok+' / '+stores.length+'</span>'+
        (done&&miss.length?'<span class="vd warn">Fix: '+miss.join(' · ')+'</span>':'')+
        (done&&!miss.length?'<span class="vd ok">All matched.</span>':'');}};
}
Object.assign(CALCS,{own1:matcher([0,4,2,11,6,3]),own2:matcher([16,5,10,14,15,13]),own3:matcher([1,7,8,9,12])});

LESSONS.owners={eyebrow:'Section 04', title:'Stores & Operating Companies', sub:'17 modern trade banners and who runs them',
 steps:[
  {type:'table', title:'All seventeen', head:['#','MT store','Operating company / parent group'],
   rows:OWNERS.map((o,i)=>[String(i+1),o[0],o[1]])},
  {type:'table', title:'Groups with more than one banner', head:['Group','Banners','Via'],
   rows:[['Reliance Industries','Reliance Smart Bazaar · Reliance Fresh','Reliance Retail Ltd.'],
         ['Tata Group','Croma · Star Bazaar','Infiniti Retail Ltd. · Trent Hypermarket Pvt. Ltd. (Tesco JV)'],
         ['Landmark Group','Lifestyle · SPAR Hypermarket','Lifestyle International · Max Hypermarkets India'],
         ['RP-Sanjiv Goenka Group','Spencer’s · Nature’s Basket','Spencer’s Retail Ltd. · Nature’s Basket Ltd.']]},
  {type:'calc', calc:'own1', title:'Match the following: set 1'},
  {type:'calc', calc:'own2', title:'Match the following: set 2'},
  {type:'calc', calc:'own3', title:'Match the following: set 3'},
  {type:'watch', title:'Traps and a caution',
   body:'The store name rarely matches the company: <b>DMart → Avenue Supermarts</b>, <b>Croma → Infiniti Retail</b>, <b>SPAR → Max Hypermarkets</b>, <b>Star Bazaar → Trent Hypermarket</b>. Four “Bazaars” have four owners. Big Bazaar is historical. Ownership and operating arrangements change, so verify current corporate details before using any of these as a formal reference.'}],
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
