import React from 'react'
import NextImage from 'next/image'
import type { ImageProps } from 'next/image'
import clsx from 'clsx'

export default function Image(props: ImageProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [src, setSrc] = React.useState(props.src)

  React.useEffect(() => setSrc(props.src), [props.src])

  return (
    <NextImage
      {...props}
      src={src}
      alt={props.alt}
      className={clsx(isLoading ? 'blur-[2px]' : 'blur-0', props.className)}
      onLoadingComplete={async () => {
        setIsLoading(false)
      }}
      onError={() => {
        setSrc(`https://avatar.vercel.sh/${props.alt}`)
      }}
    />
  )
}
