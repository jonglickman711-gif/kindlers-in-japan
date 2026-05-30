export const travelers = [
  { id: 'jon', name: 'Jon', emoji: '⛩️', effect: 'shrine-glow' },
  { id: 'dani', name: 'Dani', emoji: '🍣', effect: 'sparkle-shine' },
  { id: 'safta', name: 'Safta', emoji: '🌸', effect: 'petals-drift' },
  { id: 'lynn', name: 'Lynn', emoji: '🎋', effect: 'bamboo-sway' },
  { id: 'david-chaim', name: 'David/Chaim', emoji: '🎎', effect: 'doll-bounce' },
  { id: 'alon', name: 'Alon', emoji: '🌳', effect: 'falling-leaf' },
  { id: 'ben', name: 'Ben', emoji: '🍜', effect: 'ramen-steam' },
  { id: 'reb', name: 'Reb', emoji: '🍱', effect: 'bento-pop' },
  { id: 'maggot', name: 'Maggot', emoji: '🥟', effect: 'dumpling-bounce' },
]

const img = (id) =>
  id.startsWith('http') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=84`
const hero = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=86`
const commons = (file) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1400`

const option = ({ id, title, details, image, notes, rsvpMode = 'single' }) => ({
  id,
  title,
  details,
  image,
  notes,
  rsvpMode,
})

export const tripDays = [
  {
    id: '2026-09-13-kyoto',
    date: 'Sunday 9/13',
    city: 'Kyoto',
    hotel: 'Kyoto base hotel',
    travel: 'Transfer into Kyoto, settle bags, keep the first day flexible.',
    mood: 'Arrival glow',
    heroImage: hero('photo-1493976040374-85c8e12f0c0e'),
    sections: [
      {
        id: 'kyoto-913-morning',
        time: 'Morning',
        options: [
          option({
            id: 'kyoto-913-morning-travel',
            title: 'Travel to Kyoto',
            details: 'A soft landing day built around the train in, luggage drop, and first impressions of the city.',
            notes: 'Keep snacks and IC cards easy to reach.',
            image: img('photo-1545569341-9eb8b30979d9'),
          }),
        ],
      },
      {
        id: 'kyoto-913-midday',
        time: 'Midday',
        options: [
          option({
            id: 'kyoto-913-midday-temple-walk',
            title: 'Kodai-ji / Kennin-ji / Maruyama Park walk',
            details: 'A gentle Higashiyama temple-and-park loop after check-in.',
            notes: 'Mutually exclusive with chopstick making for this block.',
            image: img('photo-1624253321171-1be53e12f5f4'),
            rsvpMode: 'exclusiveGroup',
          }),
          option({
            id: 'kyoto-913-midday-chopsticks',
            title: 'Chopstick-making activity',
            details: 'Hands-on craft session for a slower, indoor Kyoto arrival option.',
            image: commons('Chopsticks (PSF).jpg'),
            rsvpMode: 'exclusiveGroup',
          }),
        ],
      },
      {
        id: 'kyoto-913-night',
        time: 'Night',
        options: [
          option({
            id: 'kyoto-913-night-pontocho-gion',
            title: 'Pontocho dinner and Gion wandering',
            details: 'Dinner along the alley lights, then a slow lantern walk through Gion.',
            notes: 'Good night for first group photos.',
            image: img('photo-1528360983277-13d401cdc186'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-14-kyoto',
    date: 'Monday 9/14',
    city: 'Kyoto',
    hotel: 'Kyoto base hotel',
    travel: 'Local transit and taxis as needed.',
    mood: 'Torii gate morning',
    heroImage: hero('photo-1478436127897-769e1b3f0f36'),
    sections: [
      {
        id: 'kyoto-914-morning',
        time: 'Morning',
        options: [
          option({
            id: 'kyoto-914-morning-fushimi-guide',
            title: 'Half-day private guide at Fushimi Inari Taisha',
            details: 'Guided shrine context, torii paths, and quiet photo moments.',
            notes: 'Earlier start means softer light and fewer crowds.',
            image: img('photo-1526481280693-3bfa7568e0f3'),
          }),
        ],
      },
      {
        id: 'kyoto-914-midday',
        time: 'Midday',
        options: [
          option({
            id: 'kyoto-914-midday-mini-hike',
            title: 'Continue Fushimi Inari trail mini hike',
            details: 'Stay on the mountain a little longer for forested paths and city glimpses.',
            image: img('photo-1526481280693-3bfa7568e0f3'),
            rsvpMode: 'exclusiveGroup',
          }),
          option({
            id: 'kyoto-914-midday-tea-nishiki',
            title: 'Tea ceremony and Nishiki Market',
            details: 'A calmer cultural reset followed by Kyoto market browsing and snacks.',
            image: img('photo-1557872943-16a5ac26437e'),
            rsvpMode: 'exclusiveGroup',
          }),
        ],
      },
      {
        id: 'kyoto-914-night',
        time: 'Night',
        options: [
          option({
            id: 'kyoto-914-night-sushi-dessert',
            title: 'Conveyor belt sushi and dessert wandering',
            details: 'Easy dinner, playful ordering, then sweets and side streets.',
            notes: 'Low ceremony, high fun.',
            image: img('photo-1579871494447-9811cf80d66c'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-15-kyoto',
    date: 'Tuesday 9/15',
    city: 'Kyoto',
    hotel: 'Kyoto base hotel',
    travel: 'Morning west to Arashiyama, optional afternoon distillery transfer.',
    mood: 'Bamboo and whisky',
    heroImage: hero('photo-1522383225653-ed111181a951'),
    sections: [
      {
        id: 'kyoto-915-morning',
        time: 'Morning',
        options: [
          option({
            id: 'kyoto-915-morning-arashiyama',
            title: 'Early Arashiyama Bamboo Grove and Tenryu-ji',
            details: 'Early bamboo walk followed by garden and temple time at Tenryu-ji.',
            notes: 'Start early enough to beat tour bus rhythm.',
            image: commons('Arashiyama Bamboo Grove.jpg'),
          }),
        ],
      },
      {
        id: 'kyoto-915-midday',
        time: 'Midday',
        options: [
          option({
            id: 'kyoto-915-midday-suntory',
            title: 'Suntory Distillery lottery tour',
            details: 'Whisky distillery visit if lottery tickets land.',
            notes: 'Decision point until ticket results.',
            image: img('photo-1550852074-9f912b1e6bf5'),
            rsvpMode: 'exclusiveGroup',
          }),
          option({
            id: 'kyoto-915-midday-flex-kyoto',
            title: 'Kyoto shopping / flexible exploration / Nishiki Market',
            details: 'Stay in Kyoto for shopping, market grazing, and flexible neighborhood time.',
            image: commons('Inside versace store.jpg'),
            rsvpMode: 'exclusiveGroup',
          }),
        ],
      },
      {
        id: 'kyoto-915-night',
        time: 'Night',
        options: [
          option({
            id: 'kyoto-915-night-pizza',
            title: 'Neapolitan pizza dinner',
            details: 'A comfort-night table after a long Kyoto day.',
            notes: 'Good reset meal.',
            image: img('photo-1593560708920-61dd98c46a4e'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-16-osaka',
    date: 'Wednesday 9/16',
    city: 'Osaka day trip',
    hotel: 'Return to Kyoto base hotel',
    travel: 'Train Kyoto to Osaka in the morning, return after evening activity.',
    mood: 'Market neon',
    heroImage: hero('photo-1590253230532-a67f6bc61c9e'),
    sections: [
      {
        id: 'osaka-916-morning',
        time: 'Morning',
        options: [
          option({
            id: 'osaka-916-morning-castle',
            title: 'Travel to Osaka and Osaka Castle',
            details: 'Train into the city, then castle grounds and skyline views.',
            notes: 'Good walking shoes day.',
            image: img('photo-1590559899731-a382839e5549'),
          }),
        ],
      },
      {
        id: 'osaka-916-midday',
        time: 'Midday',
        options: [
          option({
            id: 'osaka-916-midday-food-crawl',
            title: 'Osaka food crawl: Kuromon, Dotonbori, Hozenji, optional Shinsekai',
            details: 'Market grazing, canal neon, alley shrines, and optional retro Shinsekai.',
            notes: 'The big street-food choice.',
            image: img('photo-1590253230532-a67f6bc61c9e'),
            rsvpMode: 'exclusiveGroup',
          }),
          option({
            id: 'osaka-916-midday-aquarium-teamlab',
            title: 'Non-food Osaka option: Aquarium or TeamLab Botanical Garden',
            details: 'A visual, non-food route for anyone who wants a calmer Osaka afternoon.',
            image: img('photo-1518837695005-2083093ee35b'),
            rsvpMode: 'exclusiveGroup',
          }),
        ],
      },
      {
        id: 'osaka-916-night',
        time: 'Night',
        options: [
          option({
            id: 'osaka-916-night-return',
            title: 'Evening activity, then travel back to Kyoto',
            details: 'Finish the chosen Osaka route and return to Kyoto together or in smaller groups.',
            notes: 'Book timed entries once the group picks.',
            image: img('photo-1590253230532-a67f6bc61c9e'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-17-tokyo',
    date: 'Thursday 9/17',
    city: 'Tokyo',
    hotel: 'Tokyo base hotel',
    travel: 'Shinkansen from Kyoto to Tokyo, then local guided touring.',
    mood: 'Capital shift',
    heroImage: hero('photo-1540959733332-eab4deabeeaf'),
    sections: [
      {
        id: 'tokyo-917-morning',
        time: 'Morning',
        options: [
          option({
            id: 'tokyo-917-morning-travel',
            title: 'Travel to Tokyo',
            details: 'Train transfer, hotel bag drop, and first city recalibration.',
            notes: 'Watch for Fuji views if seats cooperate.',
            image: img('photo-1503899036084-c55cdd92da26'),
          }),
        ],
      },
      {
        id: 'tokyo-917-midday',
        time: 'Midday',
        options: [
          option({
            id: 'tokyo-917-midday-guided-tour',
            title: 'Guided Tokyo tour: Sensoji and Kappabashi Street',
            details: 'Half-day guided introduction through old Tokyo, temple streets, and kitchenware hunting.',
            notes: 'Leave bag space for knives, ceramics, and tools.',
            image: img('photo-1545569341-9eb8b30979d9'),
          }),
        ],
      },
      {
        id: 'tokyo-917-night',
        time: 'Night',
        options: [
          option({
            id: 'tokyo-917-night-omakase-shibuya',
            title: 'Sushi omakase, Shibuya Crossing, Golden Gai, Omoide Yokocho',
            details: 'Sushi counter dinner into crossing lights, tiny bars, and smoky alley atmosphere.',
            notes: 'A late-night highlight if energy holds.',
            image: img('photo-1542051841857-5f90071e7989'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-18-tokyo',
    date: 'Friday 9/18',
    city: 'Tokyo',
    hotel: 'Tokyo base hotel',
    travel: 'Subway and taxis across market, shopping, and sumo neighborhoods.',
    mood: 'Markets and ringside',
    heroImage: hero('photo-1536098561742-ca998e48cbcc'),
    sections: [
      {
        id: 'tokyo-918-morning',
        time: 'Morning',
        options: [
          option({
            id: 'tokyo-918-morning-toyosu',
            title: 'Early risers: Toyosu Market inner wholesale market around 5:00 AM',
            details: 'Optional very early wake-up to see the indoor wholesale market action before the main group starts.',
            image: commons('Toyosu fish market-4a.jpg'),
            rsvpMode: 'exclusiveGroup',
          }),
          option({
            id: 'tokyo-918-morning-tsukiji',
            title: 'Sleep-in group: Tsukiji Outer Market around 8:30 AM',
            details: 'Main group meets for sushi breakfast and grilled seafood without the 5:00 AM wake-up.',
            image: img('photo-1579584425555-c3ce17fd4351'),
            rsvpMode: 'exclusiveGroup',
          }),
        ],
      },
      {
        id: 'tokyo-918-midday',
        time: 'Midday',
        options: [
          option({
            id: 'tokyo-918-midday-shopping-sumo',
            title: 'Vintage shopping and Grand Sumo Tournament',
            details: 'Designer and watch hunting before the grand tournament atmosphere.',
            notes: 'Schedule depends on ticket timing.',
            image: img('photo-1480796927426-f609979314bd'),
          }),
        ],
      },
      {
        id: 'tokyo-918-night',
        time: 'Night',
        options: [
          option({
            id: 'tokyo-918-night-ramen-drinks',
            title: 'Tokyo Ramen Street dinner and optional drinks',
            details: 'Ramen dinner with a flexible late-night drinking path for whoever is still awake.',
            notes: 'Easy opt-in night.',
            image: img('photo-1569718212165-3a8278d5f624'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-19-tokyo',
    date: 'Saturday 9/19',
    city: 'Tokyo',
    hotel: 'Tokyo base hotel',
    travel: 'Low-pressure local movement.',
    mood: 'Elegant flex',
    heroImage: hero('photo-1505069446780-4ef442b5207f'),
    sections: [
      {
        id: 'tokyo-919-morning',
        time: 'Morning',
        options: [
          option({
            id: 'tokyo-919-morning-flex',
            title: 'Flexible time',
            details: 'Sleep in, coffee, neighborhood wandering, or revisit a favorite shop.',
            notes: 'No guilt block.',
            image: img('photo-1513407030348-c983a97b98d8'),
          }),
        ],
      },
      {
        id: 'tokyo-919-midday',
        time: 'Midday',
        options: [
          option({
            id: 'tokyo-919-midday-palace-ginza',
            title: 'Imperial Palace and Ginza',
            details: 'A polished Tokyo afternoon through palace edges and Ginza storefronts.',
            notes: 'Good day for slower pairs or small groups.',
            image: img('photo-1542051841857-5f90071e7989'),
          }),
        ],
      },
      {
        id: 'tokyo-919-night',
        time: 'Night',
        options: [
          option({
            id: 'tokyo-919-night-free',
            title: 'Relaxed free evening',
            details: 'Keep the last full night open for favorites, packing, or one more perfect meal.',
            notes: 'Let the group split naturally.',
            image: img('photo-1542931287-023b922fa89b'),
          }),
        ],
      },
    ],
  },
  {
    id: '2026-09-20-tokyo',
    date: 'Sunday 9/20',
    city: 'Tokyo',
    hotel: 'Departures',
    travel: 'Separate airport transfers and onward travel.',
    mood: 'Departure morning',
    heroImage: hero('photo-1436491865332-7a61a109cc05'),
    sections: [
      {
        id: 'tokyo-920-morning',
        time: 'Morning',
        options: [
          option({
            id: 'tokyo-920-morning-travel-home',
            title: 'Travel home / separate departures',
            details: 'Airport transfers, luggage checks, and separate goodbye timing.',
            notes: 'Keep passports and souvenirs close.',
            image: img('photo-1436491865332-7a61a109cc05'),
            rsvpMode: 'none',
          }),
        ],
      },
      {
        id: 'tokyo-920-midday',
        time: 'Midday',
        options: [
          option({
            id: 'tokyo-920-midday-departures',
            title: 'Departures',
            details: 'Staggered departures and final station or airport meals.',
            notes: 'Minimal planning, maximum calm.',
            image: img('photo-1521727857535-28d2047619b7'),
            rsvpMode: 'none',
          }),
        ],
      },
    ],
  },
]

export const allActivities = tripDays.flatMap((day) =>
  day.sections.flatMap((section) =>
    section.options.map((activity) => ({
      ...activity,
      sectionId: section.id,
      dayId: day.id,
      date: day.date,
      time: section.time,
      city: day.city,
      hotel: day.hotel,
      travel: day.travel,
    })),
  ),
)
