import { LightningElement, api } from "lwc";

export default class Icons extends LightningElement {
  @api site;
  @api funcs;
  @api icon;
  //nothing or 0 is default, 1 is 1rem, 15 is 1.5rem, 2 is 2rem, 25 is 2.5, 3 is 3, 35 is 3.5, 4 is 4, 45 is 4.5
  @api size;

  /*class
    green
    white
    light-green
    svg-expand
    light-gray
    lighter-gray
    red
    expand
    black
    dark
    red-light
    red-dark
  */

  get _isPdf() {
    return this.icon === "pdf";
  }

  get _isCheckCircle() {
    return this.icon === "check-circle";
  }

  get _isLocation() {
    return this.icon === "location";
  }

  get _isEmail() {
    return this.icon === "email";
  }

  get _isPhone() {
    return this.icon === "phone";
  }

  get _isLoginCircle() {
    return this.icon === "login-circle";
  }

  get _isBasket() {
    return this.icon === "basket";
  }

  get _isEmptyCart() {
    return this.icon === "empty-cart";
  }

  get _isRadioEmpty() {
    return this.icon === "radio-empty";
  }

  get _isRadioFull() {
    return this.icon === "radio-full";
  }

  get _isRadioFull2() {
    return this.icon === "radio-full2";
  }

  get _isBill() {
    return this.icon === "bill";
  }

  get _isTransport() {
    return this.icon === "transport";
  }

  get _isLocationSmall() {
    return this.icon === "location-small";
  }

  get _isTransportSmall() {
    return this.icon === "transport-small";
  }

  get _isCreditCard() {
    return this.icon === "credit-card";
  }

  get _isCalendar() {
    return this.icon === "calendar";
  }

  get _isArrowDown() {
    return this.icon === "arrow-down";
  }

  get _isArrowUp() {
    return this.icon === "arrow-up";
  }

  get _isSearch() {
    return this.icon === "search";
  }

  get _isCheck() {
    return this.icon === "check";
  }

  get _isInfo() {
    return this.icon === "info";
  }

  get _isInfoFilled() {
    return this.icon === "info-filled";
  }

  get _isQuestion() {
    return this.icon === "question";
  }

  get _isBin() {
    return this.icon === "bin";
  }

  get _isCloseCross() {
    return this.icon === "close-cross";
  }

  get _isLargeCircledCheck() {
    return this.icon === "large-circled-check";
  }

  get _isArrowLeft() {
    return this.icon === "arrow-left";
  }

  get _isArrowRight() {
    return this.icon === "arrow-right";
  }

  get _isMessage() {
    return this.icon === "message";
  }

  get _isReorder() {
    return this.icon === "reorder";
  }

  get _isPlus() {
    return this.icon === "plus";
  }

  get _isMinus() {
    return this.icon === "minus";
  }

  get _isComment() {
    return this.icon === "comment";
  }

  get _isAttachment() {
    return this.icon === "attachment";
  }

  get _isStoreFront() {
    return this.icon === "store-front";
  }

  get _isNotificationDot() {
    return this.icon === "notification-dot";
  }

  get _isHamburger() {
    return this.icon === "hamburger";
  }

  get _isFilters() {
    return this.icon === "filters";
  }

  get _isLongArrowLeft() {
    return this.icon === "long-arrow-left";
  }

  get _isDashboard() {
    return this.icon === "dashboard";
  }

  get _isWallet() {
    return this.icon === "wallet";
  }

  get _isDrawer() {
    return this.icon === "drawer";
  }

  get _isThumbUp() {
    return this.icon === "thumb-up";
  }

  get _isExclamationCircledLarge() {
    return this.icon === "large-circled-exclamation";
  }

  get _isDownload() {
    return this.icon === "download";
  }

  get _isSortArrows() {
    return this.icon === "sort-arrows";
  }

  get _isSortArrowsAsc() {
    return this.icon === "sort-arrows-asc";
  }

  get _isSortArrowsDesc() {
    return this.icon === "sort-arrows-desc";
  }

  get _isPasswordVisible() {
    return this.icon === "password-visible";
  }

  get _isWarningTriangle() {
    return this.icon === "warning-triangle";
  }

  get _isLargeCircledBasket() {
    return this.icon === "large-circled-basket";
  }

  get _isLargeRedCircledBasket() {
    return this.icon === "large-red-circled-basket";
  }  

  get _isLargeRedCircleTriangle() {
    return this.icon === "large-red-circled-triangle";
  } 

  get _isUpload() {
    return this.icon === "upload";
  }

  get _isScan() {
    return this.icon === "scan";
  }

  get _isLargeRedCircledPeople() {
    return this.icon === "large-red-circled-people";
  }

  get _isPerson() {
    return this.icon === "person";
  }

  get _isCustomerSupport() {
    return this.icon === "customer-support";
  }

  get _isLogin() {
    return this.icon === "login";
  }

  get _isOrder() {
    return this.icon === "order";
  }

  get _isClearFilter(){
    return this.icon === "clearFilter";
  }

  get _isRoundedLeft() {
    return this.icon === "rounded-left";
  }

  get _isRoundedRight() {
    return this.icon === "rounded-right";
  }

  get _isErrorLargeCircled() {
    return this.icon === "error-large-circled";
  }

  get _isEdit() {
    return this.icon === "edit";
  }

  get _isFacebook() {
    return this.icon === "facebook";
  }

  get _isYoutube() {
    return this.icon === "youtube";
  }

  get _isInstagram() {
    return this.icon === "instagram";
  }

  get _isTwitter() {
    return this.icon === "twitter";
  }

  get _isDistributor() {
    return this.icon === "distributor";
  }

  get _isReload() {
    return this.icon === "reload";
  }

  get _isMoreVertical() {
    return this.icon === "more-vertical";
  }

  get _isWhatsApp() {
    return this.icon === "whatsapp";
  }

  get _isSettings() {
    return this.icon === "settings";
  }

  get _isHeart() {
    return this.icon === "heart";
  }

  get _isList() {
    return this.icon === "list";
  }

  get _isMenuHome        () { return this.icon === "menu-home"; }
  get _isMenuCreateOrder () { return this.icon === "menu-create-order"; }
  get _isMenuOrderHistory() { return this.icon === "menu-order-history"; }
  get _isMenuReports     () { return this.icon === "menu-reports"; }
  get _isMenuMyDocuments () { return this.icon === "menu-my-documents"; }
  get _isMenuProducts    () { return this.icon === "menu-products"; }
  get _isMenuSchemes     () { return this.icon === "menu-schemes"; }
  get _isMenuConnect     () { return this.icon === "menu-connect"; }
  get _isMenuSupport     () { return this.icon === "menu-support"; }
  get _isMenuSignOut     () { return this.icon === "menu-sign-out"; }
  get _isMenuBgp         () { return this.icon === "menu-bgp"; }
  get _isMenuSubordinate () { return this.icon === "menu-subordinate"; }

  get _wrapClass() {
    const size = this.size ? `size size-${this.size}` : "";

    let natural = "";
    if (this._isPdf 
        || this._isLoginCircle 
        || this._isNotificationDot 
        || this._isExclamationCircledLarge
        || this._isLargeCircledBasket
        || this._isLargeRedCircledBasket
        || this._isLargeRedCircledPeople
        || this._isLargeCircledCheck
        || this._isClearFilter
        || this._isErrorLargeCircled
        || this._isLargeRedCircleTriangle) {
      natural = "natural";
    }

    return `syn-icon def ${size} ${natural} ${this.site}`;
  }

  get _siteDtp() {
    return this.site && this.site.split(' ').includes('dtp');
  }
}