import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  FetchPriceQuery,
  SetCustomDates,
  ShowAlert
} from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getAllPriceQueries, getError } from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  priceQueriesError$ = this.store.pipe(select(getError));
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, period: string, fromDate: Date, toDate: Date) {
    this.store.dispatch(new SetCustomDates(fromDate, toDate));
    this.store.dispatch(new FetchPriceQuery(symbol, period));
  }

  showAlert(msg: string) {
    this.store.dispatch(new ShowAlert(msg));
  }
}
