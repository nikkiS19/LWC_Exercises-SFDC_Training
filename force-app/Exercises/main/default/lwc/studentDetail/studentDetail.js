import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
// TODO #1: import the getRecord, getFieldValue, and getFieldDisplayValue functions from lightning/uiRecordApi.
import { getRecord,getFieldValue,getFieldDisplayValue } from 'lightning/uiRecordApi';
// TODO #2: We've imported the name field and placed it into an array for you.
//          To prepare for Lab 1, import the Description, Email, and Phone fields and add them to the array.
import DESCRIPTION from '@salesforce/schema/Contact.Description';
import EMAIL from '@salesforce/schema/Contact.Email';
import PHONE from '@salesforce/schema/Contact.Phone';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import FIELD_Name from '@salesforce/schema/Contact.Name';
const fields = [FIELD_Name,DESCRIPTION,EMAIL,PHONE];
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
export default class StudentDetail extends NavigationMixin(LightningElement) {

	// TODO #3: locate a valid Contact ID in your scratch org and store it in the studentId property.
	// Example: studentId = '003S000001SBAXEIA5';
	studentId = '';
	subscription;
	@wire(MessageContext) messageContext;
	//TODO #4: use wire service to call getRecord, passing in our studentId and array of fields.
	//		   Store the result in a property named wiredStudent.
	@wire(getRecord, { recordId :'$studentId', fields })
	wiredStudent;
	
	connectedCallback() {
		if(this.subscription){
		return;
		}
		this.subscription = subscribe(
		this.messageContext,
		SELECTED_STUDENT_CHANNEL,
		(message) => {
		this.handleStudentChange(message)
		}
		);
		}

	get name() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}

	//TODO #5: We provided a getter for the name field. 
	// 		   To prepare for Lab 1, create getters for the description, phone, and email fields.
	get description() {
		return this._getDisplayValue(this.wiredStudent.data, DESCRIPTION);
	}
    get email() {
		return this._getDisplayValue(this.wiredStudent.data, EMAIL);
	}
    get phone() {
		return this._getDisplayValue(this.wiredStudent.data, PHONE);
	}
	//TODO #6: Review the cardTitle getter, and the _getDisplayValue function below.
	
	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong..."
		}
		return title;
	}
	
	_getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}
	handleStudentChange(message) {
		this.studentId = message.studentId;
		}
		disconnectedCallback() {
			unsubscribe(this.subscription);
			this.subscription = null;
			}	
	recordDetail(){
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: this.studentId,
				actionName: 'view'
			}
		});
	} 
}