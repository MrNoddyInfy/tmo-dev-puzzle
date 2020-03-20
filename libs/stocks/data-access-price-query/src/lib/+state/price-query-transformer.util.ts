import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick, filter } from 'lodash-es';
import { parse } from 'date-fns';

export function transformPriceQueryResponse(
  response: PriceQueryResponse[],
  customDate: { fromDate: Date; toDate: Date }
): PriceQuery[] {
  // filter data based on custom start and end dates
  response = filter(response, responseItem => {
    const itemDate = new Date(responseItem.date);
    itemDate.setHours(0, 0, 0, 0); // to overcome default local time hours added by new Date()
    return itemDate >= customDate.fromDate && itemDate <= customDate.toDate;
  });

  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'date',
          'open',
          'high',
          'low',
          'close',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
