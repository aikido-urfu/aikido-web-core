import React from 'react'
import ContentLoader from 'react-content-loader'

const UserDiscussionSkeleton = (props: any) => (
  <ContentLoader
    speed={1}
    width={240}
    height={80}
    viewBox='0 0 240 80'
    backgroundColor='#f5f5f5'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='48' y='8' rx='3' ry='3' width='88' height='6' />
    <rect x='48' y='30' rx='3' ry='3' width='100' height='6' />
    <rect x='48' y='56' rx='3' ry='3' width='60' height='6' />
    <rect x='130' y='56' rx='3' ry='3' width='120' height='6' />
    <circle cx='20' cy='20' r='18' />
  </ContentLoader>
)

export default UserDiscussionSkeleton
