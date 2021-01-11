class Contact {

    id;

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z ]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Name is incorrect!";
    }

    get address(){
        return this._address;
    }
    set address(address){
        let nameRegex = RegExp('^[A-Z a-z]{4,}$');
        if (nameRegex.test(address)) 
            this._address = address;
        else throw "Address is Invalid"    
    }

    get zip(){
        return this._zip;
    }
    set zip(zip){
        let nameRegex = RegExp('^[0-9]{6}$');
        if (nameRegex.test(zip)) this._zip = zip;
        else throw "zip  is Invalid"    
    }

    get phone(){
        return this._phone;
    }
    set phone(phone){
        let nameRegex = RegExp('^[0-9]{10,13}$');
        if (nameRegex.test(phone)) this._phone = phone;
        else throw "Phone  is Invalid"    
    }

    get city(){
        return this._city;
    }
    set city(city){
        this._city=city;
    }

    get state(){
        return this._state;
    }
    set state(state){
        this._state=state;
    }

    toString(){
        return "Name: "+this._name + " Address: "+this._address +" City: "+this._city+" State: "+this._state+
        " ZIP: "+this._zip+" Phone: "+this._phone;
    }

}


const names = document.querySelector('#name');
names.addEventListener('input', function () {
    if (names.value.length == 0) {
    document.querySelector('.text-error').textContent="";
    return;
    }
    try {
    (new Contact()).name = names.value;
    document.querySelector('.text-error').textContent="";
    } catch (e) {
        document.querySelector('.text-error').textContent=e;
    }
});

const phone = document.querySelector('#phone');
phone.addEventListener('input',function(){
    if(phone.value.length==0){
        document.querySelector('.phone-error').textContent="";
        return;
    }
    try {
        (new Contact()).phone = phone.value;
        document.querySelector('.phone-error').textContent="";
        } catch (e) {
            document.querySelector('.phone-error').textContent=e;
        }
});

const address = document.querySelector('#address');
address.addEventListener('input',function(){
    if(address.value.length==0){
        document.querySelector('.address-error').textContent="";
        return;
    }
    try {
        (new Contact()).address = address.value;
        document.querySelector('.address-error').textContent="";
        } catch (e) {
            document.querySelector('.address-error').textContent=e;
        } 
});

const save = () => {
    createContact();
}

const createContact = () => {
    const person = new Contact();
    person.name = document.querySelector('#name').value;
    person.address = document.querySelector('#address').value;
    person.city = document.querySelector('#city').value;
    person.state = document.querySelector('#state').value;
    person.zip = document.querySelector('#zip').value;
    person.phone = document.querySelector('#phone').value;
    alert(person.toString());
}




