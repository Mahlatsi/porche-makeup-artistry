// Porche Makeup Artistry: central business configuration.
// Every price, phone number, area and bank detail on the site comes from this file.
// Source: official Porche price poster (prices effective from 11 September 2026).

export const BRAND = {
  name: "Porche",
  fullName: "Porche Makeup Artistry",
  tagline: "Enhancing your natural beauty",
  slogan: "Let me beat your face!",
  motto: "Look good. Feel confident.",
  location: "Phuthaditjhaba, QwaQwa",
  phoneFormatted: "083 973 8295",
  phoneTel: "+27839738295",
  whatsappNumber: "27839738295",
  currency: "R",
  pricesEffective: "11 September 2026",

  socials: {
    facebook: "https://www.facebook.com/search/top?q=Porche%20Makeup%20Artistry"
  },

  // 50% non-refundable deposit secures a booking
  deposit: {
    percent: 50,
    bank: "First National Bank (FNB)",
    accountName: "PN Xaba",
    accountNumber: "63079093133",
    branchCode: "250655"
  },

  lateFee: "R100 / 30 min",

  services: [
    {
      id: "soft-glam",
      title: "Soft Glam",
      price: 400,
      tone: "#E8C3B9",
      image: "./assets/img/soft-glam-card.jpg",
      description: "A soft, polished, glowing look. Blended eyes, rosy cheeks and a flawless base that looks expensive up close.",
      includes: ["Skin prep & primer", "Full-coverage, natural-finish base", "Soft blended eyeshadow", "Setting for long wear"]
    },
    {
      id: "full-glam",
      title: "Full Glam",
      price: 400,
      tone: "#C98F86",
      image: "./assets/img/party-glam.jpg",
      description: "The full beat: sculpted contour, defined eyes, bold highlight and a statement lip for nights you want to be seen.",
      includes: ["Skin prep & primer", "Sculpt, contour & highlight", "Defined or smokey eye", "Long-wear setting"]
    },
    {
      id: "natural",
      title: "Natural Look",
      price: 350,
      tone: "#EAD7C3",
      image: "./assets/img/natural-look.jpg",
      description: "You, but enhanced. Light, skin-like coverage, groomed brows and a fresh glow.",
      includes: ["Skin prep", "Light, skin-like coverage", "Groomed brows & mascara", "Fresh lip & glow"]
    },
    {
      id: "bridal",
      title: "Bridal Makeup",
      price: 500,
      tone: "#F3E3DC",
      image: "./assets/img/bride-tiara.jpg",
      badge: "Photo ready & camera proof",
      description: "Photo-ready, camera-proof bridal makeup that lasts from the vows to the last dance.",
      includes: ["Bridal skin prep", "Camera-proof long-wear base", "Soft or full bridal eye", "Setting for tears, heat & flash"]
    },
    {
      id: "male",
      title: "Male Grooming / Male Makeup",
      price: 200,
      tone: "#B89A7E",
      image: "./assets/img/male-grooming.jpg",
      description: "Clean, undetectable grooming for grooms, photoshoots and events. Even skin, matte finish, neat brows.",
      includes: ["Skin prep", "Even-tone matte finish", "Brow tidy", "Shine control"]
    }
  ],

  addOns: [
    { id: "lashes", title: "Strip Lashes", price: 50 },
    { id: "brows", title: "Eyebrow Shaping", price: 30 }
  ],

  // House-call (travel) fees. fee: null = quoted on request.
  houseCalls: [
    { name: "QwaQwa", fee: 300 },
    { name: "Kestell", fee: 300 },
    { name: "Harrismith", fee: 350 },
    { name: "Bethlehem", fee: 400 },
    { name: "Gauteng", fee: null, note: "Fees depend on your location around Gauteng" }
  ],

  faqs: [
    {
      q: "How do I secure my booking?",
      a: "A 50% non-refundable deposit is required to secure your booking. Pay into FNB, account name PN Xaba, account 63079093133, branch code 250655, then send proof of payment on WhatsApp."
    },
    {
      q: "Do you do house calls?",
      a: "Yes. House calls are R300 in QwaQwa and Kestell, R350 in Harrismith and R400 in Bethlehem. In Gauteng the fee depends on your area, so ask for a quote on WhatsApp."
    },
    {
      q: "Is there a late fee?",
      a: "Yes. A late fee of R100 per 30 minutes applies, so please be ready at your booked time."
    },
    {
      q: "Are lashes included?",
      a: "Strip lashes are an add-on at R50. Eyebrow shaping is R30."
    },
    {
      q: "Do you do makeup for men?",
      a: "Yes. Male grooming and male makeup is R200: clean, natural and camera-ready."
    }
  ]
};

export function waLink(message) {
  const text = message || "Hi Porche! I'd like to book a makeup appointment.";
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function telLink() {
  return `tel:${BRAND.phoneTel}`;
}

export function money(n) {
  return `${BRAND.currency}${Number(n).toLocaleString("en-ZA")}`;
}
