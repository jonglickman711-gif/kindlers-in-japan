import { Compass, Hotel, Utensils } from 'lucide-react'

const pillars = [
  { icon: Compass, label: 'Route clarity', copy: 'Each stay has a purpose, transit stays visible, and days avoid overpacking.' },
  { icon: Hotel, label: 'Rest anchors', copy: 'Ryokan nights, neighborhood bases, and buffer blocks are part of the plan.' },
  { icon: Utensils, label: 'Food memory', copy: 'Meals are treated as scenes, from counter seats to market grazing.' },
]

function PacePanel() {
  return (
    <section id="pace" className="bg-foreground px-4 py-20 text-background sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase text-background/55">Planning logic</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">
            Built for atmosphere, but organized for decisions.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, label, copy }) => (
            <div key={label} className="border border-background/15 bg-background/8 p-5">
              <Icon className="size-5 text-accent" />
              <h3 className="mt-8 font-serif text-2xl font-semibold">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-background/65">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PacePanel
