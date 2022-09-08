import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private walletAddress: BehaviorSubject<string> = new BehaviorSubject('');
  public $walletAddress: Observable<string> = this.walletAddress.asObservable();

  constructor() { 
    if(window.ethereum){

      window.ethereum.on('chainChanged', () => window.location.reload());

      window.ethereum.on('accountsChanged', (accounts: Array<any>) => {
        if(accounts.length > 0){
          this.setWalletAddress(accounts[0]);
        } else {
          console.error('0 accounts');
        }
      });

      window.ethereum.on('message', (message: any) => {
        console.log(message);
      });

      window.ethereum.on('connect', (info: any) => {
        console.log(`Connected to network ${JSON.stringify(info)}`);
      });

      window.ethereum.on('disconnect', (error: any) => {
        console.log(`Disconnect from network ${error}`)
      });
      
    } else {
      console.error('Install MetaMask.');
    }
  }

  public connectMetaMask(){
    window.ethereum.request({ method: "eth_requestAccounts" }).then((res: Array<string>) => {
      this.setWalletAddress(res[0]);
    }).catch((ex: any) => {
      console.error(ex);
    });
  }

  public setWalletAddress(walletAddress: string){
    this.walletAddress.next(walletAddress);
  }
}
