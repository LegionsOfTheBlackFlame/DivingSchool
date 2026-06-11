import HeroImage from '../../../assets/hero-image.jpg'
import React from 'react'
export default function HeroSection({ section }) {

  const textBlocks = section.blocks.filter(
  b =>
    b.block_type === 'title' ||
    b.block_type === 'text' ||
    b.block_type === 'cta'
)

  const imageBlocks = section.blocks.filter(
    b => b.block_type === 'image'
  )
  const handleCta = () => {
  const phone = '905333221082'
  const message = encodeURIComponent(
    'Hello, I would like to know more about your diving courses.'
  )

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    '_blank',
    'noopener,noreferrer'
  )
}

  return (
    <section className="hero-section">
       {imageBlocks.map(block => (
        <div key={block.id} className="hero-cell hero-media">
          <img src={HeroImage} alt="" />
          <div className='gradiant-overlay'/>
        </div>
      ))}
      <div className="hero-cell hero-text">
       <div className="text-group">
  {textBlocks.map(block => {
    if (block.block_type === 'title') {
      return <h2 key={block.id} className="headline">{block.content}</h2>
    }

    if (block.block_type === 'text') {
      return <div key={block.id} className="subtext desktop">  {block.content.split('||').map((part, i) => (
    <p key={i}>{part}</p>
  ))}
</div>
    }

    if (block.block_type === 'cta') {
      return (
       <button
  key={block.id}
  className="cta-button"
  onClick={handleCta}
>
  {block.content}
</button>
      )
    }

    return null
  })}
</div>

      </div>
    </section>
  )
}
