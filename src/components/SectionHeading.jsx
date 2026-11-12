export default function SectionHeading({ id, title, intro }) {
  return (
    <div className="mb-8">
      <h2 id={id} className="font-display text-3xl font-bold sm:text-4xl">
        <span className="grad-text">{title}</span>
      </h2>
      {intro && <p className="mt-2 max-w-prose text-mute">{intro}</p>}
    </div>
  )
}
