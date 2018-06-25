var deg2rad = Math.PI / 180,
    τ = 2 * Math.PI,
    halfπ = Math.PI / 2,
    ε = 23.43928
    sinε = Math.sin(ε),
    cosε = Math.sin(ε);

function $(id) { return document.getElementById(id); }
function px(n) { return n + "px"; } 
function Round(x, dg) { return(Math.round(Math.pow(10,dg)*x)/Math.pow(10,dg)); }
function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }

function has(o, key) { return o !== null && hasOwnProperty.call(o, key); }
function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
function isArray(o) { return Object.prototype.toString.call(o) === "[object Array]"; }
function isObject(o) { var type = typeof o;  return type === 'function' || type === 'object' && !!o; }
function isFunction(o) { return typeof o == 'function' || false; }
/*
function dist(p1, p2){
  var θ1 = p1.θ * deg2rad, ϕ1 = p1.ϕ * deg2rad,
      θ2 = p2.θ * deg2rad, ϕ2 = p2.ϕ * deg2rad;

  return Math.sqrt(p1.r*p1.r + p2.r*p2.r - 2*p1.r*p2.r * (Math.sin(θ1) * Math.sin(θ2) * Math.cos(ϕ1-ϕ2) + Math.cos(θ1) * Math.cos(θ2)));
}
*/

function dateParse(s) {
  if (!s) return; 
  var t = s.split(".");
  if (t.length < 1) return; 
  t = t[0].split("-");
  t[0] = t[0].replace(/\D/g, "");
  if (!t[0]) return; 
  t[1] = t[1]?t[1].replace(/\D/g, ""):"1";
  t[2] = t[2]?t[2].replace(/\D/g, ""):"1";
  
  return new Date(t[0], t[1]-1, t[2]);
}

function dateAdd(dt, val, type) {
  var t, ldt = dt.valueOf();
  if (!val) return new Date(ldt); 
  t = type || "d";
  switch (t) {
    case 'y': case 'yr': ldt += 31556926080*val; break;
    case 'm': case 'mo': ldt += 2629800000*val; break;
    case 'd': case 'dy': ldt += 86400000*val; break;
    case 'h': case 'hr': ldt += 3600000*val; break;
    case 'n': case 'mn': ldt += 60000*val; break;
    case 's': case 'sec': ldt += 1000*val; break;
    case 'ms': ldt += val; break;
  }
  return new Date(ldt);
}


function dateDiff(dt1, dt2, type) {
  if (!dt2 || !dt1) return; 
  var diff = dt2.valueOf() - dt1.valueOf(),
      tp = type || "d";
  switch (tp) {
    case 'y': case 'yr': diff /= 31556926080; break;
    case 'm': case 'mo': diff /= 2629800000; break;
    case 'd': case 'dy': diff /= 86400000; break;
    case 'h': case 'hr': diff /= 3600000; break;
    case 'n': case 'mn': diff /= 60000; break;
    case 's': case 'sec': diff /= 1000; break;
    case 'ms': break;
  }
  if (type) return Math.floor(diff);
  return diff;
}


var Trig = {
  sinh: function (val) { return (Math.pow(Math.E, val)-Math.pow(Math.E, -val))/2; },
  cosh: function (val) { return (Math.pow(Math.E, val)+Math.pow(Math.E, -val))/2; },
  tanh: function (val) { return 2.0 / (1.0 + Math.exp(-2.0 * val)) - 1.0; },
  asinh: function (val) { return Math.log(val + Math.sqrt(val * val + 1)); },
  acosh: function (val) { return Math.log(val + Math.sqrt(val * val - 1)); },
  normalize0: function(val) {  return ((val + Math.PI*3) % (Math.PI*2)) - Math.PI; },
  normalize: function(val) {  return ((val + Math.PI*2) % (Math.PI*2)); },  
  cartesian: function(p) {
    var ϕ = p[0], θ = halfπ - p[1], r = p[2];
    return {"x": r * Math.sin(θ) * Math.cos(ϕ), "y": r * Math.sin(θ) * Math.sin(ϕ), "z": r * Math.cos(θ)};
  },
  spherical: function(p) {
    var r = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z),
        θ = Math.atan(p.y / p.x),
        ϕ = Math.acos(p.z / r);
    return  [θ / deg2rad, ϕ / deg2rad, r];
  }
};

function dist(p1, p2) {
  var ϕ1 = p1[0],
      θ1 = p1[1],
      ϕ2 = p2[0],
      θ2 = p2[1],
      dθ = θ2 - θ1,
      dϕ = ϕ2 - ϕ1;
  
  //return Math.acos( Math.sin(θ1) * Math.sin(θ2) + Math.cos(θ1) * Math.cos(θ2) * Math.cos(dϕ) );  
  var a = Math.sin(dθ / 2) * Math.sin(dθ / 2) +  Math.cos(θ1) * Math.cos(θ2) * Math.sin(dϕ / 2) * Math.sin(dϕ / 2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return c;
}

var gmdat = {
  "sol": 0.0002959122082855911025,  // AU^3/d^2
  "mer": 164468599544771, //km^3/d^2
  "ven": 2425056445892137,
  "ter": 2975536307796296,
  "lun": 36599199229256,
  "mar": 319711652803400,
  "cer": 467549107200,
  "ves": 129071530155,
  "jup": 945905743547733000,
  "sat": 283225255921345000,
  "ura": 43256076555832200,
  "nep": 51034453325494200,
  "plu": 7327611364884,
  "eri": 8271175680000
}


var transform = function(item, date, parentBody) {
  var dt, i, key, dat = {}, elms = ["a","e","i","w","M","L","W","N","n","ref","lecl","becl","Tilt"];
/*
    ep = epoch (dt)
    N = longitude of the ascending node (deg) Ω
    i = inclination to the refrence plane, default:ecliptic (deg) 
    w = argument of periapsis (deg)  ω
    a = semi-major axis, or mean distance from parent body (AU,km)
    e = eccentricity (0=circle, 0-1=ellipse, 1=parabola, >1=hyperbola ) (-)
    M = mean anomaly (0 at periapsis; increases uniformly with time) (deg)
    n = mean daily motion = 360/P (deg/day)
    
    W = N + w  = longitude of periapsis ϖ
    L = M + W  = mean longitude
    q = a*(1-e) = periapsis distance
    Q = a*(1+e) = apoapsis distance
    P = 2π * sqrt(a^3/GM) = orbital period (years)
    T = Epoch_of_M - (M(deg)/360_deg) / P  = time of periapsis
    v = true anomaly (angle between position and periapsis) ν
    E = eccentric anomaly
    
    Mandatory: a, e, i, N, w|W, M|L, dM|n
*/
  
  if (parentBody) gm = gmdat[parentBody];
  else gm = gmdat["sol"];

  if (date) {
    if (date instanceof Date) { dt = date; }
    else { dt = dateParse(date); }
  }
  if (!dt) { dt = new Date(); }
  dat.jd = JD(dt);
    
  dt = dateParse(item.ep);
  dat.jd0 = JD(dt);
  dat.d = dat.jd - dat.jd0;
  dat.cy = dat.d / 36525;
  
  for (i=0; i<elms.length; i++) {
    key = elms[i];
    if (has(item, "d"+key)) {
      dat[key] = item[key] + item["d"+key] * dat.cy;
    } else if (has(item, key)) {
      dat[key] = item[key];
    }
    
    if (has(dat, key)) {
      if (key === "a" || key === "e") dat[key] *= 1.0; 
      else if (key !== "ref") dat[key] *= deg2rad;
    }
  }
  if (has(dat, "M") && !has(dat, "dM") && has(dat, "n")) {
    dat.M += (dat.n * dat.d);
  }
  derive(dat);
  trueAnomaly(dat);
  cartesian(dat);
  spherical(dat);
  transpose(dat);
  return dat;
};

//AU 149597870.7 km
//G  6.67408e-11 m^3/kg/s^2
             

function near_parabolic(E, e) {
  var anom2 = e > 1.0 ? E*E : -E*E,
      term = e * anom2 * E / 6.0,
      rval = (1.0 - e) * E - term,
      n = 4;

  while(Math.abs(term) > 1e-15) {
    term *= anom2 / (n * (n + 1));
    rval -= term;
    n += 2;
  }
  return(rval);
}

function kepler(dat) {
  var curr, err, trial, tmod,
      e = dat.e, M = dat.M,
      thresh = 1e-8,
      offset = 0.0, 
      delta_curr = 1.9, 
      is_negative = false, 
      n_iter = 0;

  if (!M) return(0.0); 

  if (e < 1.0) {
    if (M < -Math.PI || M > Math.PI) {
      tmod = Trig.normalize0(M);
      offset = M - tmod;
      M = tmod;
    }

    if (e < 0.9) {   
      curr = Math.atan2(Math.sin(M), Math.cos(M) - e);
      do {
        err = (curr - e * Math.sin(curr) - M) / (1.0 - e * Math.cos(curr));
        curr -= err;
      } while (Math.abs(err) > thresh);
      return curr; // + offset;
    }
  }

  if ( M < 0.0) {
    M = -M;
    is_negative = true;
  }

  curr = M;
  thresh = thresh * Math.abs(1.0 - e);
             /* Due to roundoff error,  there's no way we can hope to */
             /* get below a certain minimum threshhold anyway:        */
  if ( thresh < 1e-15) { thresh = 1e-15; }
  if ( (e > 0.8 && M < Math.PI / 3.0) || e > 1.0) {   /* up to 60 degrees */
    trial = M / Math.abs( 1.0 - e);

    if (trial * trial > 6.0 * Math.abs(1.0 - e)) {  /* cubic term is dominant */
      if (M < Math.PI) {
        trial = Math.pow(6.0 * M, 1/3);
      } else {       /* hyperbolic w/ 5th & higher-order terms predominant */
        trial = Trig.asinh( M / e);
      }
    }
    curr = trial;
  }
  if (e > 1.0 && M > 4.0) {   /* hyperbolic, large-mean-anomaly case */
    curr = Math.log(M);
  }
  if (e < 1.0) {
    while(Math.abs(delta_curr) > thresh) {
      if ( n_iter++ > 8) {
        err = near_parabolic(curr, e) - M;
      } else {
        err = curr - e * Math.sin(curr) - M;
      }
      delta_curr = -err / (1.0 - e * Math.cos(curr));
      curr += delta_curr;
    }
  } else {
    while (Math.abs(delta_curr) > thresh) {
      if (n_iter++ > 7) {
        err = -near_parabolic(curr, e) - M;
      } else {
        err = e * Trig.sinh(curr) - curr - M;
      }
      delta_curr = -err / (e * Trig.cosh(curr) - 1.0);
      curr += delta_curr;
    }
  }
  return( is_negative ? offset - curr : offset + curr);
}

function trueAnomaly(dat) {
  var v, r, x, y, r0, g, t;

  if (dat.e === 1.0) {   /* parabolic */
    t = dat.jd0 - dat.T;
    g = dat.w0 * t * 0.5;

    y = Math.pow(g + Math.sqrt(g * g + 1.0), 1/3);
    dat.v = 2.0 * Math.atan(y - 1.0 / y);
  } else {          /* got the mean anomaly;  compute eccentric,  then true */
    dat.E = kepler(dat);
    if (dat.e > 1.0) {    /* hyperbolic case */
      x = (dat.e - Trig.cosh(dat.E));
      y = Trig.sinh(dat.E);
    } else {          /* elliptical case */
      x = (Math.cos(dat.E) - dat.e);
      y =  Math.sin(dat.E);
    }
    y *= Math.sqrt(Math.abs(1.0 - dat.e * dat.e));
    dat.v = Math.atan2(y, x);
  }

  r0 = dat.q * (1.0 + dat.e);
  dat.r = r0 / (1.0 + dat.e * Math.cos(dat.v));
}

function derive(dat) {
  if (!dat.hasOwnProperty("w")) {
    dat.w = dat.W - dat.N;
  }
  if (!dat.hasOwnProperty("M")) {
    dat.M = dat.L - dat.W;
  }
  if (dat.e < 1.0) { dat.M = Trig.normalize0(dat.M); }
  //dat.P = Math.pow(Math.abs(dat.a), 1.5);
  dat.P = τ * Math.sqrt(Math.pow(dat.a, 3) / gm) / 365.25;
  dat.T = dat.jd0 - (dat.M / halfπ) / dat.P;

  if (dat.e !== 1.0) {   /* for non-parabolic orbits: */
   dat.q = dat.a * (1.0 - dat.e);
   dat.t0 = dat.a * Math.sqrt(Math.abs(dat.a) / gm);
  } else {
   dat.w0 = (3.0 / Math.sqrt(2)) / (dat.q * Math.sqrt(dat.q / gm));
   dat.a = 0.0;
   dat.t0 = 0.0;
  }
  dat.am = Math.sqrt(gm * dat.q * (1.0 + dat.e));
}

function transpose(dat) {
  if (!dat.ref || dat.ref === "ecl") {
    dat.tx = dat.x;
    dat.ty = dat.y;
    dat.tz = dat.z;
    return;
  }
  var a0 = dat.lecl,// - Math.PI/2,
      a1 = Math.PI/2 - dat.becl,
      angles = [0, a1, -a0];
  euler(dat, angles);
  var tp =  Trig.cartesian([dat.tl, dat.tb, dat.r]);
  dat.tx = tp.x;
  dat.ty = tp.y;
  dat.tz = tp.z;
}

function equatorial(dat) {
  dat.xeq = dat.x;
  dat.yeq = cosε * dat.y - sinε * dat.z;
  dat.zeq = sinε * dat.y + cosε * dat.z;
  dat.ra = Math.atan2(dat.yeq, dat.xeq);
  dat.dec = Math.atan2(dat.zeq, Math.sqrt(dat.xeq*dat.xeq + dat.yeq*dat.yeq));
}

function cartesian(dat) {
  var x, y, z, u = dat.v + dat.w;
  x = dat.r * (Math.cos(dat.N) * Math.cos(u) - Math.sin(dat.N) * Math.sin(u) * Math.cos(dat.i));
  y = dat.r * (Math.sin(dat.N) * Math.cos(u) + Math.cos(dat.N) * Math.sin(u) * Math.cos(dat.i));
  z = dat.r * (Math.sin(u) * Math.sin(dat.i));
  dat.x = x;
  dat.y = y;
  dat.z = z;
  return {x:x, y:y, z:z};
}

function spherical(dat) {
  var lon, lat;
  lon = Math.atan2(dat.y, dat.x);
  lat = Math.atan2(dat.z, Math.sqrt(dat.x*dat.x + dat.y*dat.y));
  dat.l = Trig.normalize(lon);
  dat.b = lat;
  return {l:lon, b:lat}; 
}

function JD(dt) {  
  var yr = dt.getUTCFullYear(),
      mo = dt.getUTCMonth() + 1,
      dy = dt.getUTCDate(),
      frac = (dt.getUTCHours() - 12 + dt.getUTCMinutes()/60.0 + dt.getUTCSeconds()/3600.0) / 24, 
      IYMIN = -4799;        /* Earliest year allowed (4800BC) */

  if (yr < IYMIN) return -1; 
  var a = Math.floor((14 - mo) / 12),
      y = yr + 4800 - a,
      m = mo + (12 * a) - 3;
  var jdn = dy + Math.floor((153 * m + 2)/5) + (365 * y) + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  return jdn + frac;   
}

//Transform coordinates according to euler angles
function euler(dat, angles) {
  var x, y, z, β, γ, λ, φ, dψ, ψ, θ,
      ε = 1.0e-5;

  if (!angles) return [dat.l, dat.b]; 

  λ = dat.l;  // longitude 0..2 Pi
  if (λ < 0) λ += τ; 
  φ = dat.b;  // latitude  -Pi/2..Pi/2
  
  λ -= angles[0];  // celestial longitude of the native pole
  β = angles[1];  // inclination between the poles (colatitude)
  γ = angles[2];  // native longitude of the celestial pole
  
  x = Math.sin(φ) * Math.sin(β) - Math.cos(φ) * Math.cos(β) * Math.cos(λ);
  if (Math.abs(x) < ε) {
    x = -Math.cos(φ + β) + Math.cos(φ) * Math.cos(β) * (1 - Math.cos(λ));
  }
  y = -Math.cos(φ) * Math.sin(λ);
  
  if (x !== 0 || y !== 0) {
    dψ = Math.atan2(y, x);
  } else {
    dψ = λ - Math.PI;
  }
  ψ = (γ + dψ); 
  if (ψ < 0) ψ += τ; 
  
  if (λ % Math.PI === 0) {
    θ = φ + Math.cos(λ) * β;
    if (θ > halfπ) θ = Math.PI - θ; 
    if (θ < -halfπ) θ = -Math.PI - θ; 
  } else {
    z = Math.sin(φ) * Math.cos(β) + Math.cos(φ) * Math.sin(β) * Math.cos(λ);
    if (Math.abs(z) > 0.99) {
      θ = Math.abs(Math.acos(Math.sqrt(x*x+y*y)));
      if (z < 0) θ *= -1; 
    } else {
      θ = Math.asin(z);
    }
  }
  
  dat.tl = ψ;
  dat.tb = θ;
  return [ψ, θ];
}
