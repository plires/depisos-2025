import React from 'react'
import PropTypes from 'prop-types'

export default function GoogleMap({
  src,
  width = '100%',
  height = 450,
  title = 'Mapa de Google',
  className,
  style,
  allowFullScreen = true,
  loading = 'lazy',
  referrerPolicy = 'no-referrer-when-downgrade',
}) {
  return (
    <iframe
      src={src}
      width={typeof width === 'number' ? width : width}
      height={typeof height === 'number' ? height : height}
      style={{ border: 0, ...style }}
      allowFullScreen={allowFullScreen}
      loading={loading}
      referrerPolicy={referrerPolicy}
      title={title}
      className={className}
    />
  )
}

GoogleMap.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  allowFullScreen: PropTypes.bool,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  referrerPolicy: PropTypes.string,
}
