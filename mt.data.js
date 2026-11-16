/* =========================================================================
   MODERN TRADE — full course (MT1–MT7), case-led remake.
   Loads after mt-base.data.js, which supplies OLD_QUIZ / OLD_LESSONS /
   OLD_CALCS / OLD_CMAP from the first build. This file picks the strongest
   earlier questions, adds supply chain, inventory and category management,
   and three exhibit-style cases in the MaxMart format.
   ========================================================================= */

const CONFIG={
  quizEyebrow:'Modern Trade · case practice',
  quizTitle:'The case bank',
  quizIntro:'Three exhibit cases (MaxMart, FreshKart, UrbanBasket) plus six concept sections. Work every case on paper first; the explanation shows the full working and names the slip behind each wrong option. 🃏 marks a distinction that is easy to get backwards.',
  mapTitle:'The Modern Trade Map',
  mapIntro:'Every formula with a worked number, then every table from the course.',
  examDayPlan:[
   '<b>Write the formula before the number.</b> Turnover = annual COGS ÷ average inventory at cost — not sales.',
   '<b>Fill rate, GRN acceptance, overall acceptance are three different denominators:</b> delivered ÷ PO, accepted ÷ delivered, accepted ÷ PO.',
   '<b>Promo ROI = (net incremental sales × margin − investment) ÷ investment.</b> Strip cannibalisation first; use gross profit, not sales.',
   '<b>Reorder point = (lead time + safety days) × daily demand.</b> Cover = stock ÷ daily demand. Compare the two to decide whether a PO is due.',
   '<b>Annualise only flows.</b> Monthly sales and COGS × 12; inventory is a balance — never × 12.'
  ]
};

const TOPICS=[
 {id:'channels', name:'Channels & Supply Basics',      kick:'OT vs GT vs e-com; DC-led vs distributor-led'},
 {id:'shopper',  name:'Shopper, Layout & Category',    kick:'shopper types, journey, layouts, category share'},
 {id:'formats',  name:'Formats & Teams',               kick:'construct, formats, KAM and category teams'},
 {id:'scm',      name:'Supply Chain Operations',       kick:'PO → GRN → put-away; WMS; DC vs direct', hot:true},
 {id:'inventory',name:'Inventory Metrics & Forecasting',kick:'turns, DOI, OTIF, OSA, EOQ, forecasts', hot:true},
 {id:'cm',       name:'Category Management',           kick:'objectives, brand roles, levers, PL, events', hot:true},
 {id:'maxmart',  name:'Case: MaxMart',                 kick:'the course case, fully worked', hot:true},
 {id:'freshkart',name:'Case: FreshKart',               kick:'same exhibit, new numbers'},
 {id:'urban',    name:'Case: UrbanBasket',             kick:'brand roles, margin mix, promo ROI'}
];

/* ---------- reuse the strongest questions from the first build ---------- */
// keepTrap: only a few reused questions keep the 🃏 flag, so the bank stays near 15%
function pick(stem,t,keepTrap){
  const q=OLD_QUIZ.find(x=>x.q.indexOf(stem)>=0);
  if(!q)throw new Error('missing base question: '+stem);
  const o=Object.assign({},q,{t:t});
  if(!keepTrap)delete o.trap;
  return o;
}
const REUSED=[
 pick('The whole GT–OT difference can be compressed','channels',1),
 pick('who is the <b>decision maker</b>','channels'),
 pick('A brand plan includes a <b>listing fee</b>','channels'),
 pick('Who decides the assortment in a kirana store?','channels'),
 pick('In the MT supply chain, which step sits between','channels'),
 pick('How is replenishment ordered for a DMart store?','channels'),
 pick('A shopper picks up a chocolate bar','shopper'),
 pick('A shopper always buys Nescafé Classic','shopper'),
 pick('At which journey stage do eye-level placement','shopper'),
 pick('guided along one defined path','shopper'),
 pick('A hypermarket runs grocery aisles, a fashion zone','shopper'),
 pick('Fresh foods is ranked <b>7th</b>','shopper',1),
 pick('A chain with <b>40 stores</b>','formats'),
 pick('Lulu Hypermarket runs','formats',1),
 pick('Why does a cash & carry (e.g. METRO) price','formats'),
 pick('Which set of levers best fits a <b>mini supermarket</b>','formats'),
 pick('Why does the Key Account Manager sit <b>above</b>','formats'),
 pick('are <b>planograms</b> defined','formats')
];

/* ---------------- case exhibits ---------------- */
const S_MAX={cl:'Case · MaxMart · seven parts',h:'Regional chain, 45 supermarkets, one RDC — FMCG, October 2026',
 body:'<div class="work">Monthly category sales          ₹150 lakh\nGross margin                    22%\nAverage inventory at cost       ₹66 lakh\nCategory selling area           7,500 sq ft\nAverage daily network sales     1,000 cases\nRDC inventory                   14,000 cases\nStore inventory (45 stores)     16,000 cases\nSupplier PO / delivered / GRN   15,000 / 13,800 / 13,248 cases\nSupplier lead time              6 days\nDesired safety stock            3 days\nPromo baseline / actual sales   ₹24 lakh / ₹36 lakh\nPromotional investment          ₹1.20 lakh\nCannibalisation                 30% of incremental sales</div>Sales are net of GST; inventory is at cost; October is representative for annualising; the reorder point uses average daily network demand; GRN acceptance is on delivered quantity.'};
const S_FK={cl:'Case · FreshKart · six parts',h:'Regional chain, 30 supermarkets, one RDC — personal care, November 2026',
 body:'<div class="work">Monthly category sales          ₹90 lakh\nGross margin                    25%\nAverage inventory at cost       ₹45 lakh\nCategory selling area           5,000 sq ft\nAverage daily network sales     800 cases\nRDC inventory                   9,600 cases\nStore inventory (30 stores)     14,400 cases\nSupplier PO / delivered / GRN   12,000 / 10,800 / 10,476 cases\nSupplier lead time              5 days\nDesired safety stock            4 days\nPromo baseline / actual sales   ₹15 lakh / ₹21 lakh\nPromotional investment          ₹0.90 lakh\nCannibalisation                 40% of incremental sales</div>Same conventions as MaxMart: net sales, inventory at cost, November representative for the year.'};
const S_UB={cl:'Case · UrbanBasket · six parts',h:'National hypermarket chain — home care, annual',
 body:'<div class="work">Brand                     Sales ₹ cr   Share   Retailer margin\nP  market leader              40       40%        12%\nQ  No. 2 brand                25       25%        22%\nR  challenger, new launch      6        6%        28%\nS  niche import                4        4%         9%\nPL UrbanBasket private label  15       15%        35%\nOthers                        10       10%        18%\nCategory total               100      100%</div>For the sales-and-margin grid, treat a share of <b>20% or more</b> as high sales, and a margin <b>at or above the category average</b> as high margin.'};

/* =========================================================================
   QUIZ
   ========================================================================= */
const QUIZ=REUSED.concat([
/* ---------------- Supply Chain Operations ---------------- */
 {t:'scm',tag:'concept',diff:'medium',
  q:'Put the PO-to-shelf process in order, from the retailer’s purchase order to stock being available for sale.',
  opts:['PO → supplier confirmation → delivery appointment → goods inward → GRN → put-away & stock update',
        'PO → goods inward → GRN → supplier confirmation → delivery appointment → put-away & stock update',
        'PO → delivery appointment → GRN → goods inward → supplier confirmation → put-away & stock update',
        'PO → supplier confirmation → GRN → delivery appointment → goods inward → put-away & stock update'],
  why:'<b>Order → confirm → schedule → receive → record → store.</b><div class="work">1 PO                    → raised on the forecast / demand plan\n2 Supplier confirmation → quantity, date and terms acknowledged\n3 Delivery appointment  → date and slot fixed at the DC\n4 Goods inward          → transport arrives, gate entry\n5 GRN                   → received quantity and quality verified\n6 Put-away & update     → stock moved to storage, inventory updated</div>A GRN can only be raised after goods are physically received — any option with GRN before goods inward is wrong.<br><br>Success factors: on-time delivery per appointment, accuracy (right SKU, quantity), quality, efficiency.'},

 {t:'scm',tag:'calc',diff:'medium',trap:true,
  q:'A PO is for 1,000 units of a detergent. All 1,000 arrive, but 20 are damaged and rejected. What is the GRN quantity, and what does the retailer pay for?',
  opts:['GRN 980; payment on 980 after matching PO, GRN and invoice',
        'GRN 1,000; payment on 1,000, since that was the PO quantity',
        'GRN 980; payment on 1,000, since that is what was invoiced',
        'GRN 1,000; payment on 980, with the damage noted separately'],
  why:'<b>The GRN records the accepted quantity, and payment follows three-way matching.</b><div class="work">PO 1,000 · delivered 1,000 · damaged 20 · accepted = GRN = 980\nPO + GRN + invoice → three-way match → pay for 980</div>The invoice may say 1,000, but the GRN is the proof of what was accepted. Damage is never “noted separately” on a 1,000-unit GRN.<br><br>Checks at GRN: SKU, quantity, batch, expiry and damage.'},

 {t:'scm',tag:'concept',diff:'medium',
  q:'In a WMS, what happens immediately after the GRN is generated?',
  opts:['Put-away — accepted stock is allocated to racks, bins and locations',
        'Dispatch — documents are raised and stock leaves for the stores',
        'Order picking — items are picked and packed against each store’s orders',
        'Goods receiving — products are verified against the purchase order'],
  why:'<b>WMS flow: receive → GRN → put-away → manage inventory → pick & pack → dispatch.</b><div class="work">Receiving   → verify quantity, SKU, quality against PO\nGRN         → record accepted goods; update system\nPut-away    → allocate racks, bins, locations\nInventory   → track by SKU, batch, expiry, location\nPick & pack → against store or distributor orders\nDispatch    → documentation; stock decremented</div>Receiving comes <i>before</i> the GRN; picking and dispatch come after storage.<br><br>A WMS manages everything from receiving to dispatch inside the DC.'},

 {t:'scm',tag:'apply',diff:'medium',
  q:'A 400-store national chain sells a high-volume detergent. Which supply model fits, and why?',
  opts:['DC supply — consolidated bulk deliveries, lower cost per unit, more retailer control',
        'Direct store supply — every store orders from the supplier, which lowers its unit cost',
        'Direct store supply — the retailer gains tighter control over allocation to each store',
        'DC supply — because it removes the need for any coordination with the supplier at all'],
  why:'<b>DC supply suits large chains and high-volume categories.</b><div class="work">               DC supply                    Direct store supply\nDelivery to    retailer’s DC                each store\nTransport      bulk shipments               many small drops\nReplenishment  retailer-managed             supplier/distributor-managed\nSupplier cost  lower per unit               higher per unit\nControl        greater over allocation      less central control\nBest for       large chains, high volume    small networks, special cases</div>Direct supply gives the retailer <i>less</i> control, not more. DC supply shifts coordination to the DC; it does not remove it.<br><br>Scale and volume push towards a DC; small networks or special needs push towards direct.'},

 {t:'scm',tag:'apply',diff:'hard',trap:true,
  q:'The RDC holds 25 days of cover on a shampoo, but stores report frequent stock-outs on it. What is the most likely problem?',
  opts:['Allocation and replenishment from the RDC to stores — stock is in the wrong place',
        'The supplier’s fill rate — the RDC must be receiving too little stock to send out',
        'Demand — shoppers must have shifted away, so stores should hold less of it',
        'Network inventory is too low overall, so a larger PO should be raised at once'],
  why:'<b>Network inventory = store + DC inventory.</b> Healthy DC cover with empty shelves means the stock is not reaching the stores.<div class="work">DC cover high + store stock-outs → downstream allocation / replenishment\n“Insufficient DC stock can cause store stock-outs” — but here DC stock is plentiful</div>Raising another PO adds more stock to the wrong place and ties up working capital. Fill rate is not the issue when the DC is full.<br><br>Read DC and store inventory separately before calling it a supply problem.'},

 {t:'scm',tag:'calc',diff:'medium',
  q:'A product is in stock at 850 of a chain’s 1,000 outlets. What is its on-shelf availability, and why does it matter?',
  opts:['85% — 15% of outlets risk losing the sale when a shopper looks for it',
        '15% — the share of outlets where the product is available to shoppers',
        '85% — so the supplier’s fill rate on its purchase orders must also be 85%',
        '117.6% — outlets in stock divided by outlets out of stock, as a ratio'],
  why:'<b>OSA = % of outlets with the product in stock.</b><div class="work">850 ÷ 1,000 = 85%</div>OSA is a shelf measure; fill rate is a supply measure (supplied ÷ ordered). A supplier can fill 100% of POs and the shelf can still be empty.<br><br>OSA drives sales and pickup and avoids out-of-stock moments.'},

/* ---------------- Inventory Metrics & Forecasting ---------------- */
 {t:'inventory',tag:'calc',diff:'medium',trap:true,
  q:'Annual sales ₹600 lakh at a 25% gross margin; average inventory at cost ₹45 lakh. What is inventory turnover?',
  opts:['10 times',
        '13.3 times',
        '3.3 times',
        '7.5 times'],
  why:'<b>Turnover = COGS ÷ average inventory — both at cost.</b><div class="work">COGS = 600 × (1 − 25%) = ₹450 lakh\nTurnover = 450 ÷ 45 = 10 times</div>13.3 uses sales over inventory at cost — mixing a retail number with a cost number. 3.3 uses gross profit. 7.5 is not a ratio of these figures at all.<br><br>Keep numerator and denominator on the same basis.'},

 {t:'inventory',tag:'calc',diff:'medium',
  q:'Average inventory is ₹30 lakh at cost; annual COGS is ₹438 lakh. How many days of inventory is that?',
  opts:['25 days',
        '14.6 days',
        '30 days',
        '12 days'],
  why:'<b>Days of inventory = average inventory ÷ COGS × 365.</b><div class="work">30 ÷ 438 × 365 = 25 days\nCheck: turnover = 438 ÷ 30 = 14.6 → 365 ÷ 14.6 = 25 days</div>14.6 is turnover, not days. Days and turns are two views of the same thing: days = 365 ÷ turns.<br><br>Fewer days of inventory frees working capital — as long as OSA holds.'},

 {t:'inventory',tag:'calc',diff:'medium',
  q:'Forecast for the month: 1,200 cases. Actual sales: 1,000 cases. What is forecast accuracy?',
  opts:['80%',
        '83.3%',
        '120%',
        '20%'],
  why:'<b>Forecast accuracy = 1 − |forecast − actual| ÷ actual.</b><div class="work">1 − |1,200 − 1,000| ÷ 1,000 = 1 − 0.2 = 80%</div>83.3% divides the error by the forecast (the trap); 20% is the error itself; 120% is forecast over actual.<br><br>Over-forecasting builds excess stock; under-forecasting causes stock-outs — accuracy penalises both.'},

 {t:'inventory',tag:'calc',diff:'medium',
  q:'Of 200 store orders, 170 arrived on time, 160 arrived in full, and 150 were both. What is OTIF?',
  opts:['75%',
        '80%',
        '85%',
        '82.5%'],
  why:'<b>OTIF = orders that were on time AND in full ÷ total orders.</b><div class="work">150 ÷ 200 = 75%</div>85% is on time only; 80% is in full only; 82.5% averages the two. OTIF needs both at once, so it is always at or below the lower of the two.<br><br>OTIF is the strictest single read on supplier reliability.'},

 {t:'inventory',tag:'calc',diff:'hard',
  q:'Annual demand 36,000 units, ordering cost ₹500 per order, holding cost ₹10 per unit per year. What is the EOQ?',
  given:['D = 36,000','S = ₹500','H = ₹10'],
  opts:['About 1,897 units',
        'About 3,600 units',
        'About 600 units',
        'About 6,000 units'],
  why:'<b>EOQ = √(2DS ÷ H)</b> — the order size that balances ordering and holding costs.<div class="work">2 × 36,000 × 500 = 3,60,00,000\n÷ 10            = 36,00,000\n√               ≈ 1,897 units  (about 19 orders a year)</div>6,000 forgets to divide by H (√36,000,000); 600 divides by H twice; 3,600 is just demand ÷ 10, with no square root.<br><br>Bigger ordering costs push EOQ up; bigger holding costs push it down.'},

 {t:'inventory',tag:'calc',diff:'medium',
  q:'Sales for the last three months were 900, 1,100 and 1,000 cases (most recent last). What is the weighted-average forecast with weights 0.2, 0.3, 0.5?',
  opts:['1,010 cases',
        '1,000 cases',
        '990 cases',
        '1,050 cases'],
  why:'<b>Weighted moving average puts more weight on recent months.</b><div class="work">900 × 0.2 + 1,100 × 0.3 + 1,000 × 0.5\n= 180 + 330 + 500 = 1,010</div>1,000 is the simple moving average; 990 reverses the weights.<br><br>Exponential smoothing does the same job recursively: F(new) = F(old) + α × (actual − F(old)).'},

/* ---------------- Category Management ---------------- */
 {t:'cm',tag:'concept',diff:'medium',
  q:'A category manager in modern trade is primarily responsible for driving which three outcomes?',
  opts:['Sales, profits and the share of private label',
        'Footfall, store staff productivity and rentals',
        'Supplier lead time, fill rate and GRN accuracy',
        'Brand awareness, ad recall and social reach'],
  why:'<b>Category management bundles products so they can be managed effectively.</b><div class="work">Drives: sales · profits · share of private label\nDecides: which assortment · share of shelf · planogram ·\n         how to partner leader and challenger brands ·\n         traffic to the aisle · AOV and conversion</div>Fill rate and GRN accuracy are supply-chain metrics the CM watches but does not primarily own.<br><br>Tools: internal and external data, partnering the leading brand to grow the category, shopper research.'},

 {t:'cm',tag:'calc',diff:'medium',
  q:'A category earns ₹396 lakh gross profit a year on an average inventory of ₹66 lakh at cost. What is its GMROI?',
  opts:['6.0',
        '21.3',
        '0.17',
        '27.3'],
  why:'<b>GMROI = annual gross margin ÷ average inventory at cost</b> — rupees of gross profit per rupee invested in stock.<div class="work">396 ÷ 66 = 6.0</div>21.3 is inventory turnover (COGS ÷ inventory); 27.3 divides sales by inventory; 0.17 is the inverse. GMROI = turnover × GM ÷ (1 − GM).<br><br>Profitability (GMROI, vendor margin) is one of five retailer objectives, alongside GMV, AOV, traffic and inventory turnover.'},

 {t:'cm',tag:'apply',diff:'medium',
  q:'A niche brand has low sales in the category but gives the retailer a high margin. Which role does it play, and how is it handled?',
  opts:['Service — medium price competitiveness, few promotions, normal placement',
        'Destination — highly competitive price, high-intensity promos, prime space',
        'Traffic — medium-to-high price competitiveness and frequent promotions',
        'Image — low price, no promotions and the worst areas of the store'],
  why:'<b>The sales-and-margin grid gives each brand a role and a set of levers.</b><div class="work">           Sales   Margin   Typically                    Levers\nDestination high    high     leader or No. 2              sharp price, intense promos, premium/large packs, strategic space\nTraffic     high    low      leader with dominant share   medium–high price, frequent promos, in line with market\nService     low     high     niche / challenger NPIs      medium price, few promos (key events), narrow, PL focus\nImage       low     low      choice fillers               low, no promos, top sellers only, worst space</div>Low sales + high margin = service. Such brands earn their place through margin, not volume.<br><br>Name the role first; the levers follow from it.'},

 {t:'cm',tag:'apply',diff:'medium',
  q:'A leader brand holds a dominant share but gives the retailer a thin margin. Why keep it prominent?',
  opts:['It is a traffic brand — it brings shoppers into the aisle and the store',
        'It is an image brand — it fills choice but has no commercial purpose',
        'It is a destination brand — it delivers both high sales and high margin',
        'It is a service brand — its margin makes up for its low sales volume'],
  why:'<b>High sales, low margin = traffic.</b> The brand earns its space by pulling shoppers in, who then buy higher-margin items.<div class="work">Traffic levers: medium–high price competitiveness · high promo frequency\n                portfolio in line with market (entry and premium)\n                placement in line with sales; high-margin items highlighted</div>Destination needs high margin too; image and service are both low sales.<br><br>A traffic brand’s value shows up in the basket, not in its own margin line.'},

 {t:'cm',tag:'concept',diff:'medium',
  q:'Which is <b>not</b> a reason retailers build private labels?',
  opts:['To lift the share of national brands in the category',
        'To offer a value option to the price-sensitive shoppers',
        'To drive the retailer’s own profitability',
        'To build store loyalty and control the supply'],
  why:'<b>Private label: value option, profitability, store loyalty, control over supply chain and inventory.</b><div class="work">Value      → price-sensitive shoppers\nProfit     → higher retailer margin\nLoyalty    → only available in this chain\nControl    → supply chain, inventory</div>Private label competes with national brands for shelf and share; it does not raise their share.<br><br>Commodity-like categories (staples, home care) are where PL is most salient.'},

 {t:'cm',tag:'apply',diff:'medium',
  q:'Why do modern trade chains run big events around Republic Day, Independence Day and Diwali?',
  opts:['They are acquisition engines that break habits and build pantry-loading baskets',
        'They clear unhealthy stock, which is the single commercial purpose of the event',
        'They let the chain raise prices, since demand is at its highest on those days',
        'They replace always-on promotions, so no offers are needed for the rest of the year'],
  why:'<b>Events are high-intensity acquisition moments followed by consolidation.</b><div class="work">Acquisition engines → bring new shoppers in-store / online\nBreak habit inertia → mix of high-intensity inputs\nBuild pantry (AOV)  → bigger baskets, upsizing\nShort, intense media bursts help action</div>Prices fall in events; the economics come from upsizing and new shoppers kept afterwards.<br><br>Event → consolidation → event: each spike lifts the base.'},

/* ---------------- Case: MaxMart ---------------- */
 {t:'maxmart',tag:'case',diff:'medium',scene:S_MAX,
  q:'<b>Q1.</b> Which combination is right for monthly gross profit per sq ft and annualised inventory turnover?',
  opts:['₹440 and 21.27 times',
        '₹400 and 21.27 times',
        '₹440 and 18.50 times',
        '₹480 and 20.00 times'],
  why:'<b>GP per sq ft uses gross profit; turnover uses annual COGS over inventory at cost.</b><div class="work">Gross profit   = 150 × 22%           = ₹33 lakh\nGP per sq ft   = 33,00,000 ÷ 7,500   = ₹440\nAnnual COGS    = 150 × 78% × 12      = ₹1,404 lakh\nTurnover       = 1,404 ÷ 66          = 21.27 times</div>Using sales instead of COGS gives 27.3; forgetting to annualise gives 1.77. The inventory is a balance — never multiply it by 12.<br><br>In the brief this is option <b>B</b>.'},

 {t:'maxmart',tag:'case',diff:'medium',scene:S_MAX,
  q:'<b>Q2.</b> What are the RDC inventory cover and the RDC reorder point?',
  opts:['14 days and 9,000 cases',
        '16 days and 9,000 cases',
        '30 days and 9,000 cases',
        '14 days and 6,000 cases'],
  why:'<b>Cover = stock ÷ daily demand. Reorder point = (lead time + safety days) × daily demand.</b><div class="work">RDC cover     = 14,000 ÷ 1,000      = 14 days\nReorder point = (6 + 3) × 1,000     = 9,000 cases</div>16 days is the store cover; 30 days is the whole network. 6,000 leaves out the safety stock.<br><br>14,000 > 9,000, so no PO is due yet — 5,000 cases (5 days) above the trigger. In the brief this is option <b>A</b>.'},

 {t:'maxmart',tag:'case',diff:'medium',trap:true,scene:S_MAX,
  q:'<b>Q3.</b> What are the supplier delivery fill rate, GRN acceptance rate and overall PO acceptance rate?',
  opts:['92%, 96% and 88.32%',
        '96%, 92% and 88.32%',
        '92%, 88.32% and 96%',
        '88.32%, 92% and 96%'],
  why:'<b>Three rates, three denominators.</b><div class="work">Fill rate       = delivered ÷ PO        = 13,800 ÷ 15,000 = 92%\nGRN acceptance  = accepted ÷ delivered  = 13,248 ÷ 13,800 = 96%\nOverall         = accepted ÷ PO         = 13,248 ÷ 15,000 = 88.32%\nCheck: 92% × 96% = 88.32%</div>The second option swaps the first two — the classic slip. Overall acceptance is always the product of the other two.<br><br>In the brief this is option <b>A</b>.'},

 {t:'maxmart',tag:'case',diff:'hard',trap:true,scene:S_MAX,
  q:'<b>Q4.</b> After adjusting for cannibalisation, what is the promotional ROI?',
  opts:['54%',
        '35%',
        '45%',
        '65%'],
  why:'<b>ROI = (net incremental gross profit − investment) ÷ investment.</b><div class="work">Incremental sales     = 36 − 24          = ₹12 lakh\nLess cannibalisation  = 12 × 30%         = ₹3.6 lakh\nNet incremental sales = ₹8.4 lakh\nIncremental GP        = 8.4 × 22%        = ₹1.848 lakh\nROI                   = (1.848 − 1.2) ÷ 1.2 = 54%</div>Skip cannibalisation and you get 120%; use sales instead of GP and you get 600%. Both overstate the promotion.<br><br>In the brief this is option <b>C</b>.'},

 {t:'maxmart',tag:'case',diff:'medium',scene:S_MAX,
  q:'<b>Q5.</b> If average inventory at cost falls 10% with the same sales and margin, what is the revised turnover?',
  opts:['23.64 times',
        '21.27 times',
        '22.50 times',
        '24.80 times'],
  why:'<b>Same COGS over a smaller inventory.</b><div class="work">New inventory = 66 × 90%      = ₹59.4 lakh\nTurnover      = 1,404 ÷ 59.4  = 23.64 times\nShortcut      = 21.27 ÷ 0.9   = 23.64</div>A 10% cut in inventory lifts turns by 11.1%, not 10% (1 ÷ 0.9). It also releases ₹6.6 lakh of working capital.<br><br>In the brief this is option <b>C</b>.'},

 {t:'maxmart',tag:'case',diff:'medium',scene:S_MAX,
  q:'<b>Q6 (extension).</b> What is MaxMart’s total network cover, and where does most of the stock sit?',
  opts:['30 days — about 53% of it sits in the 45 stores',
        '14 days — nearly all of it sits at the RDC itself',
        '16 days — all of it sits on the store shelves now',
        '30 days — about 53% of it sits at the RDC centrally'],
  why:'<b>Network inventory = store + DC inventory.</b><div class="work">Network = 14,000 + 16,000 = 30,000 cases ÷ 1,000 = 30 days\nStore share = 16,000 ÷ 30,000 ≈ 53%</div>With 30 days of network cover against a 9-day reorder point, MaxMart is carrying roughly three weeks more than it needs to protect service.<br><br>That gap is the working-capital opportunity behind Q5.'},

 {t:'maxmart',tag:'case',diff:'hard',scene:S_MAX,
  q:'<b>Q7 (extension).</b> What are MaxMart’s GMROI and days of inventory?',
  opts:['GMROI 6.0 · about 17 days of inventory',
        'GMROI 21.3 · about 17 days of inventory',
        'GMROI 6.0 · about 30 days of inventory',
        'GMROI 0.5 · about 13 days of inventory'],
  why:'<b>GMROI = annual GP ÷ average inventory at cost. DOI = inventory ÷ COGS × 365.</b><div class="work">Annual GP = 33 × 12          = ₹396 lakh\nGMROI     = 396 ÷ 66         = 6.0\nDOI       = 66 ÷ 1,404 × 365 = 17.2 days  (= 365 ÷ 21.27)</div>21.3 is turnover. 30 days is the network cover in cases — a volume measure, not the value-based DOI.<br><br>Each rupee of stock earns ₹6 of gross profit a year.'},

/* ---------------- Case: FreshKart ---------------- */
 {t:'freshkart',tag:'case',diff:'medium',scene:S_FK,
  q:'<b>Q1.</b> What are monthly gross profit per sq ft and annualised inventory turnover?',
  opts:['₹450 and 18.0 times',
        '₹450 and 24.0 times',
        '₹337.5 and 18.0 times',
        '₹1,800 and 1.5 times'],
  why:'<div class="work">Gross profit = 90 × 25%            = ₹22.5 lakh\nGP per sq ft = 22,50,000 ÷ 5,000    = ₹450\nAnnual COGS  = 90 × 75% × 12        = ₹810 lakh\nTurnover     = 810 ÷ 45             = 18.0 times</div>24.0 uses sales (1,080 ÷ 45). ₹337.5 divides COGS-based figures; ₹1,800 is sales per sq ft; 1.5 forgets to annualise.<br><br>GP per sq ft rewards both margin and space productivity.'},

 {t:'freshkart',tag:'case',diff:'hard',scene:S_FK,
  q:'<b>Q2.</b> What are the RDC cover and the reorder point — and is a PO due today?',
  opts:['12 days and 7,200 cases — not yet; stock is 2,400 cases (3 days) above the trigger',
        '12 days and 7,200 cases — yes; cover is below the 30-day network norm, so order now',
        '30 days and 7,200 cases — not yet; the network holds a full month of stock today',
        '12 days and 4,000 cases — not yet; stock is 5,600 cases above the reorder point'],
  why:'<div class="work">RDC cover     = 9,600 ÷ 800      = 12 days\nReorder point = (5 + 4) × 800    = 7,200 cases\nGap           = 9,600 − 7,200    = 2,400 cases = 3 days</div>4,000 forgets safety stock. There is no “30-day norm”: the reorder point, not network cover, triggers the PO.<br><br>Raise the PO in about three days, when RDC stock touches 7,200.'},

 {t:'freshkart',tag:'case',diff:'medium',scene:S_FK,
  q:'<b>Q3.</b> What are the fill rate, GRN acceptance rate and overall PO acceptance rate?',
  opts:['90%, 97% and 87.3%',
        '97%, 90% and 87.3%',
        '90%, 87.3% and 97%',
        '87.3%, 97% and 90%'],
  why:'<div class="work">Fill rate      = 10,800 ÷ 12,000 = 90%\nGRN acceptance = 10,476 ÷ 10,800 = 97%\nOverall        = 10,476 ÷ 12,000 = 87.3%   (= 90% × 97%)</div>The supplier is short-shipping (90%) more than it is delivering damaged stock (3% rejected). The conversation with the supplier is about quantity, not quality.<br><br>Read the two rates separately to find which one to fix.'},

 {t:'freshkart',tag:'case',diff:'hard',scene:S_FK,
  q:'<b>Q4.</b> After cannibalisation, what is the promotional ROI?',
  opts:['0% — the promotion only just breaks even',
        '60% — a strong return on the investment',
        '67% — once the full uplift is counted in',
        '−40% — the promotion destroys value'],
  why:'<div class="work">Incremental sales     = 21 − 15        = ₹6 lakh\nLess 40% cannibalised = ₹2.4 lakh\nNet incremental       = ₹3.6 lakh\nIncremental GP        = 3.6 × 25%      = ₹0.9 lakh\nROI                   = (0.9 − 0.9) ÷ 0.9 = 0%</div>Without cannibalisation: 6 × 25% = 1.5 → 67%. A 40% sales uplift sounds great; with heavy cannibalisation it merely pays for itself.<br><br>Before repeating it, cut the investment or the cannibalisation (offer on a pack that does not steal from the base).'},

 {t:'freshkart',tag:'case',diff:'hard',scene:S_FK,
  q:'<b>Q5.</b> Management wants 20 inventory turns at the same sales and margin. How much working capital does that release?',
  opts:['₹4.5 lakh — inventory falls from ₹45 lakh to ₹40.5 lakh',
        '₹9.0 lakh — inventory falls from ₹45 lakh to ₹36 lakh',
        '₹5.0 lakh — inventory falls from ₹45 lakh to ₹40 lakh',
        '₹54 lakh — inventory falls by the year’s whole COGS gap'],
  why:'<b>Solve the turnover formula for inventory.</b><div class="work">Required inventory = 810 ÷ 20     = ₹40.5 lakh\nReleased           = 45 − 40.5     = ₹4.5 lakh (a 10% cut)\nDays of inventory  ≈ 20.3 → 18.3 days</div>₹36 lakh would need 22.5 turns. ₹54 lakh confuses a flow with a balance.<br><br>Every turn you add frees cash without changing sales — provided on-shelf availability holds.'},

 {t:'freshkart',tag:'case',diff:'medium',scene:S_FK,
  q:'<b>Q6.</b> What is the network cover, and what does the split between stores and RDC suggest?',
  opts:['30 days — 60% sits in stores, so check store stock norms before ordering more',
        '18 days — 60% sits in stores, so the RDC must be short and needs an urgent PO',
        '30 days — 60% sits at the RDC, so store replenishment must be running late',
        '12 days — only the RDC counts, since store stock has already been allocated'],
  why:'<div class="work">Network = 9,600 + 14,400 = 24,000 ÷ 800 = 30 days\nStores  = 14,400 ÷ 24,000 = 60%  (18 days of store cover)</div>Store stock is part of network inventory — it is not “already sold”. With 18 days on store shelves and backrooms, the risk is expiry and markdowns, not stock-outs.<br><br>Excess store stock leads to higher holding cost, expiry and markdowns.'},

/* ---------------- Case: UrbanBasket ---------------- */
 {t:'urban',tag:'case',diff:'medium',scene:S_UB,
  q:'<b>Q1.</b> What is the category’s average retailer margin?',
  opts:['About 19.4%',
        'About 20.7%',
        'About 24.0%',
        'About 18.0%'],
  why:'<b>Weight each brand’s margin by its sales share.</b><div class="work">P   40 × 12% = 4.80\nQ   25 × 22% = 5.50\nR    6 × 28% = 1.68\nS    4 ×  9% = 0.36\nPL  15 × 35% = 5.25\nOth 10 × 18% = 1.80\nTotal        = 19.39 → 19.4%</div>20.7% is the simple average of the six margins — it ignores that P is 40% of sales.<br><br>The weighted average is the benchmark for “high” vs “low” margin in the grid.'},

 {t:'urban',tag:'case',diff:'medium',scene:S_UB,
  q:'<b>Q2.</b> Classify brands P, Q, R and S on the sales-and-margin grid.',
  opts:['P traffic · Q destination · R service · S image',
        'P destination · Q traffic · R image · S service',
        'P traffic · Q destination · R image · S service',
        'P destination · Q service · R traffic · S image'],
  why:'<div class="work">     Share   Margin vs 19.4%   Role\nP    40%     12%  low          traffic      (high sales, low margin)\nQ    25%     22%  high         destination  (high sales, high margin)\nR     6%     28%  high         service      (low sales, high margin)\nS     4%      9%  low          image        (low sales, low margin)</div>The leader is a traffic brand here because its margin is thin; the No. 2 is the destination — exactly the pattern the framework predicts.<br><br>Classify on both axes; share alone does not decide the role.'},

 {t:'urban',tag:'case',diff:'medium',scene:S_UB,
  q:'<b>Q3.</b> How should UrbanBasket handle brand S on the shelf?',
  opts:['Low price focus, no promotions, top sellers only, low-footfall placement',
        'Highly competitive price, intense promotions and disproportionate space',
        'Medium price, promotions only in key events, normal placement and PL focus',
        'Medium-to-high price, frequent promotions, placement in line with sales'],
  why:'<b>Image brands are kept for choice, so the retailer spends as little on them as possible.</b><div class="work">Image → price: low · promotions: none · portfolio: top sellers only,\n        no premium packs · placement: worst areas, least footfall</div>The other options are the destination, service and traffic lever sets.<br><br>Do not delist an image brand reflexively — it completes the assortment for some shoppers.'},

 {t:'urban',tag:'case',diff:'hard',trap:true,scene:S_UB,
  q:'<b>Q4.</b> UrbanBasket moves 5 points of share from brand P to its private label, with category sales unchanged. What happens to category margin — and what is the risk?',
  opts:['Up about 1.15 pts to ~20.5%; the risk is losing traffic that brand P brings in',
        'Up about 1.15 pts to ~20.5%; there is no risk, since the sales stay the same',
        'Up about 23 pts to ~42%; the risk is that the private label quickly runs out of stock',
        'Down about 1.15 pts to ~18.2%; private label dilutes the category margin'],
  why:'<b>A mix shift changes margin by share moved × margin gap.</b><div class="work">5% × (35% − 12%) = 1.15 pts\n19.39% → 20.54%</div>23 points is the margin gap itself, not the effect. The trap is “sales unchanged”: P is the traffic brand, so shrinking it can cut footfall — and then total sales are not unchanged.<br><br>Grow PL where it does not starve the traffic driver.'},

 {t:'urban',tag:'case',diff:'hard',scene:S_UB,
  q:'<b>Q5.</b> A Republic Day promotion on brand P lifts its sales from ₹50 lakh to ₹80 lakh for the event. Half the uplift is cannibalised from other brands. UrbanBasket funds ₹3 lakh. What is the ROI at P’s 12% margin?',
  opts:['−40% — the event loses money on P’s thin margin',
        '20% — a modest but positive return on the spend',
        '−60% — every rupee of uplift is lost to rivals',
        '140% — the whole ₹30 lakh uplift counts as gain'],
  why:'<div class="work">Uplift              = 80 − 50       = ₹30 lakh\nNet of 50% cannibal = ₹15 lakh\nIncremental GP      = 15 × 12%      = ₹1.8 lakh\nROI                 = (1.8 − 3) ÷ 3 = −40%</div>Ignoring cannibalisation gives 30 × 12% = 3.6 → 20%. It is worse still if the cannibalised sales came from the 35% private label, since the retailer loses higher-margin sales.<br><br>Traffic brands justify promotions through footfall and basket, not their own GP — so measure the basket too.'},

 {t:'urban',tag:'case',diff:'medium',scene:S_UB,
  q:'<b>Q6.</b> Which brand should UrbanBasket partner with to grow the whole category, and how?',
  opts:['Q, the destination brand — premium and large packs, strategic space, sharp prices',
        'S, the image brand — move it into the best aisle space and promote it heavily',
        'R, the service brand — make it the anchor of the category with the most facings',
        'Private label only — delist the national brands and give PL all the category space'],
  why:'<b>Partner the leading brands to grow the category; use the destination brand to make the aisle a reason to visit.</b><div class="work">Destination levers: highly competitive price · high-intensity promotions\n                    large choice skewed to premium and large packs\n                    strategic, disproportionate space; niche sub-categories</div>Delisting national brands destroys traffic and choice. Image and service brands are not built to anchor a category.<br><br>The CM’s job: sales, profit and PL share together, not one at the expense of the others.'}
]);

/* =========================================================================
   LESSONS — merged earlier lessons + new ones
   ========================================================================= */
function merged(ids,meta,checks){
  return Object.assign({},meta,{
    steps:ids.reduce((a,id)=>a.concat(OLD_LESSONS[id].steps),[]),
    check:checks});
}
const reCheck=(id,i,t)=>Object.assign({},OLD_LESSONS[id].check[i],{t:t});

const LESSONS={
 channels:merged(['ot','supply'],{eyebrow:'Section 01',title:'Channels & Supply Basics',sub:'OT vs GT vs e-com, and how stock reaches each'},
   [reCheck('ot',0,'channels'),reCheck('supply',1,'channels')]),
 shopper:merged(['shopper','layout','category'],{eyebrow:'Section 02',title:'Shopper, Layout & Category',sub:'who buys, how the floor guides them, and what the category is worth'},
   [reCheck('shopper',0,'shopper'),reCheck('layout',0,'shopper')]),
 formats:merged(['construct','specialty','org'],{eyebrow:'Section 03',title:'Formats & Teams',sub:'who decides, what format, and who sits across the table'},
   [reCheck('construct',0,'formats'),reCheck('org',0,'formats')]),

 scm:{eyebrow:'Section 04', title:'Supply Chain Operations', sub:'from purchase order to shelf, and the two ways to supply a store',
  steps:[
   {type:'table', title:'The supply chain', head:['Stage','Job'],
    rows:[['Procurement','Source quality at the right cost'],['Manufacturing','Produce efficiently'],['Warehousing','Store smartly'],['Distribution','Deliver on time'],['Retail & shopper','Ensure availability at the shelf']]},
   {type:'table', title:'PO to shelf', head:['#','Step','What happens'],
    rows:[['1','Purchase order','Raised on forecast / demand plan'],['2','Supplier confirmation','Quantity, date, terms'],['3','Delivery appointment','Date and time slot at the DC'],
          ['4','Goods inward','Transport, gate entry, receiving'],['5','GRN','Verify quantity and quality; record accepted quantity'],['6','Put-away & stock update','Move to storage; make available for sale']]},
   {type:'text', title:'GRN and three-way matching',
    body:'The GRN is the buyer’s formal confirmation that goods were received and checked against the PO — SKU, quantity, batch, expiry, damage. <b>PO + GRN + invoice = three-way match before payment.</b><div class="work">PO 1,000 · delivered 1,000 · damaged 20 → GRN 980 → pay for 980</div>A WMS runs the DC: receiving → GRN → put-away → inventory by SKU/batch/expiry/location → pick & pack → dispatch.'},
   {type:'table', title:'DC supply vs direct store supply', head:['','DC supply','Direct store supply'],
    rows:[['Delivery point','Retailer’s DC','Each store'],['Transport','Bulk','Many small drops'],['Replenishment','Retailer-managed','Supplier/distributor-managed'],
          ['Supplier cost','Lower per unit','Higher per unit'],['Retailer control','Greater','Less'],['Best for','Large chains, high-volume categories','Small networks, special requirements']]},
   {type:'table', title:'Where inventory sits', head:['Metric','Measures'],
    rows:[['Store inventory','Stock on shelf and in the backroom'],['DC inventory','Stock at the retailer’s warehouse'],['Network inventory','Store + DC'],
          ['Days of inventory','How long stock supports demand'],['On-shelf availability','Is it on the shelf when shoppers look?'],['Stock-out rate','How often it is unavailable'],['Inventory turns','How fast stock sells and is replenished']]},
   {type:'watch', title:'Traps in this section',
    body:'GRN comes <b>after</b> goods inward, never before. Payment follows the GRN, not the invoice. Full DC + empty shelves = an allocation problem, not a supply problem. OSA is a shelf measure; fill rate is a supply measure.'}],
  check:[
   {t:'scm',tag:'calc',diff:'easy',
    q:'PO 2,000 units; delivered 2,000; rejected 50. GRN quantity?',
    opts:['1,950','2,000','2,050','50'],
    why:'GRN records the accepted quantity: 2,000 delivered − 50 rejected = 1,950. Payment follows PO + GRN + invoice matching.'},
   {t:'scm',tag:'concept',diff:'easy',
    q:'Which supply model gives the retailer more control over allocation to stores?',
    opts:['DC supply','Direct store supply','Both equally','Neither'],
    why:'DC supply consolidates stock centrally, so the retailer decides how much each store gets; direct supply hands that to suppliers.'}]},

 inventory:{eyebrow:'Section 05', title:'Inventory Metrics & Forecasting', sub:'every formula you need, with a number',
  steps:[
   {type:'table', title:'Formula sheet', head:['Metric','Formula','Example'],
    rows:[['Fill rate','Supplied ÷ ordered × 100','950 ÷ 1,000 = 95%'],['PO fill rate','POs delivered in full ÷ total POs','90 ÷ 100 = 90%'],
          ['OTIF','On time and in full ÷ total orders','150 ÷ 200 = 75%'],['OSA','% outlets with the product in stock','850 ÷ 1,000 = 85%'],
          ['Lead time','Delivery date − order date','1 Oct → 5 Oct = 4 days'],['Forecast accuracy','1 − |F − A| ÷ A','1 − 200 ÷ 1,000 = 80%'],
          ['Inventory turnover','COGS ÷ average inventory','1,404 ÷ 66 = 21.27'],['Days of inventory','Average inventory ÷ COGS × 365','= 365 ÷ turns'],
          ['Reorder point','(Lead time + safety days) × daily demand','(6 + 3) × 1,000 = 9,000'],['EOQ','√(2DS ÷ H)','√(2·36,000·500 ÷ 10) ≈ 1,897']]},
   {type:'calc', calc:'mtcase', title:'Live: the case exhibit calculator'},
   {type:'table', title:'Forecasting techniques', head:['Technique','How','Example (900, 1,100, 1,000)'],
    rows:[['Moving average','Simple mean of the last n periods','1,000'],['Weighted average','More weight on recent periods','0.2/0.3/0.5 → 1,010'],
          ['Exponential smoothing','F(new) = F(old) + α × (A − F(old))','α 0.3, F 950, A 1,000 → 965'],['Trend analysis','Fit the direction over time','—']]},
   {type:'calc', calc:'fc', title:'Live: three forecasts side by side'},
   {type:'watch', title:'Traps in this section',
    body:'Turnover on <b>sales</b> over inventory at <b>cost</b> mixes bases. Forecast error divided by the <b>forecast</b> is the wrong denominator. OTIF needs both conditions at once. Quantity fill rate (units) ≠ PO fill rate (whole POs in full).'}],
  check:[
   {t:'inventory',tag:'calc',diff:'easy',
    q:'Turnover is 18.25 times. Days of inventory?',
    opts:['20 days','18 days','365 days','5 days'],
    why:'Days of inventory = 365 ÷ turnover = 365 ÷ 18.25 = 20 days. The two are the same measure seen from opposite sides.'},
   {t:'inventory',tag:'calc',diff:'easy',
    q:'Lead time 4 days, safety stock 2 days, daily demand 500. Reorder point?',
    opts:['3,000','2,000','1,000','2,500'],
    why:'(4 + 2) × 500 = 3,000 units. 2,000 leaves out safety stock; 1,000 is the safety stock alone.'}]},

 cm:{eyebrow:'Section 06', title:'Category Management', sub:'what the category manager drives, and how brands are cast',
  steps:[
   {type:'text', title:'The CM’s job',
    body:'Category management bundles products so they can be managed effectively. The CM drives <b>sales, profits and the share of private label</b>, deciding: which assortment, what share of shelf, the planogram (a schematic for displaying merchandise to maximise sales), how to partner leader and challenger brands, how to pull traffic into the aisle, and how to lift AOV and conversion. Tools: data and insight, partnering the leader to grow the category, shopper research.'},
   {type:'table', title:'Five retailer objectives', head:['#','Objective','Measured by'],
    rows:[['1','Sales','GMV'],['2','Profitability','GMROI, vendor margin'],['3','Basket','AOV'],['4','Traffic','Customers, conversion, retention'],['5','Inventory','Turnover']]},
   {type:'formula', pill:'GMROI = annual gross profit ÷ average inventory at cost',
    legend:[['Example','₹396 lakh ÷ ₹66 lakh = 6.0'],['Link','GMROI = turnover × GM ÷ (1 − GM)']]},
   {type:'table', title:'Brand roles and levers', head:['Role','Sales / margin','Price','Promotions','Portfolio','Placement'],
    rows:[['Destination','High / high','Highly competitive','High intensity','Large choice; premium, large packs','Strategic, disproportionate space'],
          ['Traffic','High / low','Medium–high','High frequency','In line with market','In line with sales; high-margin items highlighted'],
          ['Service','Low / high','Medium','Few, key events only','Narrow; PL focus','Normal; extra only in season'],
          ['Image','Low / low','Low','None','Top sellers only','Worst areas, least footfall']]},
   {type:'calc', calc:'promo', title:'Live: promotional ROI after cannibalisation'},
   {type:'table', title:'Private label and events', head:['Topic','Points'],
    rows:[['Private label','Value option; retailer profitability; store loyalty; control over supply and inventory'],
          ['MT events','Republic Day, Independence Day, Diwali (e-com: festive sales, Republic Day, Prime Day)'],
          ['Why events','Acquisition engines; break habit; build pantry (AOV); short, intense bursts; then consolidation']]},
   {type:'watch', title:'Traps in this section',
    body:'A leader with thin margin is <b>traffic</b>, not destination. Margin mix shifts move the average by share × margin gap. Promo ROI uses <b>gross profit</b> on <b>net</b> incremental sales.'}],
  check:[
   {t:'cm',tag:'concept',diff:'easy',
    q:'High sales and high margin make a brand…',
    opts:['Destination','Traffic brand','Service brand','Image brand'],
    why:'Destination brands deliver both, usually the leader or No. 2 in a competitive category, and get the sharpest levers.'},
   {t:'cm',tag:'calc',diff:'easy',
    q:'Annual GP ₹120 lakh; average inventory at cost ₹30 lakh. GMROI?',
    opts:['4.0','0.25','3.0','40'],
    why:'GMROI = annual gross profit ÷ average inventory at cost = 120 ÷ 30 = 4.0.'}]},

 maxmart:{eyebrow:'Case 1', title:'MaxMart — the worked solution', sub:'the course case, step by step',
  steps:[
   {type:'table', title:'Exhibit', head:['Item','Value'],
    rows:[['Monthly sales / GM','₹150 lakh / 22%'],['Average inventory at cost','₹66 lakh'],['Selling area','7,500 sq ft'],['Daily network demand','1,000 cases'],
          ['RDC / store inventory','14,000 / 16,000 cases'],['PO / delivered / GRN','15,000 / 13,800 / 13,248'],['Lead time / safety','6 / 3 days'],
          ['Promo baseline / actual / spend','₹24 L / ₹36 L / ₹1.2 L'],['Cannibalisation','30% of incremental']]},
   {type:'table', title:'Answers', head:['Q','Working','Answer'],
    rows:[['1','GP 33 L ÷ 7,500 = ₹440; COGS 1,404 L ÷ 66 = 21.27','B'],['2','14,000 ÷ 1,000 = 14 days; (6 + 3) × 1,000 = 9,000','A'],
          ['3','13,800 ÷ 15,000 = 92%; 13,248 ÷ 13,800 = 96%; 13,248 ÷ 15,000 = 88.32%','A'],['4','(12 − 3.6) × 22% = 1.848; (1.848 − 1.2) ÷ 1.2 = 54%','C'],
          ['5','1,404 ÷ 59.4 = 23.64','C']]},
   {type:'watch', title:'Where marks are lost',
    body:'Sales instead of COGS in turnover (27.3). Store cover instead of RDC cover (16). Swapping fill rate and GRN acceptance. Skipping cannibalisation (120%) or using sales instead of GP (600%). Treating a 10% inventory cut as a 10% turns lift.'}],
  check:[
   {t:'maxmart',tag:'calc',diff:'easy',
    q:'If MaxMart’s safety stock rose to 5 days, the reorder point would be…',
    opts:['11,000 cases','9,000 cases','5,000 cases','14,000 cases'],
    why:'(6 + 5) × 1,000 = 11,000 cases — still below the 14,000 in the RDC, so no PO is due yet.'},
   {t:'maxmart',tag:'calc',diff:'easy',
    q:'If cannibalisation were 0%, MaxMart’s promo ROI would be…',
    opts:['120%','54%','0%','600%'],
    why:'12 × 22% = 2.64 lakh GP; (2.64 − 1.2) ÷ 1.2 = 120%. Cannibalisation is what pulls it down to 54%.'}]},

 freshkart:{eyebrow:'Case 2', title:'FreshKart — same exhibit, new numbers', sub:'practise the method until it is automatic',
  steps:[
   {type:'table', title:'Method card', head:['Ask','Formula','FreshKart'],
    rows:[['GP per sq ft','Sales × GM ÷ area','22.5 L ÷ 5,000 = ₹450'],['Turnover','Sales × (1 − GM) × 12 ÷ inventory','810 ÷ 45 = 18.0'],
          ['RDC cover','RDC stock ÷ daily demand','9,600 ÷ 800 = 12 days'],['Reorder point','(LT + safety) × daily demand','9 × 800 = 7,200'],
          ['Fill / GRN / overall','Delivered ÷ PO · accepted ÷ delivered · accepted ÷ PO','90% · 97% · 87.3%'],
          ['Promo ROI','(net incremental × GM − spend) ÷ spend','(3.6 × 25% − 0.9) ÷ 0.9 = 0%'],
          ['Target turns','Inventory = COGS ÷ turns','810 ÷ 20 = 40.5 → frees ₹4.5 L']]},
   {type:'calc', calc:'mtcase', title:'Live: load FreshKart’s numbers here'},
   {type:'watch', title:'The judgement layer',
    body:'Numbers answer “what”; marks also come from “so what”. FreshKart’s supplier problem is <b>short shipping</b> (90%), not damage (97% accepted). Its promotion only breaks even. 60% of network stock sits in stores — the risk is expiry, not stock-outs.'}],
  check:[
   {t:'freshkart',tag:'calc',diff:'easy',
    q:'FreshKart’s days of inventory (value basis)?',
    opts:['About 20 days','30 days of cover','12 days','18 days'],
    why:'DOI = 45 ÷ 810 × 365 ≈ 20.3 days (= 365 ÷ 18). 30 days is network cover in cases, a different measure.'},
   {t:'freshkart',tag:'calc',diff:'easy',
    q:'Max sales on FreshKart’s best day is 1,000 cases. Using (max − avg) × lead time, safety stock is…',
    opts:['1,000 cases','5,000 cases','4,000 cases','200 cases'],
    why:'(1,000 − 800) × 5 = 1,000 cases — 1.25 days, well under the 4 days FreshKart holds.'}]},

 urban:{eyebrow:'Case 3', title:'UrbanBasket — brand roles and margin mix', sub:'category management with numbers',
  steps:[
   {type:'formula', pill:'Category margin = Σ (share × brand margin)',
    legend:[['UrbanBasket','19.39% weighted vs 20.7% simple average'],['Mix shift','Δ margin = share moved × (new margin − old margin)']]},
   {type:'table', title:'The grid applied', head:['Brand','Share','Margin','Role','Handling'],
    rows:[['P','40%','12%','Traffic','Competitive price, frequent promos; protect footfall'],['Q','25%','22%','Destination','Partner to grow the category; premium, large packs, prime space'],
          ['R','6%','28%','Service','Normal placement; promos at key events'],['S','4%','9%','Image','Top sellers only; no promos; low-footfall space'],['PL','15%','35%','Retailer’s own','Grow without starving the traffic brand']]},
   {type:'watch', title:'Traps in this section',
    body:'Use the <b>weighted</b> average as the margin benchmark. A mix shift towards PL lifts margin only if sales hold — and shrinking the traffic brand can make them fall. Promotions on thin-margin traffic brands rarely pay on their own GP; judge them on footfall and basket.'}],
  check:[
   {t:'urban',tag:'calc',diff:'easy',
    q:'Moving 3 pts of share from a 12%-margin brand to a 35%-margin PL changes category margin by…',
    opts:['+0.69 pts','+23 pts','+3 pts','−0.69 pts'],
    why:'3% × (35% − 12%) = 0.69 percentage points, if total sales hold.'},
   {t:'urban',tag:'concept',diff:'easy',
    q:'UrbanBasket’s brand R (6% share, 28% margin) is a…',
    opts:['Service brand','Image brand','Traffic brand','Destination brand'],
    why:'Low sales and high margin = service: often a challenger or new launch offering the retailer a better margin.'}]}
};

/* =========================================================================
   CALCS
   ========================================================================= */
const lk=n=>(+n).toLocaleString('en-IN',{maximumFractionDigits:2});
const CALCS=Object.assign({},OLD_CALCS,{
 mtcase:{
  hint:'Enter a case exhibit. All money in ₹ lakh; quantities in cases.',
  ins:[{k:'s',nm:'Monthly sales (₹ lakh)',type:'number',def:150},{k:'g',nm:'Gross margin %',type:'number',def:22},
       {k:'i',nm:'Avg inventory at cost (₹ lakh)',type:'number',def:66},{k:'a',nm:'Selling area (sq ft)',type:'number',def:7500},
       {k:'d',nm:'Daily network demand (cases)',type:'number',def:1000},{k:'r',nm:'RDC inventory (cases)',type:'number',def:14000},
       {k:'st',nm:'Store inventory (cases)',type:'number',def:16000},{k:'lt',nm:'Lead time (days)',type:'number',def:6},
       {k:'ss',nm:'Safety stock (days)',type:'number',def:3}],
  run:v=>{
    if(!+v.i||!+v.d||!+v.a)return 'Inventory, area and daily demand must be above zero.';
    const gp=v.s*v.g/100, cogs=v.s*(1-v.g/100)*12, t=cogs/v.i, rop=(+v.lt + +v.ss)*v.d;
    const due=v.r<=rop?['bad','RDC at or below the reorder point: raise a PO now.']:['ok','RDC is '+lk(v.r-rop)+' cases ('+lk((v.r-rop)/v.d)+' days) above the reorder point.'];
    return 'GP / sq ft      = '+lk(gp)+' L ÷ '+lk(v.a)+' = ₹'+lk(gp*1e5/v.a)+
      '\nTurnover        = '+lk(cogs)+' ÷ '+lk(v.i)+' = '+t.toFixed(2)+'×   (DOI '+(365/t).toFixed(1)+' days)'+
      '\nGMROI           = '+lk(gp*12)+' ÷ '+lk(v.i)+' = '+(gp*12/v.i).toFixed(2)+
      '\nRDC cover       = '+lk(v.r/v.d)+' days · network '+lk((+v.r + +v.st)/v.d)+' days'+
      '\nReorder point   = ('+v.lt+' + '+v.ss+') × '+lk(v.d)+' = '+lk(rop)+
      '<span class="big">₹'+lk(gp*1e5/v.a)+' / sq ft · '+t.toFixed(2)+' turns</span><span class="vd '+due[0]+'">'+due[1]+'</span>';}},
 promo:{
  hint:'Promotional ROI, net of cannibalisation. ₹ lakh.',
  ins:[{k:'b',nm:'Baseline sales',type:'number',def:24},{k:'a',nm:'Actual promo sales',type:'number',def:36},
       {k:'c',nm:'Cannibalisation %',type:'range',min:0,max:90,step:5,def:30},{k:'g',nm:'Gross margin %',type:'number',def:22},
       {k:'x',nm:'Promotional investment',type:'number',def:1.2}],
  run:v=>{
    if(!+v.x)return 'Investment must be above zero.';
    const inc=v.a-v.b, net=inc*(1-v.c/100), gp=net*v.g/100, roi=(gp-v.x)/v.x*100, raw=(inc*v.g/100-v.x)/v.x*100;
    const d=roi>=0?['ok','Pays back after cannibalisation.']:['bad','Loses money once cannibalisation is stripped out.'];
    return 'Incremental = '+lk(v.a)+' − '+lk(v.b)+' = '+lk(inc)+'\nNet         = '+lk(inc)+' × '+(100-v.c)+'% = '+lk(net)+'\nGP          = '+lk(net)+' × '+v.g+'% = '+lk(gp)+
      '<span class="big">ROI '+roi.toFixed(0)+'%</span><span class="vd '+d[0]+'">'+d[1]+'</span><span class="vd">Without the cannibalisation adjustment it would read '+raw.toFixed(0)+'%.</span>';}},
 fc:{
  hint:'Three months of sales, most recent last.',
  ins:[{k:'m1',nm:'Month 1',type:'number',def:900},{k:'m2',nm:'Month 2',type:'number',def:1100},{k:'m3',nm:'Month 3 (latest)',type:'number',def:1000},
       {k:'f',nm:'Last forecast (for smoothing)',type:'number',def:950},{k:'al',nm:'α (smoothing)',type:'range',min:0.1,max:0.9,step:0.1,def:0.3}],
  run:v=>{
    const sma=(+v.m1 + +v.m2 + +v.m3)/3, wma=v.m1*0.2+v.m2*0.3+v.m3*0.5, es=+v.f + v.al*(v.m3-v.f);
    return 'Moving average   = '+sma.toFixed(0)+'\nWeighted (.2/.3/.5) = '+wma.toFixed(0)+'\nExp. smoothing   = '+lk(v.f)+' + '+v.al+' × ('+lk(v.m3)+' − '+lk(v.f)+') = '+es.toFixed(0)+
      '<span class="big">'+sma.toFixed(0)+' · '+wma.toFixed(0)+' · '+es.toFixed(0)+'</span><span class="vd">Higher α reacts faster to the latest month.</span>';}}
});

/* =========================================================================
   CMAP
   ========================================================================= */
const CMAP=[
 {h:'★ Case formulas',
  note:'The five MaxMart questions, and every formula behind them.',
  rows:[
   ['GP per sq ft','<b>Sales × GM ÷ selling area</b>','150 L × 22% ÷ 7,500 = ₹440'],
   ['Inventory turnover','<b>Annual COGS ÷ avg inventory at cost</b>','150 × 78% × 12 ÷ 66 = 21.27'],
   ['Days of inventory','<b>Inventory ÷ COGS × 365 = 365 ÷ turns</b>','17.2 days'],
   ['GMROI','<b>Annual GP ÷ avg inventory at cost</b>','396 ÷ 66 = 6.0'],
   ['Cover','<b>Stock ÷ daily demand</b>','RDC 14 days · network 30'],
   ['Reorder point','<b>(Lead time + safety days) × daily demand</b>','(6 + 3) × 1,000 = 9,000'],
   ['Fill · GRN · overall','<b>Delivered ÷ PO · accepted ÷ delivered · accepted ÷ PO</b>','92% · 96% · 88.32%'],
   ['Promo ROI','<b>((actual − base) × (1 − cannibal) × GM − spend) ÷ spend</b>','(8.4 × 22% − 1.2) ÷ 1.2 = 54%'],
   ['Mix shift','<b>Share moved × margin gap</b>','5% × 23 pts = +1.15 pts'],
   ['OTIF · OSA','On time and in full ÷ orders · outlets in stock ÷ outlets','150/200 = 75% · 85%'],
   ['Forecast accuracy','<b>1 − |F − A| ÷ A</b>','80%'],
   ['EOQ','<b>√(2DS ÷ H)</b>','≈ 1,897']]},
 {h:'Supply chain operations',
  rows:[['PO to shelf','PO → confirm → appointment → inward → GRN → put-away'],
        ['Three-way match','PO + GRN + invoice before payment','pay on GRN quantity'],
        ['WMS','Receive → GRN → put-away → manage → pick & pack → dispatch'],
        ['DC vs direct','DC: bulk, lower unit cost, more control','direct: store drops, supplier-managed']]},
 {h:'Category management',
  rows:[['CM drives','Sales · profits · PL share'],['Retailer objectives','GMV · GMROI / vendor margin · AOV · traffic · turns'],
        ['Destination · traffic','High/high: sharp price, intense promos, prime space','high/low: frequent promos, in line with market'],
        ['Service · image','Low/high: few promos, PL focus','low/low: no promos, worst space'],
        ['Private label','Value · profit · loyalty · supply control'],['Events','Republic Day, Independence Day, Diwali — acquisition, pantry, AOV']]}
].concat(OLD_CMAP.slice(1,-1)).concat([
 {h:'Exam day',
  rows:[['Formula first','Write it, then fill in numbers'],['Cost basis','COGS and inventory at cost; never sales over cost'],
        ['Flows vs balances','Annualise sales and COGS; never inventory'],['Three denominators','PO, delivered, accepted'],
        ['Then the “so what”','Short-shipping vs damage; allocation vs supply; traffic vs margin']]}
]);
