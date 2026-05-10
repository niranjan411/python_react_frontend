import React, { useState } from 'react';

const FIELD_META = {
  day:     { label: 'Day',      placeholder: 'DD',        icon: '📅' },
  month:   { label: 'Month',    placeholder: 'MM',        icon: '🗓️' },
  year:    { label: 'Year',     placeholder: 'YYYY',      icon: '🌌' },
  hour:    { label: 'Hour',     placeholder: 'HH',        icon: '🕐' },
  minutes: { label: 'Minutes',  placeholder: 'MM',        icon: '⏱️' },
  lat:     { label: 'Latitude', placeholder: 'e.g. 40.7128',  icon: '🧭' },
  lng:     { label: 'Longitude',placeholder: 'e.g. -74.0060', icon: '📍' },
};

const InputField = ({ id, type = 'number', min, max, value, onChange, hasError, errorMsg, disabled }) => {
  const [focused, setFocused] = useState(false);
  const meta = FIELD_META[id] || {};
  const accent = hasError ? '#F87171' : focused ? '#818CF8' : 'rgba(255,255,255,0.1)';

  return (
    <div style={{ flex: 1, minWidth: '90px' }}>
      <label style={{ display:'flex', alignItems:'center', gap:'0.3rem', marginBottom:'0.5rem', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: focused ? '#818CF8' : 'rgba(180,190,220,0.6)' }}>
        <span>{meta.icon}</span> {meta.label}
      </label>
      <input
        type={type}
        placeholder={meta.placeholder}
        min={min} max={max}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '0.75rem 0.85rem',
          background: 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${accent}`,
          borderRadius: '12px',
          fontSize: '0.95rem',
          color: '#fff',
          outline: 'none',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          boxShadow: focused ? `0 0 0 3px ${hasError ? '#F8717122' : '#818CF833'}` : 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
        }}
      />
      {errorMsg && <div style={{ color:'#F87171', fontSize:'0.7rem', marginTop:'0.3rem' }}>{errorMsg}</div>}
    </div>
  );
};

const BirthInput = ({ onCalculate }) => {
  const [formData, setFormData] = useState({ day:'', month:'', year:'', hour:'', minutes:'', ampm:'AM', lat:'', lng:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) { setErrors(p => ({ ...p, location: 'Geolocation not supported.' })); return; }
    setLocLoading(true);
    setErrors(p => ({ ...p, location: '' }));
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setFormData(p => ({ ...p, lat: coords.latitude.toFixed(6), lng: coords.longitude.toFixed(6) }));
        setLocLoading(false);
      },
      (err) => {
        const msgs = { 1:'Location access denied.', 2:'Location unavailable.', 3:'Request timed out.' };
        setErrors(p => ({ ...p, location: msgs[err.code] || 'Unknown error.' }));
        setLocLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const { day, month, year, hour, minutes, lat, lng } = formData;
    const d = parseInt(day), m = parseInt(month), y = parseInt(year), h = parseInt(hour), min = parseInt(minutes);
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) newErrors.date = 'Invalid date.';
    if (date > new Date()) newErrors.date = 'Birth date cannot be in the future.';
    if (y < 1900 || y > new Date().getFullYear()) newErrors.year = `Year must be 1900–${new Date().getFullYear()}.`;
    if (h < 1 || h > 12) newErrors.hour = 'Hour: 1–12.';
    if (min < 0 || min > 59) newErrors.minutes = 'Minutes: 0–59.';
    const la = parseFloat(lat), ln = parseFloat(lng);
    if (isNaN(la) || la < -90 || la > 90) newErrors.lat = 'Latitude: –90 to 90.';
    if (isNaN(ln) || ln < -180 || ln > 180) newErrors.lng = 'Longitude: –180 to 180.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    let hour24 = parseInt(formData.hour);
    if (formData.ampm === 'PM' && hour24 !== 12) hour24 += 12;
    else if (formData.ampm === 'AM' && hour24 === 12) hour24 = 0;
    const payload = {
      date: `${formData.year}-${formData.month.padStart(2,'0')}-${formData.day.padStart(2,'0')}`,
      time: `${hour24.toString().padStart(2,'0')}:${formData.minutes.padStart(2,'0')}`,
      latitude: parseFloat(formData.lat),
      longitude: parseFloat(formData.lng),
    };
    try {
      setLoading(true); setErrors({});
      const res = await fetch('http://localhost:5000/result', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed');
      if (result.success) onCalculate(result.data);
      else throw new Error(result.error);
    } catch (err) {
      setErrors(p => ({ ...p, submit: err.message || 'Failed. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const [ampmFocused, setAmpmFocused] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
        input::placeholder { color: rgba(180,190,220,0.3); }
        * { box-sizing:border-box; }
      `}</style>

      <div style={{
        //background: 'radial-gradient(ellipse at 30% 10%, #0d1b4b 0%, #050c1f 55%, #0a0520 100%)',
        minHeight: '100vh',
        padding: '2.5rem 1.5rem',
        fontFamily: "'Lato', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Nebula blobs */}
        <div style={{ position:'absolute', top:'-80px', right:'-60px', width:'420px', height:'420px', background:'radial-gradient(circle, rgba(102,126,234,0.13) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-50px', left:'-50px', width:'340px', height:'340px', background:'radial-gradient(circle, rgba(118,75,162,0.1) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

        {/* Card */}
        <div style={{
          width: '100%', maxWidth: '480px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '24px',
          padding: '2.25rem 2rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 40px rgba(102,126,234,0.1)',
          animation: 'fadeUp 0.5s ease both',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Card glow */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 0% 0%, rgba(102,126,234,0.1) 0%, transparent 55%)', pointerEvents:'none', borderRadius:'24px' }} />

          {/* Title */}
          <div style={{ textAlign:'center', marginBottom:'2rem', position:'relative' }}>
            <div style={{ fontSize:'1.8rem', marginBottom:'0.3rem' }}>🌠 ✦ 🌠</div>
            <h2 style={{ fontFamily:"'Cinzel', serif", fontSize:'clamp(1.2rem,3vw,1.6rem)', fontWeight:700, color:'#fff', margin:'0 0 0.3rem', letterSpacing:'0.08em', textShadow:'0 0 25px rgba(150,140,255,0.45)' }}>
              Birth Details
            </h2>
            <p style={{ color:'rgba(180,190,220,0.45)', fontSize:'0.72rem', margin:0, letterSpacing:'0.12em', textTransform:'uppercase' }}>
              Reveal Your Cosmic Blueprint
            </p>
          </div>

          {/* Section: Date */}
          <SectionLabel icon="🗓️" text="Date of Birth" />
          <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem' }}>
            <InputField id="day"   min="1"  max="31"                 value={formData.day}   onChange={handleChange} hasError={!!(errors.day||errors.date)} />
            <InputField id="month" min="1"  max="12"                 value={formData.month} onChange={handleChange} hasError={!!(errors.month||errors.date)} />
            <InputField id="year"  min="1900" max={new Date().getFullYear()} value={formData.year}  onChange={handleChange} hasError={!!(errors.year||errors.date)} errorMsg={errors.year||errors.date} />
          </div>

          {/* Section: Time */}
          <SectionLabel icon="⏰" text="Time of Birth" />
          <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.25rem' }}>
            <InputField id="hour"    min="1"  max="12" value={formData.hour}    onChange={handleChange} hasError={!!errors.hour}    errorMsg={errors.hour} />
            <InputField id="minutes" min="0"  max="59" value={formData.minutes} onChange={handleChange} hasError={!!errors.minutes} errorMsg={errors.minutes} />
            {/* AM/PM */}
            <div style={{ flex:1, minWidth:'80px' }}>
              <label style={{ display:'flex', alignItems:'center', gap:'0.3rem', marginBottom:'0.5rem', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(180,190,220,0.6)' }}>
                <span>🌗</span> AM/PM
              </label>
              <select
                value={formData.ampm}
                onChange={e => handleChange('ampm', e.target.value)}
                onFocus={() => setAmpmFocused(true)}
                onBlur={() => setAmpmFocused(false)}
                style={{
                  width:'100%', padding:'0.75rem 0.85rem',
                  background:'rgba(255,255,255,0.05)',
                  border:`1.5px solid ${ampmFocused ? '#818CF8' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius:'12px', fontSize:'0.95rem', color:'#fff',
                  outline:'none', cursor:'pointer',
                  transition:'border-color 0.25s',
                  appearance:'none', WebkitAppearance:'none',
                }}
              >
                <option value="AM" style={{ background:'#0d1b4b' }}>AM</option>
                <option value="PM" style={{ background:'#0d1b4b' }}>PM</option>
              </select>
            </div>
          </div>

          {/* Section: Location */}
          <SectionLabel icon="🌍" text="Birth Location" />
          <div style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', marginBottom: errors.location ? '0.5rem' : '1.5rem' }}>
            <InputField id="lat" type="text" value={formData.lat} onChange={handleChange} hasError={!!errors.lat} errorMsg={errors.lat} />
            <InputField id="lng" type="text" value={formData.lng} onChange={handleChange} hasError={!!errors.lng} errorMsg={errors.lng} />
            <div style={{ paddingTop:'1.6rem' }}>
              <button
                onClick={getCurrentLocation}
                disabled={locLoading}
                style={{
                  background:'rgba(16,185,129,0.15)',
                  border:'1.5px solid rgba(16,185,129,0.4)',
                  color:'#6EE7B7',
                  padding:'0.75rem 0.85rem',
                  borderRadius:'12px',
                  fontSize:'1rem',
                  cursor:'pointer',
                  whiteSpace:'nowrap',
                  transition:'all 0.2s',
                  display:'flex', alignItems:'center', gap:'0.35rem',
                }}
              >
                {locLoading
                  ? <span style={{ display:'inline-block', animation:'spin 0.8s linear infinite' }}>↻</span>
                  : '📡'}
              </button>
            </div>
          </div>
          {errors.location && <div style={{ color:'#F87171', fontSize:'0.72rem', marginBottom:'1rem', marginTop:'-0.5rem' }}>⚠ {errors.location}</div>}

          {/* Submit error */}
          {errors.submit && (
            <div style={{ background:'rgba(248,113,113,0.1)', border:'1px solid rgba(248,113,113,0.3)', color:'#F87171', padding:'0.6rem 0.9rem', borderRadius:'10px', fontSize:'0.78rem', marginBottom:'1rem' }}>
              ⚠ {errors.submit}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width:'100%',
              padding:'0.95rem',
              background: loading ? 'rgba(102,126,234,0.3)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border:'none',
              borderRadius:'14px',
              fontSize:'1rem',
              fontWeight:700,
              color:'#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing:'0.05em',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(102,126,234,0.4)',
              transition:'all 0.3s',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'0.6rem',
              fontFamily:"'Lato', sans-serif",
            }}
          >
            {loading
              ? <><span style={{ display:'inline-block', animation:'spin 0.8s linear infinite' }}>✦</span> Calculating...</>
              : <><span>🔮</span> Reveal My Astro Profile</>}
          </button>
        </div>
      </div>
    </>
  );
};

const SectionLabel = ({ icon, text }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', marginBottom:'0.6rem' }}>
    <span style={{ fontSize:'0.85rem' }}>{icon}</span>
    <span style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(180,190,220,0.45)' }}>{text}</span>
    <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.06)', marginLeft:'0.3rem' }} />
  </div>
);

export default BirthInput;