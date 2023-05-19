import clsx from 'clsx'

interface Props {
  className?: string
  children: React.ReactNode
  el?: HTMLElement | any
  clean?: boolean
}

export default function Wrapper({ children, className, el = 'div', clean = false }: Props) {
  const rootClassName = clsx(className, {
    'flex justiy-center max-w-[950px] mx-auto': !clean,
  })

  const Component: React.ComponentType<React.HTMLAttributes<HTMLElement>> = el as any

  return <Component className={rootClassName}>{children}</Component>
}
