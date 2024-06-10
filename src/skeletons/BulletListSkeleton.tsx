import React from 'react'
import ContentLoader from 'react-content-loader'

const BulletList = (props: any) => (
  <ContentLoader
    viewBox='0 0 475 32'
    height={32}
    width={475}
    speed={1}
    backgroundColor='#f5f5f5'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect rx='6' ry='6' width='475' height='32' />
  </ContentLoader>
)

export default BulletList
