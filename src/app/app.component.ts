import { Component } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import metaMaskOnboarding from '@metamask/onboarding';
import { Web3Service } from './services/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-web3-boilerplate';
  public is_metamask_install: boolean = false;

  constructor(public _web3Service: Web3Service){
    this.detectMetaMask();
  }

  private async detectMetaMask(): Promise<void> {
    const provider = await detectEthereumProvider();
    if(provider){
      this.is_metamask_install = true;
    } else {
      this.is_metamask_install = false;
    }
  }

  public installMetaMask(): void{
    const onboarding = new metaMaskOnboarding();
    onboarding.startOnboarding();
  }
}
