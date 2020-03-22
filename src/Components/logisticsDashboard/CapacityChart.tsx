import React, {Fragment} from 'react'
import {
    VictoryArea,
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryZoomContainer,
    VictoryLabel,
    VictoryLegend
} from 'victory';

type Capacity = {
    interval: { begin: Date, end: Date },
    capacity: number
}

type Demand = {
    date: Date[], qty: number[]
}

type Point = { x: Date, y: number }

export interface CapacityChartProps {
    capacities: { apn: Capacity[], nl: Capacity[], tool: Capacity[] }
    demand: Demand
}


export const CapacityChart = (props: { data: CapacityChartProps }) => {


    const demandDataMaker = (demand: Demand) => demand.qty.map(
        (_: number, key: number) => {
            return {"x": new Date(demand.date[key]), "y": demand.qty[key]}
        }
    )

    const capacityDataMaker = (capacities: Capacity[]) => {
        const points: Point[] = []
        capacities.map(
            (obj) =>
                points.push(
                    {
                        x: new Date(obj.interval.begin),
                        y: obj.capacity
                    }, {
                        x: new Date(obj.interval.end),
                        y: obj.capacity
                    })
        )
        return points
    }


    return (
        <Fragment>
            <VictoryChart
                scale={{x: "time"}}
                theme={VictoryTheme.material}
                height={300} width={1000}
                animate={{
                    duration: 800,
                }}
                containerComponent={
                    <VictoryZoomContainer/>
                }
            >
                <VictoryArea data={demandDataMaker(props.data.demand)} style={{data: {fill: "grey", opacity: 0.3}}}/>
                <VictoryLine style={{data: {stroke: "blue"}}} data={capacityDataMaker(props.data.capacities.apn)}/>
                <VictoryLine style={{data: {stroke: "green"}}} data={capacityDataMaker(props.data.capacities.nl)}/>
                <VictoryLine style={{data: {stroke: "red"}}} data={capacityDataMaker(props.data.capacities.tool)}/>
                <VictoryLegend x={800} y={50}
                               standalone={true}
                               orientation="horizontal"
                               data={[
                                   {name: "nl", symbol: {fill: "green"}},
                                   {name: "apn", symbol: {fill: "blue"}},
                                   {name: "tool", symbol: {fill: "red"}}
                               ]}/>
            </VictoryChart>
        </Fragment>
    )
}