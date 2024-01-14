import React, {useEffect} from 'react';
import { ResponsiveLine } from '@nivo/line'
import {getAccountList, getIncomeList, getIncomeSourceList} from "../../features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import moment from "moment";

const LineChart = () => {
    const dispatch = useDispatch();
    const {accountId} = useParams()

   /* useEffect(() => {
        dispatch(getAccountList())
    }, []);
    useEffect(() => {
        dispatch(getIncomeList())
    }, []);*/

    useEffect(() => {
        dispatch(getIncomeList())
    }, []);

    const incomeList = useSelector(state => state.user.userIncomes);
    const accountList = useSelector(state => state.user.userAccounts);
    console.log('incomeListGRAPG',incomeList)

    const filteredData = incomeList.filter(income =>
        income.account_id === Number(accountId) &&
        income.time_at && moment(income.time_at, 'YYYY-MM-DDTHH:mm:ss', true).isValid()
    );

    const data = filteredData.length > 0 ? [{
        id: "Income",
        data: filteredData.map(income => ({
            x: moment(income.time_at).format('YYYY-MM-DD'),
            y: income.amount
        }))
    }] : [];

    const customTooltip = (point) => {
        return (
            <div style={{ background: 'white', padding: '5px', border: '1px solid black' }}>
                {point.point.data.y}
            </div>
        );
    };

    if (data.length === 0) {
        return <div>NO DATA</div>;
    }

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
                type: 'time',
                format: '%Y-%m-%d',
                precision: 'day'
            }}
            tooltip={customTooltip}
            xFormat="time:%Y-%m-%d"
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=""
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: '%b %d',
                tickValues: 'every day',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Дата',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
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