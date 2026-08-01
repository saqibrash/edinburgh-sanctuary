export const BUSINESS = "The Restoration Room";
export const PHONE = "07570 161699";
export const PHONE_HREF = "tel:+447570161699";
export const EMAIL = "therestorationroom85@gmail.com";
export const ADDRESS = "Silverknowes, EH4, Edinburgh";
export const FRESHA_URL =
  "https://www.fresha.com/book-now/the-restoration-room-p5d4vn56/all-offer?share=true&pId=3033869";
export const SITE_URL = "https://therestorationroom.co.uk";

export const HOURS = [
  { day: "Mon – Fri", hours: "10:00 – 19:00" },
  { day: "Saturday", hours: "By appointment only" },
  { day: "Sunday", hours: "By appointment only" },
];
export const HOURS_NOTE = "Last appointment 6:30 PM";

/* ---------------- Images (approved client photos) ---------------- */
export const camilla = "/assets/camilla.jpeg";
export const gRoom01 = "/assets/gallery/room-01.jpeg";
export const gRoom03 = "/assets/gallery/room-03.jpeg";
export const gRoom04 = "/assets/gallery/room-04.jpeg";
export const gBespokeRoom = "/assets/gallery/bespoke-restorative-room.jpeg";
export const gShelves = "/assets/gallery/shelves-01.jpeg";
export const gWindow = "/assets/gallery/window.jpeg";
export const gTowels = "/assets/gallery/towels.jpeg";
export const gDoor = "/assets/gallery/door.jpeg";
export const gCandleEuc = "/assets/gallery/candle-eucalyptus.jpeg";
export const gSconce = "/assets/gallery/sconce.jpeg";
export const gPlantCandle = "/assets/gallery/plant-candle.jpeg";

export const GALLERY: { src: string; alt: string; span: string }[] = [
  { src: gRoom01, alt: "Warmly lit massage treatment room in Silverknowes, Edinburgh", span: "col-span-12 md:col-span-8 aspect-[16/10] md:aspect-[16/11]" },
  { src: gShelves, alt: "Shelves with fresh towels, water and greenery in the Silverknowes treatment room", span: "col-span-6 md:col-span-4 aspect-square md:aspect-auto" },
  { src: gRoom04, alt: "Massage treatment room with soft lighting and neatly arranged towels", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: gRoom03, alt: "Massage couch prepared for a Swedish massage in Silverknowes", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: gBespokeRoom, alt: "Genuine treatment room with massage bed, wall sconces and round mirror in Edinburgh", span: "col-span-12 md:col-span-4 aspect-[4/3] md:aspect-square" },
  { src: gTowels, alt: "Rolled towels laid on the heated massage couch", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gWindow, alt: "Serene window with soft curtains and candles in the massage room", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gCandleEuc, alt: "Candle and eucalyptus detail in the Silverknowes massage studio", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gSconce, alt: "Warm brass wall sconce lighting the treatment room", span: "col-span-6 md:col-span-3 aspect-square" },
  { src: gDoor, alt: "Treatment room door with Camilla's framed massage therapy qualifications", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: gPlantCandle, alt: "Plant and candle styled on a shelf in the Edinburgh massage room", span: "col-span-6 md:col-span-4 aspect-square" },
  { src: camilla, alt: "Camilla, qualified massage therapist in Silverknowes, Edinburgh", span: "col-span-12 md:col-span-4 aspect-[16/10] md:aspect-square" },
];

/* ---------------- Navigation ---------------- */
export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/swedish-massage", label: "Swedish Massage" },
  { to: "/bespoke-massage", label: "Bespoke Restorative Massage" },
  { to: "/foot-ritual", label: "Foot Ritual" },
  { to: "/rebalancing-scalp-massage", label: "Rebalancing Scalp Massage" },
  { to: "/contact", label: "Contact" },
];

/* ---------------- Treatments ---------------- */
export interface Treatment {
  slug: string;
  navLabel: string;
  linkText: string;
  name: string;
  image: string;
  imageAlt: string;
  desc: string;
  prices: { duration: string; price: string; key: string }[];
  title: string;
  metaDescription: string;
  intro: string;
  detail: string[];
  benefits: string[];
  goodFor: string;
}

export const treatments: Treatment[] = [
  {
    slug: "/swedish-massage",
    linkText: "Swedish massage",
    navLabel: "Swedish Massage",
    name: "Swedish Massage",
    image: gRoom01,
    imageAlt: "Treatment room set up for a Swedish massage in Silverknowes, Edinburgh",
    desc: "Swedish massage is a relaxing, therapeutic treatment that uses smooth, flowing strokes, kneading, and gentle techniques to ease muscle tension, improve circulation, and promote overall wellbeing. Each massage is tailored to your individual needs, with pressure adjusted to ensure a comfortable and effective treatment.\n\nWhether you’re looking to relieve stress, reduce muscular aches, or simply take time to unwind, Swedish massage offers the perfect opportunity to relax, restore, and recharge.",
    prices: [
      { duration: "30 minutes", price: "£30", key: "swedish-30" },
      { duration: "45 minutes", price: "£45", key: "swedish-45" },
      { duration: "60 minutes", price: "£55", key: "swedish-60" },
      { duration: "75 minutes", price: "£70", key: "swedish-75" },
    ],
    title: "Swedish Massage in Silverknowes, Edinburgh | The Restoration Room",
    metaDescription:
      "Relaxing Swedish massage in Silverknowes, Edinburgh from £30. Flowing strokes to ease tension and improve circulation, tailored to you. Free parking. Book online.",
    intro:
      "A classic, deeply relaxing full body massage in a private treatment room in Silverknowes, Edinburgh — with free parking right outside.",
    detail: [
      "Swedish massage is the treatment most people picture when they think of massage: long, flowing strokes, gentle kneading and rhythmic techniques that warm the muscles, release everyday tension and encourage better circulation. It is calming rather than clinical, and pressure is always adjusted to what feels right for you on the day.",
      "Your session begins with a short chat about how you are feeling, any areas of tightness and how much pressure you enjoy. You then settle onto a heated massage couch in a candlelit room, with soft music and a carefully chosen essential oil. Nothing is rushed, and the aim is for you to switch off completely.",
      "Shorter 30 and 45 minute treatments work beautifully as a focused back, neck and shoulder massage, while 60 and 75 minute sessions allow time for a fuller body treatment. Conveniently located near Davidsons Mains, Cramond, Blackhall and Barnton, with free on-street parking.",
    ],
    benefits: [
      "Eases everyday muscular tension and stiffness",
      "Encourages circulation and lymphatic flow",
      "Calms the nervous system and supports better sleep",
      "Helps manage stress and mental fatigue",
      "Pressure tailored from light and soothing to firmer work",
    ],
    goodFor:
      "Ideal if you want to unwind, sleep better or simply take an hour for yourself. If you have specific problem areas or long-standing tension, the Bespoke Restorative Massage may suit you better.",
  },
  {
    slug: "/bespoke-massage",
    linkText: "bespoke restorative massage",
    navLabel: "Bespoke Restorative Massage",
    name: "Bespoke Restorative Massage",
    image: gBespokeRoom,
    imageAlt: "Massage bed, wall sconces and mirror in the Edinburgh treatment room",
    desc: "Our signature treatment, offering a truly personalised and bespoke experience tailored entirely to your individual needs. Based on traditional Swedish massage techniques, this treatment can incorporate firmer pressure and deeper muscle work where required to help relieve persistent tension, muscular aches, and areas of discomfort. Gentle assisted stretching may also be included to improve mobility and ease stiffness.\n\nWhether you’re looking to relieve muscular pain, reduce stress, improve flexibility, or simply unwind, every treatment is adapted to your body on the day, ensuring you receive the care that’s right for you.",
    prices: [
      { duration: "30 minutes", price: "£40", key: "bespoke-30" },
      { duration: "45 minutes", price: "£55", key: "bespoke-45" },
      { duration: "60 minutes", price: "£65", key: "bespoke-60" },
      { duration: "75 minutes", price: "£80", key: "bespoke-75" },
    ],
    title: "Bespoke Restorative Massage, Silverknowes Edinburgh | Deep Tissue",
    metaDescription:
      "Bespoke Restorative Massage in Silverknowes, Edinburgh from £40. Firmer pressure, deeper muscle work and gentle assisted stretching, tailored to you. Free parking.",
    intro:
      "The signature treatment at The Restoration Room — firmer pressure, deeper muscle work and gentle assisted stretching, tailored to your body in Silverknowes, Edinburgh.",
    detail: [
      "Our signature treatment, offering a truly personalised and bespoke experience tailored entirely to your individual needs. Based on traditional Swedish massage techniques, this treatment can incorporate firmer pressure and deeper muscle work where required to help relieve persistent tension, muscular aches, and areas of discomfort. Gentle assisted stretching may also be included to improve mobility and ease stiffness.",
      "Whether you’re looking to relieve muscular pain, reduce stress, improve flexibility, or simply unwind, every treatment is adapted to your body on the day, ensuring you receive the care that’s right for you.",
      "The treatment takes place in a quiet, private room within Camilla's Silverknowes home in EH4. Conveniently located near Davidsons Mains, Cramond, Blackhall and Barnton, with free on-street parking.",
    ],
    benefits: [
      "Targeted relief for stubborn knots and chronic tension",
      "Improved mobility and range of movement",
      "Deep tissue and acupressure adapted to your comfort",
      "Assisted stretching to release tight muscle groups",
      "Restorative and relaxing, not clinical",
    ],
    goodFor:
      "Best suited to anyone with recurring tightness, postural aches or sports-related tension. Prefer something purely relaxing? Try the Swedish Massage instead.",
  },
  {
    slug: "/foot-ritual",
    linkText: "restorative foot ritual",
    navLabel: "Foot Ritual",
    name: "Restorative Foot Ritual",
    image: gTowels,
    imageAlt: "Rolled towels prepared in the Silverknowes treatment room",
    desc: "Soothe tired, aching feet with a deeply relaxing treatment beginning with a warm, aromatic foot soak to cleanse and soften the skin. This is followed by a therapeutic foot and lower leg massage using a blend of soothing techniques to ease tension, improve circulation, and encourage complete relaxation.\n\nPerfect as a standalone treatment or as a calming addition to your massage, leaving your feet feeling refreshed, revitalised, and wonderfully restored.",
    prices: [{ duration: "30 minutes", price: "£25", key: "foot-30" }],
    title: "Restorative Foot Ritual in Silverknowes, Edinburgh | £25, 30 mins",
    metaDescription:
      "Restorative foot ritual in Silverknowes, Edinburgh — warm aromatic soak plus foot and lower leg massage. 30 minutes, £25. Free parking. Book online today.",
    intro:
      "A warm, aromatic soak followed by a soothing foot and lower leg massage — 30 restorative minutes in Silverknowes, Edinburgh.",
    detail: [
      "Feet carry us everywhere and are rarely given any attention. This ritual begins with a warm, aromatic foot soak that cleanses, softens and gently warms the skin, before a therapeutic massage of the feet and lower legs eases tightness and encourages circulation.",
      "Techniques are slow and soothing, working through the sole, heel, arches and calves. Many clients find the treatment as calming for the mind as it is for the feet — it is a lovely option if you are on your feet all day, walking Edinburgh's hills, or simply want a shorter treatment that still feels like a proper escape.",
      "The foot ritual works beautifully on its own or as a calming addition to a Swedish or bespoke massage. As with every treatment, it takes place in the private Silverknowes room in EH4, with free parking outside.",
    ],
    benefits: [
      "Relieves tired, aching feet and lower legs",
      "Warm aromatic soak to soften and refresh the skin",
      "Encourages circulation after long days standing or walking",
      "A shorter treatment that still feels indulgent",
      "Pairs perfectly with a longer massage",
    ],
    goodFor:
      "Perfect if you are short on time, new to massage, or want to add something extra to your usual treatment.",
  },
  {
    slug: "/rebalancing-scalp-massage",
    linkText: "rebalancing scalp massage",
    navLabel: "Rebalancing Scalp Massage",
    name: "Rebalancing Scalp Massage",
    image: gCandleEuc,
    imageAlt: "Candle and eucalyptus detail in the Silverknowes massage studio",
    desc: "A calming treatment designed to help you unwind, ease mental tension, and restore a sense of balance. Gentle massage techniques are applied to the scalp, temples, neck, and upper shoulders to encourage deep relaxation, relieve built-up tension, and leave you feeling refreshed and restored.\n\nIdeal as a standalone treatment or as an addition to any massage.",
    prices: [{ duration: "25 minutes", price: "£20", key: "scalp-25" }],
    title: "Rebalancing Scalp Massage in Silverknowes, Edinburgh | £20, 25 mins",
    metaDescription:
      "Rebalancing Scalp Massage in Silverknowes, Edinburgh. Scalp, temples, neck and upper shoulders to ease mental tension. 25 minutes, £20. Free parking. Book online.",
    intro:
      "A calming scalp, temple, neck and shoulder treatment to ease mental tension — 25 restorative minutes in Silverknowes, Edinburgh.",
    detail: [
      "A calming treatment designed to help you unwind, ease mental tension, and restore a sense of balance. Gentle massage techniques are applied to the scalp, temples, neck, and upper shoulders to encourage deep relaxation, relieve built-up tension, and leave you feeling refreshed and restored. Ideal as a standalone treatment or as an addition to any massage.",
      "It is particularly welcome if you spend long hours at a screen, clench your jaw, or find tension building into headaches. The pace is slow and grounding, and most clients describe leaving with a lighter head and noticeably looser shoulders.",
      "At 25 minutes it is an easy treatment to fit into a lunch break or after work, with free parking right outside the Silverknowes treatment room in EH4. Conveniently located near Davidsons Mains, Cramond, Blackhall and Barnton, with free on-street parking.",
    ],
    benefits: [
      "Eases tension across the scalp, temples, neck and shoulders",
      "Helps reduce headaches caused by muscular tightness",
      "Calms a busy mind and supports mental clarity",
      "Great for screen-related neck and shoulder strain",
      "Can be added to any longer massage",
    ],
    goodFor:
      "Ideal for desk workers, anyone prone to tension headaches, or clients who prefer to stay fully clothed and relaxed.",
  },
];

export const treatmentBySlug = (slug: string) => treatments.find((t) => t.slug === slug);

export const cancellationPolicy = {
  deposit: "A 50% deposit is required at the time of booking to secure your appointment.",
  refund: "Your deposit is fully refundable if you cancel or reschedule with at least 48 hours’ notice.",
  fee: "Cancellations made with less than 48 hours’ notice, or failure to attend your appointment, will result in the deposit being retained as a cancellation fee.",
};

export const pillars = [
  { title: "Holistic Approach", desc: "Treating the mind, body and spirit as a whole." },
  { title: "Peaceful Space", desc: "A calm treatment room in the comfort of my home." },
  { title: "Quality Products", desc: "Carefully selected essential oils and premium products." },
  { title: "Personalised Care", desc: "Every treatment tailored to your unique needs." },
  { title: "Free Parking", desc: "Free on-street parking right outside the treatment room." },
  { title: "Fully Insured", desc: "Fully qualified since 2008 and fully insured for your peace of mind." },
];

// NOTE: Sample copy for design preview only — replace with genuine client reviews.
export const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    quote:
      "From the moment I arrived, I felt completely at ease. Camilla took the time to understand exactly what I needed and tailored the treatment perfectly. The room is beautiful, peaceful and so welcoming. I left feeling lighter, calmer and completely restored.",
  },
  {
    name: "Emma L.",
    rating: 5,
    quote:
      "I’ve had many massages over the years, but this was something special. The attention to detail, the calming atmosphere and Camilla’s intuitive touch made it a truly personalised experience. I can’t wait to return.",
  },
  {
    name: "Rachel T.",
    rating: 5,
    quote:
      "A wonderfully relaxing treatment in the most tranquil setting. Camilla is professional, warm and incredibly skilled. I came in with tension in my shoulders and left feeling completely different. Highly recommended.",
  },
  {
    name: "Kate H.",
    rating: 5,
    quote:
      "The whole experience felt luxurious yet personal. Soft music, candlelight and the most comfortable heated massage couch. Camilla has a gift for making you feel cared for from start to finish.",
  },
  {
    name: "Lucy B.",
    rating: 5,
    quote:
      "I booked a bespoke restorative treatment and it was exactly what my body needed. Camilla worked on areas of tightness with just the right pressure while keeping the session deeply relaxing. Free parking was a lovely bonus too.",
  },
];
