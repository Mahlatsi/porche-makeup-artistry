# PORCHE Makeup Artistry — Official Website
**Mobile-First Luxury Web Atelier for Phuthaditjhaba, QwaQwa & Gauteng**

Official web platform for **PORCHE Makeup Artistry** by **PN Xaba**. Clean, modern, luxury aesthetic inspired by the official 2026 price poster.

---

## 🌟 Brand & Rate Card (Effective 11 September 2026)

- **Brand:** PORCHE Makeup Artistry
- **Tagline:** *"Enhancing your natural beauty"*
- **Slogans:** *"Look good. Feel confident."* • *"Let me BEAT your face! ♡"*
- **Location:** Phuthaditjhaba, QwaQwa
- **Direct Phone & WhatsApp:** `083 973 8295` (`+27839738295`)

### Official Rates:
| Service | Rate | Description |
|---|---|---|
| **Soft Glam** | **R400** | Polished, glowing beauty look |
| **Full Glam** | **R400** | Sculpted contour, defined eyes, bold finish |
| **Natural Look** | **R350** | Light skin-like coverage, groomed brows & fresh glow |
| **Bridal Makeup** | **R500** | Photo-ready and camera-proof bridal perfection |
| **Male Grooming / Male Makeup** | **R200** | Clean, camera-ready grooming for men & grooms |

### Add-Ons:
- **Strip Lashes:** **R50**
- **Eyebrow Shaping:** **R30**

### House Calls (Travel Coverage):
- **QwaQwa:** **R300**
- **Kestell:** **R300**
- **Harrismith:** **R350**
- **Bethlehem:** **R400**
- **Gauteng:** Custom quote based on location around Gauteng
- **Late Fee:** **R100 / 30min / hour**

### Banking & Deposit Policy:
- **50% Non-refundable deposit** required to secure all bookings
- **Bank:** First National Bank (FNB)
- **Account Holder:** PN XABA
- **Account Number:** `63079093133` (with 1-tap copy button)
- **Branch Code:** `250655` (with 1-tap copy button)

---

## 💎 Features & Interactive Elements

1. **Lightweight 3D Moving Compact (`hero3d.js`)**:
   - Lacquered black, gold trim, and rose powder compact.
   - Rotates smoothly with pointer drag and opens its lid automatically as you scroll down the page.
   - Loads dynamically via Three.js with an instant Canvas fallback.

2. **Dotted Price Menu (`palette.js`)**:
   - Matches the poster's dotted leader lines with shimmer color swatches.
   - Tapping any row opens a detailed drawer with inclusions and direct WhatsApp booking.

3. **Real Before & After Vanity Mirror (`mirror.js`)**:
   - Interactive slider using actual split-face before/after photos.
   - Hollywood bulbs illuminate around the perimeter as the glam look is revealed.

4. **Instant Quote & WhatsApp Builder (`planner.js`)**:
   - Calculates service × number of faces, add-ons, and house call travel fees.
   - Computes the exact total and the required 50% deposit.
   - Pre-fills a formatted WhatsApp booking message ready to send with 1 tap.

5. **Banking & 1-Tap Copy (`deposit` section)**:
   - Account number and branch code with quick copy buttons so clients can pay deposits without typing mistakes.

6. **Mobile-First Sticky Action Bar**:
   - Bottom thumb-zone bar with direct Call `083 973 8295`, WhatsApp, and Book Now.

---

## 🚀 How to Run Locally

```bash
cd /Users/montyrethabilemahlatsi/.gemini/antigravity/scratch/mua-qwaqwa
python3 -m http.server 8080
```
Open `http://localhost:8080` in your browser.
