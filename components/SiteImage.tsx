import Image from "next/image"

type SiteImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
}

export default function SiteImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className = "",
  sizes,
}: SiteImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={`object-cover ${className}`}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 900}
      height={height ?? 600}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      className={className}
    />
  )
}
