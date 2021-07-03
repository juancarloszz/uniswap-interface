import React, { useMemo } from 'react'
import { Axis as d3Axis, axisBottom, NumberValue, ScaleLinear, select } from 'd3'
import styled from 'styled-components/macro'

const StyledGroup = styled.g`
  /* will apply to <text> and <line> */
  color: ${({ theme }) => theme.text2};
`

const Axis = ({ axisGenerator }: { axisGenerator: d3Axis<NumberValue> }) => {
  const axisRef = (axis: SVGGElement) => {
    axis &&
      select(axis)
        .call(axisGenerator)
        .call((g) => g.select('.domain').remove())
  }

  return <g ref={axisRef} />
}

export const AxisBottom = ({
  xScale,
  innerHeight,
  offset = 5,
}: {
  xScale: ScaleLinear<number, number>
  innerHeight: number
  offset?: number
}) =>
  useMemo(
    () => (
      <StyledGroup transform={`translate(0, ${innerHeight + offset})`}>
        <Axis axisGenerator={axisBottom(xScale).ticks(6)} />
      </StyledGroup>
    ),
    [innerHeight, offset, xScale]
  )