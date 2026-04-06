import { LightningElement, api, wire } from 'lwc';
import isGuest from "@salesforce/user/isGuest";
import basePath from "@salesforce/community/basePath";
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name';

export default class VegCustomLogin extends LightningElement {
    labels={
        login:'login',
        logout:'logout'
    }
    currentUserName;
    userId = Id;

     get isGuest() {
        return isGuest;
    }

    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.currentUserName = data.fields.Name.value;
        } else if (error) {
            this.error = error ;
        }
    }

    get logoutLink() {
        const sitePrefix = basePath.replace(/\/s$/i, ""); // site prefix is the site base path without the trailing "/s"
        return sitePrefix + "/secur/logout.jsp";
    }

}