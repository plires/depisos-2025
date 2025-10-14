import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FiCheck } from 'react-icons/fi' // <- icono desde react-icons
import styles from './technical-sheet-product.module.css'

/**
 * <TechnicalSheetProduct
 *   data={{ Etiqueta: "Valor", ... }}
 *   ventajas={["Item 1", "Item 2"]}
 *   titleLeft="Ficha Técnica"
 *   titleRight="Ventajas"
 *   className=""
 * />
 */
export default function TechnicalSheetProduct({
  data,
  ventajas = [],
  titleLeft = 'Ficha Técnica',
  titleRight = 'Ventajas',
  className = '',
}) {
  const rows = Object.entries(data || {})

  return (
    <section
      className={`technicalSheetProduct ${styles.technicalSheetProduct} ${className} container`}
    >
      <Row>
        <Col md={8} className={styles.contentFicha}>
          <Card className='shadow-sm h-100'>
            <Card.Body>
              <Card.Title className={`fw-bold latoBoldItalic ${styles.title}`}>
                {titleLeft}
              </Card.Title>

              <dl
                className={`${styles.list} ${styles.compact}`}
                aria-label={titleLeft}
              >
                {rows.map(([label, value]) => (
                  <div className={styles.item} key={label}>
                    <dt className={styles.dt}>{label}</dt>
                    <dd className={styles.dd}>
                      <span
                        className={styles.value}
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='shadow-sm h-100'>
            <Card.Body>
              <Card.Title
                className={`fw-bold latoBoldItalic ${styles.title} ${styles.titleVentajas}`}
              >
                {titleRight}
              </Card.Title>
              <ListGroup variant='flush' className='pt-2'>
                {ventajas.map(v => (
                  <ListGroup.Item
                    key={v}
                    className={`${styles.advItem} d-flex gap-2 align-items-start`}
                  >
                    <FiCheck className={styles.checkIcon} aria-hidden />
                    <span>{v}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  )
}

TechnicalSheetProduct.propTypes = {
  data: PropTypes.object.isRequired,
  ventajas: PropTypes.arrayOf(PropTypes.string),
  titleLeft: PropTypes.string,
  titleRight: PropTypes.string,
  className: PropTypes.string,
}
