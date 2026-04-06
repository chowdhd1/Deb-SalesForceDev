import { LightningElement, api } from "lwc";

export default class MySpinner extends LightningElement {
    @api site;
    @api funcs;
    @api richtext;

    get _wrapClass() {
        return 'my-spinner syn-component-wrap def';        
    }
}