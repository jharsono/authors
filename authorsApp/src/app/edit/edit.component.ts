import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  author: any;
  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.showAuthor();
  }
  showAuthor() {
    let observable = this._httpService.returnAuthor(); //getAuthor is invoked from http.service
    observable.subscribe(data => {
        console.log("Got our data!", data);
        this.author = data; //put data into author objects
        console.log("this author: ", this.author);
      }); // subscribe
    }
    update(){
      console.log("NEW AUTHOR INFO:", this.author);
      let observable = this._httpService.update(this.author);
      observable.subscribe(author => {
        console.log("editing author", author);
        //go to another route?
        this.router.navigate(['home']);
      })
    }




}
