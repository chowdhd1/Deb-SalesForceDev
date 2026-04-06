import { LightningElement, api, track } from 'lwc';

export default class SimpleModal extends LightningElement {
    @api site;
    @api funcs;
    //does not need to be set; helper if there is need to distinguish between more similar messages
    @api id;
    //it is tought to be passed here 50%, 75% etc, with which you control the width of the message vs screen width
    @api maxWidth;
    //boolean
    @api closeWhenOutClick;
    //boolean
    @api hideClose;
    //boolean; it makes the desktop occupy more space
    @api fitDesktop;
    //boolean; it makes the mobile occupy more space
    @api fitMobile;
    @api minHeight;
    //top,default
    @api positionTablet;
    //top,default
    @api positionDesktop;

    //returns (id) ; this callback is used when message was closed on x or anyother way that is not left/rigth button
    @api messageClosed;

    @track hasScroll = false;

    /*class
    move-closer 
    no-padding
    */

    renderedCallback() {
        let div = this.template.querySelector('.box-wrap');
        let hasScroll = false;
        if(div && div.scrollHeight > div.clientHeight) {
            hasScroll = true;
        } 

        if(hasScroll !== this.hasScroll) {
            this.hasScroll = hasScroll;
        }
    }

    get _wrapClass() {
        const classes = [];        
        if (this.fitDesktop) {
            classes.push("fit-desktop");
        }
        if (this.fitMobile) {
            classes.push("fit-mobile");
        }
        if (this.positionTablet) {
            classes.push(`position-tablet-${this.positionTablet}`);
        }
        if (this.positionDesktop) {
            classes.push(`position-desktop-${this.positionDesktop}`);
        }
        const additional = classes.join(' ');
        return `syn-simple-modal def syn-component-wrap ${this.site} ${additional}`;
    }

    get _wrapStyle() {
        const styles = [];
        if(this.maxWidth) {
            styles.push(`max-width: ${this.maxWidth}`);
        }
        if(this.minHeight) {
            styles.push(`min-height: ${this.minHeight}`);
        }
        return styles.join(';');
    }

    get _boxWrapClass() {
        const hasScrollClass = this.hasScroll ? "has-scroll" : "";
        return `box-wrap ${hasScrollClass}`;
    }

    messageClosedHandler = () => {
        this.messageClosed(this.id);
    }

    handleOutsideClick = (event) => {
        if(this.closeWhenOutClick) {
            const modalContainer = this.template.querySelector('.syn-simple-modal');
            if (modalContainer && !modalContainer.contains(event.target)) {
                this.messageClosedHandler();
            }
        }
    }

    get _showClose() {
        if(this.hideClose) {
            return false;
        }
        return true;
    }
}