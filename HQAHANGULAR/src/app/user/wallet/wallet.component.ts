import { Component, OnInit } from '@angular/core';
// declare var jQuery;
// declare var $;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  // cashbackMoney = {
  //   base: 0,
  //   cashback: 0,
  //   total: 0
  // };


  constructor() { }

  ngOnInit(): void {
  }

  // addMoneyByClick(money, cashbackto) {
  //   jQuery('.addMoneyInput').val(money);
  //   this.cashbackMoney = {
  //     base: money,
  //     cashback: cashbackto,
  //     total : Number(money) + Number(cashbackto)
  //   };
  // }
}

