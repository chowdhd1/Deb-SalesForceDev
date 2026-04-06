import { LightningElement, api, track } from "lwc";
import { hasClass } from "c/templateUtils";

export default class ActionButton extends LightningElement {
  @api site;
  @api funcs;
  @api title;
  @api icon;
  //boolean
  @api filled;
  //boolean
  @api disabled;
  @api actionId;
  @api width;
  @api maxWidth;
  @api minHeight;
  @api height;
  @api maxHeight;
  //if this is specified then pressed is not used
  @api link;
  //boolean
  @api linkTargetBlank; 
  @api marginTop;
  @api marginBottom;
  @api marginLeft;
  @api marginRight;

  //callbacks
  @api pressed;

  @track iconClass;
  @track bigger;
  @track evident;
  @track lastTimer;

  /*class
    warning
    no-borders
    white-green
    expand
    thin
    bigger   
    smaller-highlighted  
    vertical-expand
    yellowish
    x-smaller
    ellipsis (makes the text inside the button not wrapping and showing with ... instead if longer)
    less-padding
    no-x-padding
    white-red
    border-green
    border-red
    border-grey
    red
    white
    white-grey
    */

  connectedCallback() {
    if (this.template.host.classList.contains("white-grey")) {
      this.iconClass = "light-grey";
    } else if (this.template.host.classList.contains("white-green")) {
      this.iconClass = "green";
    } else if (this.filled) {
      this.iconClass = "white";
    }
    this.bigger = hasClass(this.template.host.classList, "bigger");
  }

  disconnectedCallback() {
    if (this.lastTimer) {
        clearTimeout(this.lastTimer);
    }
  }

  get _wrapClass() {
    const both = this._hasIcon && this._hasTitle ? "both" : "";
    const filled = this.filled ? "filled" : "";
    const disabled = this.disabled ? "disabled" : "";
    const hasPressed = this.pressed ? "has-pressed" : "";
    const evident = this._evident ? "evident" : "";
    let funcs = '';
    if (this.funcs) {
      const listFuncs = this.funcs.split(' ');
      for(const functionality of listFuncs) {
        if (functionality.trim()) {
          funcs += ` func-${functionality.trim()}`;
        }
      }      
    }
    
    return `syn-component-wrap action-button def ${this.site} ${both} ${filled} ${disabled} ${hasPressed} ${evident} ${funcs}`;
  }

  get _wrapStyle() {
    const styles = [];
    if (this.width) {
      styles.push(`width:${this.width}`);
    }
    if (this.maxWidth) {
      styles.push(`max-width: ${this.maxWidth}`);
    }
    if(this.height) {
      styles.push(`height:${this.height}`);
    }
    if(this.maxHeight) {
        styles.push(`max-height: ${this.maxHeight}`);
    }
    if(this.minHeight){
        styles.push(`min-height: ${this.minHeight}`);
    }
    if(this.marginTop){
        styles.push(`margin-top: ${this.marginTop}`);
    }
    if(this.marginBottom){
        styles.push(`margin-bottom: ${this.marginBottom}`);
    }
    if(this.marginLeft){
        styles.push(`margin-left: ${this.marginLeft}`);
    }
    if(this.marginRight){
        styles.push(`margin-right: ${this.marginRight}`);
    }
    return styles.join(";");
  }

  get _hasIcon() {
    if (this.icon) {
      return true;
    }
    return false;
  }

  get _hasTitle() {
    if (this.title) {
      return true;
    }
    return false;
  }

  clickHandler() {
    if (!this.disabled && this.pressed) {

      this.evident = true;
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.lastTimer = setTimeout(() => {
          this.lastTimer = 0;
          this.evident = false;
      }, 1000);

      this.pressed(this.actionId);
    }
  }

  get _iconSize() {
    if (this.bigger) {
      return 2;
    }
    return 0;
  }

  get _target() {
    return this.linkTargetBlank ? "_blank" : "_self";
  }

  get _evident() {
    if(this.evident) {
      return true;
    }
    return false;
  }
}