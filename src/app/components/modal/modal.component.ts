import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() message: string;
  @Input() confirm: string;
  @Output() toggleModal = new EventEmitter<void>();
  @Output() ifConfirm = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
