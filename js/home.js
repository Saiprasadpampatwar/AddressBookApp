let contactList ;
let server = false;
window.addEventListener('DOMContentLoaded',(event)=>{
    if(server){
        getPersonFromServer();
    }else{
        getAddressDataFromStorages();
    }
});

const getAddressDataFromStorages = () =>{
  contactList = localStorage.getItem('ContactList')? JSON.parse(localStorage.getItem("ContactList")) : [];
  document.querySelector('.emp-count').textContent = contactList.length;
  createInnerHtml();
  localStorage.removeItem('editEmp')
}

const getPersonFromServer = () => {
    const getURL = "http://localhost:3000/Person";
    makePromiseCall("GET",getURL,false)
                                      .then(resonseText => {
                                          contactList = JSON.parse(resonseText)
                                          document.querySelector('.emp-count').textContent = contactList.length;
                                            createInnerHtmlforServer();
                                            localStorage.removeItem('editEmp')
                                      })
                                      .catch(error => {
                                        console.log(error) ;
                                    });
}

const createInnerHtmlforServer= () => {
    
    const headerHtml = "<th>Full Name </th> <th>Address</th> <th>City</th> <th>State</th>"+
                            "<th>Zip</th> <th>Phone Number</th> <th>Actions</th>";
    if (contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;

    for(const contact of contactList){
        innerHtml = `${innerHtml}
        <tr>
            <td>${contact.name}</td>
            <td>${contact.address}</td>
            <td>${contact.city}</div>
            <td>${contact.state}</td>
            <td>${contact.zip}</td>
            <td>${contact.phone}</td>
            <td>
            <img id="${contact.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="${contact.id}"  onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;

}


const createInnerHtml = () => {
    
    const headerHtml = "<th>Full Name </th> <th>Address</th> <th>City</th> <th>State</th>"+
                            "<th>Zip</th> <th>Phone Number</th> <th>Actions</th>";
    if (contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;

    for(const contact of contactList){
        innerHtml = `${innerHtml}
        <tr>
            <td>${contact._name}</td>
            <td>${contact._address}</td>
            <td>${contact._city}</div>
            <td>${contact._state}</td>
            <td>${contact._zip}</td>
            <td>${contact._phone}</td>
            <td>
            <img id="${contact.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="${contact.id}"  onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;

}

const remove=(node) =>{
    let contactData = contactList.find(contact=>contact.id==node.id);
    if (!contactData) return;
    const index = contactList.indexOf(contactData);
    contactList.splice(index,1);
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    createInnerHtml();
}

const update = (node) => {
    let contactData = contactList.find(contact => contact.id==node.id);
    if(!contactData) return;
    localStorage.setItem('editEmp',JSON.stringify(contactData));
    const index = contactList.indexOf(contactData);
    contactList.splice(index,1);
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    window.location.replace("../pages/addressbook.html");
}