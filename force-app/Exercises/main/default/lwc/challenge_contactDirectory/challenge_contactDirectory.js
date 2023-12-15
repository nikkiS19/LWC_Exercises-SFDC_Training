import { LightningElement,wire } from 'lwc';
import getContacts from '@salesforce/apex/Contacts.getContacts'; 
export default class Challenge_contactDirectory extends LightningElement {
    error; contactId;contactsFiltered;
    letters = ('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
    columnConfig = [
        {
            label: 'Name',
            fieldName: 'name',
            type: 'text'
        }, {
            label: 'Email',
            fieldName: 'email',
            type: 'email'
        }, {
            label: 'Phone',
            fieldName: 'phone',
            type: 'phone'
        }
    ];
    @wire(getContacts,{firstLetter :''})
    getContactsbyFilter(result){
            this.contactsFiltered = [];
            if(result.data){
                this.contactsFiltered = result.data.map(); 
            }else if (result.error) {
                this.error = result.error;
            } 
        } 
    }