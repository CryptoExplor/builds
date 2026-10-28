/**
 * The icon set. Import everything from here, never from an icon package.
 *
 *   import { Github, ArrowLeft, CheckCircle } from '@/app/components/icons'
 *
 * Every mark is a hand drawn SVG defined in ./icon-data.mjs, so this file is
 * the only icon import surface in the codebase. One size prop, one stroke
 * weight, one colour: `currentColor`, so icons always match their text.
 *
 * Props: size (default 24), className, strokeWidth (default 1.5), title.
 * With no `title` the icon is decorative and hidden from assistive tech. Pass
 * a title and it becomes a labelled image instead.
 */
import { ICONS } from './icon-data.mjs'

function renderOp([tag, attrs], index) {
  const key = `${tag}-${index}`
  if (tag === 'path') return <path key={key} d={attrs.d} />
  if (tag === 'circle') return <circle key={key} cx={attrs.cx} cy={attrs.cy} r={attrs.r} />
  if (tag === 'rect') {
    return (
      <rect
        key={key}
        x={attrs.x}
        y={attrs.y}
        width={attrs.width}
        height={attrs.height}
        rx={attrs.rx}
      />
    )
  }
  return null
}

function createIcon(name) {
  const icon = ICONS[name]
  if (!icon) throw new Error(`[icons] unknown icon "${name}"`)

  function Icon({ size = 24, className = '', strokeWidth = 1.5, title, ...rest }) {
    const filled = Boolean(icon.filled)
    const labelled = Boolean(title)

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={filled ? undefined : strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={labelled ? 'img' : undefined}
        aria-hidden={labelled ? undefined : 'true'}
        focusable="false"
        className={className}
        {...rest}
      >
        {labelled ? <title>{title}</title> : null}
        {icon.ops.map(renderOp)}
      </svg>
    )
  }

  Icon.displayName = name
  return Icon
}

export const Github = createIcon('github')
export const XSocial = createIcon('xSocial')

export const ArrowLeft = createIcon('arrowLeft')
export const ArrowUpRight = createIcon('arrowUpRight')
export const External = createIcon('external')
export const Menu = createIcon('menu')
export const Close = createIcon('close')

export const Globe = createIcon('globe')
export const MapPin = createIcon('mapPin')
export const Calendar = createIcon('calendar')
export const Mail = createIcon('mail')
export const Tag = createIcon('tag')
export const Boxes = createIcon('boxes')

export const Search = createIcon('search')
export const SearchX = createIcon('searchX')
export const Filter = createIcon('filter')
export const Plus = createIcon('plus')
export const Trash = createIcon('trash')

export const CheckCircle = createIcon('checkCircle')
export const Alert = createIcon('alert')
export const Shield = createIcon('shield')
export const Star = createIcon('star')

export const Zap = createIcon('zap')
export const Code = createIcon('code')
export const Target = createIcon('target')
export const Rocket = createIcon('rocket')
export const Compass = createIcon('compass')
export const Layers = createIcon('layers')
export const Cube = createIcon('cube')
export const Route = createIcon('route')
export const ChartUp = createIcon('chartUp')

/** Name to component, for anything that picks an icon from data. */
export const ICON_SET = {
  github: Github,
  xSocial: XSocial,
  arrowLeft: ArrowLeft,
  arrowUpRight: ArrowUpRight,
  external: External,
  menu: Menu,
  close: Close,
  globe: Globe,
  mapPin: MapPin,
  calendar: Calendar,
  mail: Mail,
  tag: Tag,
  boxes: Boxes,
  search: Search,
  searchX: SearchX,
  filter: Filter,
  plus: Plus,
  trash: Trash,
  checkCircle: CheckCircle,
  alert: Alert,
  shield: Shield,
  star: Star,
  zap: Zap,
  code: Code,
  target: Target,
  rocket: Rocket,
  compass: Compass,
  layers: Layers,
  cube: Cube,
  route: Route,
  chartUp: ChartUp,
}
