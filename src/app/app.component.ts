import { Component } from '@angular/core';
import {FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'formDynamic';
  exampleForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.exampleForm = this.fb.group(
      {
        email: [null, [Validators.required]],
        phone: [null],
        tickets: this.fb.array([this.createTicket()])
      }
    )
  }

  createTicket():FormGroup{
    return this.fb.group({
      name:[null, [Validators.required, Validators.minLength(3)]],
      age: [null,[Validators.required]]
    })
  }

  get tickets():FormArray{
    return <FormArray> this.exampleForm.get("tickets");
  }

  addTicket() {
    this.tickets.push(this.createTicket());
  }

  deleteTicket(i: number) {
    this.tickets.controls.splice(i,1);
    this.tickets.updateValueAndValidity();
  }

  ngOnInit(){

  }

  save(){
    console.log(this.tickets.value)
  }
}
