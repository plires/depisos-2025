import './arrows.css'

const CustomPrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      // style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  )
}

export default CustomPrevArrow
