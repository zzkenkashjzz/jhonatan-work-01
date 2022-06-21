export const BAR_CHART_DATA = [
    {
        type: 'Ene',
        sales: 38,
    },
    {
        type: 'Feb',
        sales: 20,
    },
    {
        type: 'Maz',
        sales: 70,
    },
    {
        type: 'Abr',
        sales: 125,
    },
    {
        type: 'May',
        sales: 90,
    },
    {
        type: 'Jun',
        sales: 100,
    },
    {
        type: 'Jul',
        sales: 108,
    },
    {
        type: 'Ago',
        sales: 45,
    },
    {
        type: 'Sep',
        sales: 38,
    },
    {
        type: 'Oct',
        sales: 38,
    },
    {
        type: 'Nov',
        sales: 38,
    },
    {
        type: 'Dic',
        sales: 38,
    },
];
export const BAR_CHART_CONFIG = {
    data: BAR_CHART_DATA,
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.8,
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
        },
    },
    columnStyle: {
        fill: '#d9d9d9',
    }
};
