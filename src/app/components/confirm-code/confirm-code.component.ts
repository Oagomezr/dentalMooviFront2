import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent {

  constructor(){
    this.waitTime = 60;
    this.counter();
  }

  @Input() badCode: boolean = false;
  @Input() email: string = '';
  @Output() confirm = new EventEmitter<string>();
  @Output() reSend = new EventEmitter<void>();

  code: string = '------';

  typeCode(index: number, event: any) {
    let character = event.target.value;

    let charaters = this.code?.split('') || [''];
    
    //If the entered value is numeric, add and focus the next input
    if (/^\d*$/.test(character) && character != '') {

      charaters[index] = character;
      this.code= charaters.join('');

      let nextInput = event.target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }

    } else {
      //If the entered value is not numeric, delete the content
      event.target.value = '';
    }
  }

  waitTime: number = 0;
  counter(){

    setTimeout(() => {
      this.waitTime -= 1;
      if(this.waitTime > 0) this.counter();
    }, 1000);

  }

  confirmCode(){
    this.confirm.emit(this.code);
  }

  resendCode(){
    this.reSend.emit();
    this.waitTime = 60;
    this.counter();
  }
}
