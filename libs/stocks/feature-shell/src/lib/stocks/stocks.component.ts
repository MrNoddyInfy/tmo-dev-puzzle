import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { STOCK_CONSTANTS } from './stocks.constants';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  data: (string | number)[][];
  maxDate = new Date();

  changesSubscription: Subscription;
  errorSubscription: Subscription;
  quotesSubscription: Subscription;

  quotes$ = this.priceQuery.priceQueries$;
  quotesError$ = this.priceQuery.priceQueriesError$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.errorSubscription = this.quotesError$.subscribe(err => {
      if (err) {
        const errMsg =
          typeof err.error === 'string'
            ? err.error
            : STOCK_CONSTANTS.UNKNOWN_ERROR_MSG;
        this.priceQuery.showAlert(errMsg);
      }
    });

    this.quotesSubscription = this.quotes$.subscribe(data => {
      this.data = data;
      if (this.data.length === 0)
        this.priceQuery.showAlert(STOCK_CONSTANTS.NO_DATA_MSG);
    });

    this.changesSubscription = this.stockPickerForm.valueChanges.subscribe(
      () => {
        const formValue = this.stockPickerForm.value;
        if (formValue.fromDate > formValue.toDate && formValue.toDate) {
          this.stockPickerForm.patchValue({ fromDate: formValue.toDate });
        }
      }
    );
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, fromDate, toDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(
        symbol,
        STOCK_CONSTANTS.REQ_PARAM_MAX,
        fromDate,
        toDate
      );
    }
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.quotesSubscription.unsubscribe();
  }
}
