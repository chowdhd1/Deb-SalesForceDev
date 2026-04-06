import { LightningElement, api , wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import BASEPATH from "@salesforce/community/basePath";
import LANG from "@salesforce/i18n/lang";

export default class RecordDetail extends NavigationMixin(LightningElement) {
    @api objectApiName;
    @api recordId;
    @api actionName = 'view';
    baseUrl;

    @api showCopyURLButton;



    get _siteUrl() {
        let siteUrl = window.location.origin + BASEPATH.replace(`/${LANG}`, "");
        if (siteUrl.includes("live-preview.salesforce-experience")) {
            siteUrl = siteUrl.replace("live-preview.salesforce-experience", "my.site")
        }
        return siteUrl;
    }

    navigateToRecordList() {
        /*this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: this.objectApiName,
                actionName: 'home'
            }
        });*/
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Order',
                actionName: 'view'
            }
        });
    }

    async copyToClipBoard(){
        console.log('url in JS-->',window.location.href);
        var url = this._siteUrl+'/agrimercado/order/'+this.recordId+'/detail';
        console.log('MOdidfied URL-->'+url);
        if (navigator.clipboard && window.isSecureContext) {
            this.displayToast('Sucess','URL Copied', 'success', 'dismissable');
            return navigator.clipboard.writeText(url);
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                document.execCommand("copy") ? res() : rej();
                textArea.remove();
                this.displayToast('Sucess','URL Copied', 'success', 'dismissable');
            });
        }
    }

    displayToast(title, message, variant, mode) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
                mode: mode
            })
        );
    }
}