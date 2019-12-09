import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {
  }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client =>
      this.client = client);
  }

  onSubmit({value, valid}: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      // add id to client
      value.id = this.id;
      // update client
      this.clientService.updateClient(value);
      this.flashMessage.show('client updated', {
        cssClass: 'alert-success', timeout: 3000
      });
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
