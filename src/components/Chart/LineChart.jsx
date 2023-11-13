import React from 'react';
import { ResponsiveLine } from '@nivo/line'
const data = [
    {
        "id": "japan",
        "color": "hsl(18, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 247
            },
            {
                "x": "helicopter",
                "y": 247
            },
            {
                "x": "boat",
                "y": 1
            },
            {
                "x": "train",
                "y": 170
            },
            {
                "x": "subway",
                "y": 87
            },
            {
                "x": "bus",
                "y": 125
            },
            {
                "x": "car",
                "y": 184
            },
            {
                "x": "moto",
                "y": 266
            },
            {
                "x": "bicycle",
                "y": 81
            },
            {
                "x": "horse",
                "y": 150
            },
            {
                "x": "skateboard",
                "y": 95
            },
            {
                "x": "others",
                "y": 144
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(75, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 252
            },
            {
                "x": "helicopter",
                "y": 10
            },
            {
                "x": "boat",
                "y": 175
            },
            {
                "x": "train",
                "y": 179
            },
            {
                "x": "subway",
                "y": 200
            },
            {
                "x": "bus",
                "y": 186
            },
            {
                "x": "car",
                "y": 236
            },
            {
                "x": "moto",
                "y": 227
            },
            {
                "x": "bicycle",
                "y": 162
            },
            {
                "x": "horse",
                "y": 275
            },
            {
                "x": "skateboard",
                "y": 63
            },
            {
                "x": "others",
                "y": 37
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(317, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 284
            },
            {
                "x": "helicopter",
                "y": 275
            },
            {
                "x": "boat",
                "y": 168
            },
            {
                "x": "train",
                "y": 285
            },
            {
                "x": "subway",
                "y": 86
            },
            {
                "x": "bus",
                "y": 262
            },
            {
                "x": "car",
                "y": 237
            },
            {
                "x": "moto",
                "y": 216
            },
            {
                "x": "bicycle",
                "y": 152
            },
            {
                "x": "horse",
                "y": 44
            },
            {
                "x": "skateboard",
                "y": 233
            },
            {
                "x": "others",
                "y": 119
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(123, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 288
            },
            {
                "x": "helicopter",
                "y": 285
            },
            {
                "x": "boat",
                "y": 128
            },
            {
                "x": "train",
                "y": 208
            },
            {
                "x": "subway",
                "y": 241
            },
            {
                "x": "bus",
                "y": 102
            },
            {
                "x": "car",
                "y": 175
            },
            {
                "x": "moto",
                "y": 227
            },
            {
                "x": "bicycle",
                "y": 9
            },
            {
                "x": "horse",
                "y": 187
            },
            {
                "x": "skateboard",
                "y": 276
            },
            {
                "x": "others",
                "y": 108
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(175, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 146
            },
            {
                "x": "helicopter",
                "y": 136
            },
            {
                "x": "boat",
                "y": 41
            },
            {
                "x": "train",
                "y": 152
            },
            {
                "x": "subway",
                "y": 32
            },
            {
                "x": "bus",
                "y": 150
            },
            {
                "x": "car",
                "y": 130
            },
            {
                "x": "moto",
                "y": 236
            },
            {
                "x": "bicycle",
                "y": 128
            },
            {
                "x": "horse",
                "y": 36
            },
            {
                "x": "skateboard",
                "y": 268
            },
            {
                "x": "others",
                "y": 7
            }
        ]
    }
]
const LineChart = () => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

export default LineChart;