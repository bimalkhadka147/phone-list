(function(){

   
    function getPhoneData (callback) {
        var _data;

        axios.get("js/data/data.json")
             .then( function(response) {
                _data = response.data.phones;
                callback(_data)
             })
             .catch( function(error) {
                     console.log(error)
                    document.getElementById("app").innerHTML = notFoundComponent()
             })
    }
    function getPhoneData_Byid(_id) {
       getPhoneData(function(data){
           var phoneBy_id = data.filter(function(phone){
                return phone.id === _id;
           });
           document.getElementById("app").innerHTML = phoneViewComponent(phoneBy_id[0]);           
       }) 
    }

    function inputComponent (props) {
         
    }
    function phoneListComponent (props) {
        return `<li class="list" data-phoneid='${props.id}'>
                 <a href="#${props.id}">
                            <img src='${props.picture}' width='100' alt='${props.name}'>
                            <h3> ${props.name} </h3>
                 </a>
                 </li>`
    }
    function phoneViewComponent (props) {
        return `<div class='phone-details-container'> 
                   <div class='phone-hero'>
                        <img class='img-left' src='${props.picture}'>
                        <div class='phone-intro'> 
                            <h1> ${props.name} </h1>
                            <button class='btn-1'> View Review </button>
                            <button class='btn-2'> Read opinions </button>
                        </div>
                   </div>
                   <div class='specs'>
                        <h3> DISPLAY </h3>
                            <div class='specs-cat-box'>
                                <h4> <span> Size : </span> ${props.specs.display_size} </h4>
                                <h4> <span> Type : </span> ${props.specs.display_type} </h4>
                                <h4> <span> Resolution : </span> ${props.specs.display_resolution} </h4>
                            </div>
                        <h3> PLATFORM </h3>
                            <div class='specs-cat-box'>
                                <h4> <span> OS : </span> ${props.specs.os} </h4>
                                <h4> <span> Chipset : </span> ${props.specs.chipset} </h4>
                                <h4> <span> Chipset : </span> ${props.specs.cpu} </h4>
                            </div>
                        <h3> MEMORY </h3>
                            <div class='specs-cat-box'>
                                <h4> <span> Internal : </span> ${props.specs.memory} </h4>
                            </div>
                        <h3> CAMERA </h3>
                            <div class='specs-cat-box'>
                                <h4> <span> Primary : </span> ${props.specs.camera_primary} </h4>
                                <h4> <span> Secondary : </span> ${props.specs.camera_secondary} </h4>
                            </div>
                   </div>
                   
                </div>`;
    }
    function specsComponent (props) {
       return `
       `
    }
    function notFoundComponent () {
        return `<h3> Not Found </h3>`;
    }
     
    function render () {
     getPhoneData(function(data){
            document.getElementById("app").innerHTML = `<ul class='phone-list-container'> 
                                ${data.map(phoneListComponent).join('')}
                             </ul>`;
     }); 
    }

      function locHashChange (id) {
        if(location.hash === "#"+id) {
            getPhoneData_Byid(id);
        }else {
            render();
        }
    }

   window.addEventListener("hashchange", function () {
         locHashChange(window.location.hash.substr(1));
   })
   
   //default
   render();
  
    //list click to change location hash
  /*var phoneList = document.getElementsByClassName("list");

   setTimeout( () => { Array.prototype.forEach.call(phoneList, function(list){
        list.addEventListener("click", function(){
          window.location.hash= list.getAttribute('data-phoneid');
        });
    });
   }, 300);*/


    
})();