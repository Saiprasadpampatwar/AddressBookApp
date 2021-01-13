let contactList = [0];
const site_properties = {
    server : "true",
    homepage : "../pages/home.html"
}


window.addEventListener('DOMContentLoaded',(event)=>{
    if(site_properties.server.match("true")){
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
                                            createInnerHtml();
                                            localStorage.removeItem('editEmp')
                                      })
                                      .catch(error => {
                                        console.log(error) ;
                                    });
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
    if(site_properties.server.match("true")){
    const deleteURL = "http://localhost:3000/Person/"+contactData.id.toString();
    makePromiseCall("DELETE",deleteURL,false)
                                      .then(resonseText => {
                                            createInnerHtml();   
                                      })
                                      .catch(error => {
                                        console.log(error) ;
                                    });
    }else{
    const index = contactList.indexOf(contactData);
    contactList.splice(index,1);
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    createInnerHtml();
    }
}

const update = (node) => {

    let contactData = contactList.find(contact => contact.id==node.id);
    if(!contactData) return;
    if(site_properties.server.match("true")){
        checkForUpdate(contactData);
    }else{
    localStorage.setItem('editEmp',JSON.stringify(contactData));
    const index = contactList.indexOf(contactData);
    contactList.splice(index,1);
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    }
    window.location.replace("../pages/addressbook.html");
}