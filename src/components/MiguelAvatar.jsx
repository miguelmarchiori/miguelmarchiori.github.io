import React from 'react';

export default function MiguelAvatar({ outfitIndex = 0, glassesOn = true }) {
  const outfits = [{ shirt: '#2563eb', jacket: '#172f50' }, { shirt: '#1f9d70', jacket: '#123d38' }, { shirt: '#e78b42', jacket: '#713d36' }];
  const outfit = outfits[outfitIndex % outfits.length];
  return <svg key={outfitIndex + '-' + glassesOn} className="miguel-avatar" viewBox="0 0 340 390" role="img" aria-label={'Ilustração de Miguel, visual ' + (outfitIndex + 1)}>
    <g className="avatar-clothes"><path d="M73 373 Q78 293 121 278 L145 267 L195 267 L222 279 Q267 292 273 373Z" fill={outfit.jacket}/><path d="M125 280 L170 326 L215 280 L198 270 L143 270Z" fill="#8ec5ff"/><path d="M145 270 L170 326 L195 270Z" fill={outfit.shirt}/></g>
    <g className="avatar-face"><path d="M145 238 L145 282 Q170 302 195 282 L195 238Z" fill="#d99570"/><path d="M111 112 Q113 55 170 53 Q227 55 229 112 L220 193 Q212 244 170 256 Q128 244 120 193Z" fill="#edb18c"/><path d="M120 119 Q130 71 171 76 Q207 75 220 117 L219 96 Q208 47 165 51 Q119 54 112 98Z" fill="#38251f"/><path d="M126 173 Q136 163 148 173 M192 173 Q204 163 214 173" fill="none" stroke="#38251f" strokeWidth="5" strokeLinecap="round"/><ellipse cx="138" cy="187" rx="5" ry="7" fill="#38251f"/><ellipse cx="202" cy="187" rx="5" ry="7" fill="#38251f"/><path d="M170 186 L162 211 Q170 218 180 211" fill="none" stroke="#b87555" strokeWidth="4"/></g>
    <g className="avatar-beard"><path d="M120 194 Q124 231 148 244 Q170 260 192 244 Q216 231 220 194 Q209 211 193 209 Q170 225 147 209 Q131 211 120 194Z" fill="#38251f"/></g>
    {glassesOn && <g className="avatar-glasses-layer" fill="rgba(205,232,255,.18)" stroke="#18263b" strokeWidth="6"><rect x="116" y="166" width="47" height="34" rx="10"/><rect x="177" y="166" width="47" height="34" rx="10"/><path d="M163 178 Q170 173 177 178" fill="none"/></g>}
  </svg>;
}
