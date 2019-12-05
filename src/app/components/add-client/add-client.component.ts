import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean = false;
  @ViewChild('clientForm', {static: false}) from: any;

  constructor(private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onSubmit({value, valid}: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // show error
      this.flashMessage.show('please fill form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      this.flashMessage.show('new client added', {
        cssClass: 'alert-success', timeout: 1000
        // Add n client
        // show message
        // redirect to dash
      });
    }
  }
}
