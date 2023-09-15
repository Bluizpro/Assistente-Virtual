import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  constructor() { }

  private _isModalOpen = false;

  get isModalOpen(): boolean {
    return this._isModalOpen;
  }

  set isModalOpen(value: boolean) {
    this._isModalOpen = value;
  }

}
