import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newAuthor = {name:""}; // bind new author

  constructor(private _httpService: HttpService, private router: Router){ }

  ngOnInit() {
  }
  addAuthor(){
    console.log(this.newAuthor);
    let observable = this._httpService.new(this.newAuthor); //pass the newTask into service
    observable.subscribe(author => {
      console.log("adding a author", author);
      this.router.navigate(['/home']);

    })
  }
}
