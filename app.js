/* DBF Nakliyat — ortak script (TR + EN sayfaları) */

/* ---------- Mobil menü ---------- */
function menuAc(){ document.getElementById('mobilmenu').classList.toggle('acik'); }
function menuKapat(){ document.getElementById('mobilmenu').classList.remove('acik'); }

/* ---------- Karanlık mod ---------- */
function temaUygula(t){
  if(t === 'koyu'){ document.documentElement.setAttribute('data-tema','koyu'); }
  else{ document.documentElement.removeAttribute('data-tema'); }
}
function temaDegistir(){
  var koyu = document.documentElement.getAttribute('data-tema') === 'koyu';
  var yeni = koyu ? 'acik' : 'koyu';
  temaUygula(yeni);
  try{ localStorage.setItem('dbf-tema', yeni); }catch(e){}
}
(function(){
  var kayit = null;
  try{ kayit = localStorage.getItem('dbf-tema'); }catch(e){}
  if(kayit){ temaUygula(kayit); }
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches){ temaUygula('koyu'); }
})();

/* ---------- 81 il koordinatları (yaklaşık il merkezi) ---------- */
var ILLER = {
  "adana":[37.00,35.32],"adiyaman":[37.76,38.28],"afyonkarahisar":[38.76,30.54],"agri":[39.72,43.05],
  "amasya":[40.65,35.83],"ankara":[39.93,32.86],"antalya":[36.90,30.70],"artvin":[41.18,41.82],
  "aydin":[37.85,27.85],"balikesir":[39.65,27.89],"bilecik":[40.15,29.98],"bingol":[38.88,40.50],
  "bitlis":[38.40,42.11],"bolu":[40.74,31.61],"burdur":[37.72,30.29],"bursa":[40.19,29.06],
  "canakkale":[40.15,26.41],"cankiri":[40.60,33.62],"corum":[40.55,34.95],"denizli":[37.78,29.09],
  "diyarbakir":[37.91,40.24],"edirne":[41.68,26.56],"elazig":[38.68,39.22],"erzincan":[39.75,39.49],
  "erzurum":[39.90,41.27],"eskisehir":[39.78,30.52],"gaziantep":[37.07,37.38],"giresun":[40.91,38.39],
  "gumushane":[40.46,39.48],"hakkari":[37.58,43.74],"hatay":[36.20,36.16],"isparta":[37.76,30.55],
  "mersin":[36.80,34.63],"istanbul":[41.01,28.98],"izmir":[38.42,27.14],"kars":[40.60,43.10],
  "kastamonu":[41.38,33.78],"kayseri":[38.73,35.49],"kirklareli":[41.73,27.22],"kirsehir":[39.15,34.16],
  "kocaeli":[40.85,29.88],"konya":[37.87,32.48],"kutahya":[39.42,29.98],"malatya":[38.35,38.31],
  "manisa":[38.61,27.43],"kahramanmaras":[37.58,36.93],"mardin":[37.31,40.74],"mugla":[37.22,28.36],
  "mus":[38.73,41.49],"nevsehir":[38.62,34.71],"nigde":[37.97,34.68],"ordu":[40.98,37.88],
  "rize":[41.02,40.52],"sakarya":[40.77,30.40],"samsun":[41.29,36.33],"siirt":[37.93,41.94],
  "sinop":[42.03,35.15],"sivas":[39.75,37.02],"tekirdag":[40.98,27.51],"tokat":[40.31,36.55],
  "trabzon":[41.00,39.72],"tunceli":[39.11,39.55],"sanliurfa":[37.16,38.79],"usak":[38.68,29.41],
  "van":[38.49,43.38],"yozgat":[39.82,34.81],"zonguldak":[41.45,31.79],"aksaray":[38.37,34.03],
  "bayburt":[40.26,40.22],"karaman":[37.18,33.22],"kirikkale":[39.85,33.51],"batman":[37.88,41.13],
  "sirnak":[37.52,42.46],"bartin":[41.64,32.34],"ardahan":[41.11,42.70],"igdir":[39.92,44.04],
  "yalova":[40.65,29.27],"karabuk":[41.20,32.63],"kilis":[36.72,37.12],"osmaniye":[37.07,36.25],
  "duzce":[40.84,31.16]
};
var IL_ADLARI = {
  "adana":"Adana","adiyaman":"Adıyaman","afyonkarahisar":"Afyonkarahisar","agri":"Ağrı","amasya":"Amasya",
  "ankara":"Ankara","antalya":"Antalya","artvin":"Artvin","aydin":"Aydın","balikesir":"Balıkesir",
  "bilecik":"Bilecik","bingol":"Bingöl","bitlis":"Bitlis","bolu":"Bolu","burdur":"Burdur","bursa":"Bursa",
  "canakkale":"Çanakkale","cankiri":"Çankırı","corum":"Çorum","denizli":"Denizli","diyarbakir":"Diyarbakır",
  "edirne":"Edirne","elazig":"Elazığ","erzincan":"Erzincan","erzurum":"Erzurum","eskisehir":"Eskişehir",
  "gaziantep":"Gaziantep","giresun":"Giresun","gumushane":"Gümüşhane","hakkari":"Hakkari","hatay":"Hatay",
  "isparta":"Isparta","mersin":"Mersin","istanbul":"İstanbul","izmir":"İzmir","kars":"Kars",
  "kastamonu":"Kastamonu","kayseri":"Kayseri","kirklareli":"Kırklareli","kirsehir":"Kırşehir",
  "kocaeli":"Kocaeli","konya":"Konya","kutahya":"Kütahya","malatya":"Malatya","manisa":"Manisa",
  "kahramanmaras":"Kahramanmaraş","mardin":"Mardin","mugla":"Muğla","mus":"Muş","nevsehir":"Nevşehir",
  "nigde":"Niğde","ordu":"Ordu","rize":"Rize","sakarya":"Sakarya","samsun":"Samsun","siirt":"Siirt",
  "sinop":"Sinop","sivas":"Sivas","tekirdag":"Tekirdağ","tokat":"Tokat","trabzon":"Trabzon",
  "tunceli":"Tunceli","sanliurfa":"Şanlıurfa","usak":"Uşak","van":"Van","yozgat":"Yozgat",
  "zonguldak":"Zonguldak","aksaray":"Aksaray","bayburt":"Bayburt","karaman":"Karaman",
  "kirikkale":"Kırıkkale","batman":"Batman","sirnak":"Şırnak","bartin":"Bartın","ardahan":"Ardahan",
  "igdir":"Iğdır","yalova":"Yalova","karabuk":"Karabük","kilis":"Kilis","osmaniye":"Osmaniye","duzce":"Düzce"
};

function ilNormalize(s){
  s = (s||'').trim().toLowerCase();
  var harfler = {"ç":"c","ğ":"g","ı":"i","i̇":"i","ö":"o","ş":"s","ü":"u","â":"a","î":"i","û":"u","İ":"i","I":"i"};
  s = s.replace(/[çğıöşüâîûİI]/g, function(h){ return harfler[h] || h; });
  s = s.replace(/[^a-z]/g, '');
  return ILLER[s] ? s : null;
}

function mesafeKm(a, b){
  var R = 6371, d2r = Math.PI/180;
  var dLat = (b[0]-a[0])*d2r, dLon = (b[1]-a[1])*d2r;
  var x = Math.sin(dLat/2)*Math.sin(dLat/2) +
          Math.cos(a[0]*d2r)*Math.cos(b[0]*d2r)*Math.sin(dLon/2)*Math.sin(dLon/2);
  var kus = 2*R*Math.asin(Math.sqrt(x));
  return kus * 1.3; /* karayolu düzeltme katsayısı */
}

window.sonMesafe = '';
function mesafeGuncelle(){
  var kutu = document.getElementById('mesafe');
  var yazi = document.getElementById('mesafe-yazi');
  if(!kutu || !yazi) return;
  var a = ilNormalize(document.getElementById('h-nereden').value);
  var b = ilNormalize(document.getElementById('h-nereye').value);
  if(a && b && a !== b){
    var km = Math.round(mesafeKm(ILLER[a], ILLER[b]) / 10) * 10;
    var saat = km / 70;
    var s = Math.floor(saat), dk = Math.round((saat - s) * 60 / 15) * 15;
    if(dk === 60){ s += 1; dk = 0; }
    var sure = s + (window.SAYFA_DIL === 'en' ? ' h' : ' sa') + (dk ? ' ' + dk + (window.SAYFA_DIL === 'en' ? ' min' : ' dk') : '');
    var metin = (window.SAYFA_DIL === 'en')
      ? IL_ADLARI[a] + ' → ' + IL_ADLARI[b] + ' ≈ ' + km + ' km · ~' + sure + ' by road (est.)'
      : IL_ADLARI[a] + ' → ' + IL_ADLARI[b] + ' ≈ ' + km + ' km · ~' + sure + ' karayolu (tahmini)';
    yazi.textContent = metin;
    window.sonMesafe = IL_ADLARI[a] + ' - ' + IL_ADLARI[b] + ' ~' + km + ' km';
    kutu.hidden = false;
  } else {
    kutu.hidden = true;
    window.sonMesafe = '';
  }
}

/* ---------- Sayfa hazır ---------- */
document.addEventListener('DOMContentLoaded', function(){
  /* il datalist doldur */
  var dl = document.getElementById('iller');
  if(dl){
    Object.keys(IL_ADLARI).sort(function(a,b){ return IL_ADLARI[a].localeCompare(IL_ADLARI[b], 'tr'); })
      .forEach(function(k){
        var o = document.createElement('option');
        o.value = IL_ADLARI[k];
        dl.appendChild(o);
      });
  }
  var n1 = document.getElementById('h-nereden'), n2 = document.getElementById('h-nereye');
  if(n1 && n2){
    n1.addEventListener('input', mesafeGuncelle);
    n2.addEventListener('input', mesafeGuncelle);
  }

  /* kaydırma animasyonu */
  var azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ogeler = document.querySelectorAll('.reveal');
  if(azalt || !('IntersectionObserver' in window)){
    ogeler.forEach(function(o){ o.classList.add('gorunur'); });
  } else {
    var izleyici = new IntersectionObserver(function(girdiler){
      girdiler.forEach(function(g){
        if(g.isIntersecting){ g.target.classList.add('gorunur'); izleyici.unobserve(g.target); }
      });
    }, {threshold:.12});
    ogeler.forEach(function(o){ izleyici.observe(o); });
  }
});

/* ---------- PWA servis çalışanı ---------- */
if('serviceWorker' in navigator){
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('sw.js').catch(function(){});
  });
}

/* ---------- Yukarı çık ---------- */
function yukariCik(){
  var azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0, behavior: azalt ? 'auto' : 'smooth'});
}
document.addEventListener('DOMContentLoaded', function(){
  var yb = document.getElementById('yukari');
  if(!yb) return;
  var kontrol = function(){ yb.classList.toggle('goster', window.scrollY > 600); };
  window.addEventListener('scroll', kontrol, {passive:true});
  kontrol();
});

/* ---------- v3.1: animasyonlu anahtar & hamburger ---------- */
function temaSenkron(){
  var koyu = document.documentElement.getAttribute('data-tema') === 'koyu';
  document.querySelectorAll('.tema-anahtar').forEach(function(b){
    b.setAttribute('aria-checked', koyu ? 'true' : 'false');
  });
}
function temaUygula(t){
  if(t === 'koyu'){ document.documentElement.setAttribute('data-tema','koyu'); }
  else{ document.documentElement.removeAttribute('data-tema'); }
  temaSenkron();
}
function menuAc(){
  var m = document.getElementById('mobilmenu');
  var b = document.querySelector('.burger');
  m.classList.toggle('acik');
  if(b) b.classList.toggle('acik', m.classList.contains('acik'));
}
function menuKapat(){
  var m = document.getElementById('mobilmenu');
  var b = document.querySelector('.burger');
  m.classList.remove('acik');
  if(b) b.classList.remove('acik');
}
document.addEventListener('DOMContentLoaded', temaSenkron);
