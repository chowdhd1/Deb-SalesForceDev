import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from "@salesforce/apex";
import getCartImp from '@salesforce/apex/ReviewCartController.getcartDetails';
import decryptWithMetadata from '@salesforce/apex/CommerceUtilsService.decryptWithMetadata';
import IS_GUEST from "@salesforce/user/isGuest";


export default class DtpReviewOrderPage extends NavigationMixin(LightningElement) {
    @api site;
    @api metadataSummary;
    @api metadataOrderTerms;
    @api metadataReviewProducts;
    @api currentCartId;
    @api companyId;
    @api metadataSummaryReview;
    @api metadataSummaryOrdReview;
    @api metadataReviewProductHeader;
    @api metadataReviewProductHeaderreview;
    @api metadataReviewProductTable;
    @api metadataReviewProductfooter;
    @api reviewCartheaderMetaDefinitionUniqueKey;
    @api reviewCartTableMetaDefinitionUniqueKey;
    @api reviewCartfooterMetaDefinitionUniqueKey;
    @api reviewCartConfirmUniqueKey;
    @api shippingNote;
    @track showSpinner;
    @track message;
    @track currentStep;
    @track products;
    @track topSummary = 0;
    @track widthSummary = 0;
    @track fixRight;
    @track refresh;
    @track status;
    @track isGrower=true;
    @track orderId;
    @track orderDate;
    @track termsOk;
    @track getCartWireResult;
    @track currentCart;
    @track outlineCheckboxes;
    @track reviewOk=false;
    @track placeOrderDt;
    @track urlParams='';

    constructor() {
        super();  

        //TODO for now step 0 is review
        this.currentStep = 0;

        
    }

    // @wire(getCartImp, { cartId: "$currentCartId" })
    // getCartImpWire(result) {
    //     this.getCartWireResult = result;
    //     const { data, error } = result;
    //     if (data) {
    //         this.currentCart = data;
    //         console.log('data:::'+data);
    //         console.log('this.currentCart:::'+this.currentCart);           
    //     }
    //     else if (error) {
    //         console.error(error);
    //     }
    // }

    renderedCallback() {
        if(!this.topSummary) {
            this.topSummary = -1;
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                this.setSummaryPos();        
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                this.intervalId = setInterval(() => {
                    this.setSummaryPos();
                }, 1000);     
            }, 200);            
        }
    }    

    connectedCallback() {
          const urlParams =new URL(window.location.href);
          this.decryptUrlParam(urlParams.searchParams.get("way"));
           const params = new URLSearchParams(this.urlParams);
        this.companyId= this.companyId || params.get("AccountId");
        this.currentCartId=this.currentCartId || params.get("cartId");
        this.isGrower = IS_GUEST;
        if(!this.companyId){
            this.companyId=window.sessionStorage.getItem("companyId");
        }
        if(!this.currentCartId){
            this.currentCartId=window.sessionStorage.getItem("cartid");
        }
        console.log('curretn cart id :'+this.currentCartId);
        getCartImp({ cartId: this.currentCartId })
        .then((result) => {
            console.log('called');
            this.currentCart = result;
            console.log('result:::'+JSON.stringify(result));
            console.log('this.currentCart:::'+this.currentCart);           
        })
        .catch((error) => {
            console.log('error');
            console.error(error);
        })
    }

    disconnectedCallback() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    decryptUrlParam(urlString){
console.log('urlString'+urlString);

 if (!urlString) {
            console.error('urlString is empty or null');
            return;
        }


            decryptWithMetadata({ 
            encryptText: urlString, 
            metaDataName: 'EncryptDecryptKey' 
        })
        .then((result) => {
            console.log('result: ' + JSON.stringify(result));
            this.urlParams=result;
            // Handle your decrypted result here
        })
        .catch((error) => {
            console.error('Error: ' + JSON.stringify(error));
            // Handle error appropriately
            if (error.body) {
                console.error('Error message: ' + error.body.message);
            }
        });

    }

    setSummaryPos = ()=> {
        if (!this.refs.referenceColumn) {
            return;
        }
        const rect= this.refs.referenceColumn.getBoundingClientRect();
        const rectSummary= this.refs.summary.getBoundingClientRect();

        //desktop breakpoint is as $desktopBreakpoint in scss var
        const w = 0.3 * rect.width / 0.7;
        if (w !== this.widthSummary) {
            this.widthSummary = w;              
        }

        if (this.topSummary === -1 ) {
            this.topSummary = rect.y; 
            if (this.topSummary < 1) {
                this.topSummary = 1;
            }
        }

        //check width but also that summary part is not bigger than the screen
        if (window.innerWidth >= 1024 
            && window.innerHeight > (rectSummary.height + this.topSummary + 20)
            && rect.height > rectSummary.height
        ) {            
            this.fixRight = true;
        }
        else {
            this.fixRight = false;
        }
    }

    get _wrapClass() {
        return `syn-component-wrap review-order-page ${this.site}`;
    }

    startStopSpinnerHandler = (show) => {
        this.showSpinner = show;
    }

    createMessageHandler = (msg) => {
        this.message = {... msg};
    }

    get _showMsg() {
        if(this.message) {
            return true;
        }
        return false;
    }

    get _msgLeftButton() {
        if(this.message && this.message.leftButtonTitle) {
            return this.message.leftButtonTitle;
        }
        return "";
    }

    get _msgRightButton() {
        if(this.message && this.message.rightButtonTitle) {
            return this.message.rightButtonTitle;
        }
        return "";
    }

    get _msgTitle() {
        if(this.message && this.message.title) {
            return this.message.title;
        }
        return "";
    }

    get _msgText() {
        if(this.message && this.message.richtext) {
            return this.message.richtext;
        }
        return "";
    }

    get _msgIcon() {
        if(this.message && this.message.icon) {
            return this.message.icon;
        }
        return "";
    }

    msgLeftClickHandler = () => {
        this.closeMsgHandler();
    }

    msgRightClickHandler= () => {
        if (this.message.type === "order-placed") {
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: this.message.url+'/orderconfirmation?orderId='+this.orderId+'&accountId='+this.companyId
                }
            });
        }
        this.closeMsgHandler();
        
    }

    closeMsgHandler= () => {
        this.message = null;
    }

    summaryActionHandler = (apiId, param) => {
        console.log('summary action', apiId, 'param', param);
        if(apiId=='set-order-id'){
            this.orderId=param;
        }
        if(apiId=='set-order-Date'){
            this.orderDate=param;
        }
        if (apiId === 'outlineCheckboxes') {
            this.outlineCheckboxes = true;
        }
        else if (apiId === 'reviewCheck') {
            this.reviewOk=this.refs.review.checkValid();
            this.placeOrderDt=param;
            this.refresh = Date.now();
        }
    }

    summaryInputActionHandler= (apiId, eventName, value) => {
        console.log('summary input action api', apiId, eventName, value);
    }

    termsActionHandler = (apiId, param) => {
        console.log('terms action', apiId, 'param', param);

        if (apiId === 'terms-ok') {
            this.termsOk = param;
        }
    }

    termsInputActionHandler= (apiId, eventName, value) => {
        console.log('terms input action api', apiId, eventName, value);
    }

    reviewProductsActionHandler= (apiId, param) => {
        console.log('review products action api', apiId, 'param', param);
        if (apiId === "back") {
            this.backStep();
        }
        if(apiId=='set-status'){
            this.status=param;
        }
    }

    reviewProductsInputActionHandler= (apiId, eventName, value) => {
        console.log('review products input action api', apiId, eventName, value);
        if(apiId === "shipping-notes"){
            this.shippingNote=value;
        }
    }

    get _site() {
        if(this.site) {
            return this.site;
        }
        return 'dtp';
    }

    get _summaryStyle() {
        if (this.topSummary > 0 && this.fixRight) {
            return `position: fixed; top: ${this.topSummary}px; width: calc(${this.widthSummary}px - 1rem);`;
        }
        return '';
    }

    refreshRequestHandler = () => {
        this.refresh = Date.now();
    }
    get isCheckout(){
        return this.currentCart?.Status__c=='Submitted for Approval' && this.isGrower;
    }
    get _showterms(){
        console.log('this.isGrower:::',this.isGrower);
         console.log('this.status:::',this.status);
        return this.status=='Checkout' && this.isGrower;
    }

   
}