import * as React from 'react'
import styled from 'styled-components'
import { Tooltip as AriaTooltip, TooltipAnchor, useTooltipState } from 'ariakit/tooltip'
import Link from 'next/link'

interface ITooltip {
	content: string | null | React.ReactNode
	href?: string
	shallow?: boolean
	onClick?: (e: any) => any
	style?: {}
	children: React.ReactNode
	as?: any
	color?: string
	fontSize?: string
	anchorStyles?: React.CSSProperties
	placement?: 'top' | 'bottom' | 'left' | 'right'
}

const TooltipPopver = styled(AriaTooltip)`
	font-size: 0.85rem;
	padding: 1rem;
	color: ${({ theme }) => (theme.mode === 'dark' ? 'hsl(0, 0%, 100%)' : 'hsl(204, 10%, 10%)')};
	background: ${({ theme }) => (theme.mode === 'dark' ? 'hsl(204, 3%, 12%)' : 'hsl(204, 20%, 100%)')};
	border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? 'hsl(204, 3%, 32%)' : 'hsl(204, 20%, 88%)')};
	border-radius: 8px;
	filter: ${({ theme }) =>
		theme.mode === 'dark' ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 40%))' : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 15%))'};
	max-width: 228px;
	white-space: pre-wrap;
`

interface IAnchor {
	color?: string
	fontSize?: string
}

const TooltipAnchor2 = styled(TooltipAnchor)<IAnchor>`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	flex-shrink: 0;
	color: ${({ color }) => color || 'inherit'};
	font-size: ${({ fontSize }) => fontSize || 'inherit'};

	a {
		display: flex;
	}
`

const Popover2 = styled(TooltipPopver)`
	padding: 12px;
`

export default function Tooltip({ content, as, href, shallow, onClick, children, ...props }: ITooltip) {
	const tooltip = useTooltipState()

	if (!content || content === '') return <>{children}</>

	const triggerProps = {
		...(onClick && { onClick })
	}

	return (
		<>
			<TooltipAnchor state={tooltip} as={as} className="tooltip-trigger" {...triggerProps}>
				{href ? (
					<Link href={href} shallow={shallow} prefetch={false} passHref>
						<a>{children}</a>
					</Link>
				) : (
					children
				)}
			</TooltipAnchor>
			<TooltipPopver state={tooltip} {...props}>
				{content}
			</TooltipPopver>
		</>
	)
}

export function Tooltip2({ content, children, color, fontSize, anchorStyles, placement, ...props }: ITooltip) {
	const tooltip = useTooltipState({ placement })

	if (!content || content === '') return <>{children}</>

	return (
		<>
			<TooltipAnchor2 state={tooltip} color={color} fontSize={fontSize} style={anchorStyles} data-tooltipanchor>
				{children}
			</TooltipAnchor2>
			<Popover2 state={tooltip} {...props}>
				{content}
			</Popover2>
		</>
	)
}
