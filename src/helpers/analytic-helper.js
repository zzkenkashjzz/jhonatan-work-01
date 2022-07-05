import * as dayjs from "dayjs";

export function groupingSalesByPurchaseDate(chartdata) {
    const newData = [];
    // change child?.quantityByPurchaseDate for child?.SalesByPurchaseDate
    const salesByPurchaseDate = chartdata.map((dat) => dat.children.map((child) => child.quantityByPurchaseDate)).flat()
    const quantityByPurchaseDate = chartdata.map((dat) => dat.children.map((child) => child.quantityByPurchaseDate)).flat();

    salesByPurchaseDate.forEach((dates, index) =>  {
        for (const datesKey in dates) {
            if(newData.some(value => value?.type === datesKey)) {
                const indexNewData = newData.findIndex((value) => value?.type === datesKey);
                newData[indexNewData].sales += dates[datesKey]
                newData[indexNewData].quantity += quantityByPurchaseDate[index][datesKey]
            } else newData.push({type: datesKey, sales: dates[datesKey], quantity: quantityByPurchaseDate[index][datesKey]})
        }
    })
    const currentYear = dayjs().format('YYYY');
    return sortDataByDate(newData.filter(value => dayjs(value.type).format('YYYY') === dayjs().format('YYYY')))
}


function sortDataByDate (data = []) {
    console.log(data);
    return data.sort((a, b) => new Date(a.type) - new Date(b.type));
}
