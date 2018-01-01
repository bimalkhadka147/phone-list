"use strict";

(function () {

    var _phones = void 0,
        app = document.getElementById("app"),
        idUrl = window.location.hash.substr(1),
        inputContainer = document.getElementById("input-holder");

    function getPhoneData() {
        axios.get("js/data/data.json").then(function (response) {
            _phones = response.data.phones;
            render(_phones);
        }).catch(function (error) {
            app.innerHTML = notFoundComponent();
        });
    }
    function filterPhone(urlId, data) {
        var phoneBy_id = data.filter(function (phone) {
            return phone.id === urlId;
        });
        phoneBy_id.length > 0 ? app.innerHTML = phoneViewComponent(phoneBy_id[0]) : app.innerHTML = notFoundComponent();
    }
    function searchPhone(val, data) {
        var inputValue = val.toLowerCase();
        var result = data.filter(function (phone) {
            var phoneName = phone.name.toLowerCase();
            return phoneName.indexOf(inputValue) > -1;
        });

        result.length >= 1 ? render(result) : app.innerHTML = "<h3 class='no-result'> Result not found on <span> " + val + " </span> </h3>";
    }
    function sortPhone(selected, data) {
        var atoz = data.sort(sortBy);
        if (selected.value === "az") {
            render(data);
        }
        if (selected.value === "za") {
            var ztoa = atoz.reverse();
            render(ztoa);
        }
    }
    function sortBy(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    }
    function inputComponent() {
        return "<section class=\"input-collection\"> \n                        <div class=\"left-input\">\n                         <input type=\"text\"  id=\"filter-input\" placeholder=\"Search Device\"/>\n                        </div> \n                        <div class=\"right-input\">\n                           <select id=\"sort\">\n                              <option value=\"az\"> Sort By </option> \n                              <option value=\"az\"> A to Z </option> \n                              <option value=\"za\"> Z to A </option> \n                           </select>\n                        </div>       \n                    </section>";
    }
    inputContainer.innerHTML = inputComponent();
    function phoneListComponent(props) {
        return "<li class=\"list\" data-phoneid='" + props.id + "'>\n                 <a href=\"#" + props.id + "\">\n                            <img src='" + props.picture + "' width='100' alt='" + props.name + "'>\n                            <h3> " + props.name + " </h3>\n                 </a>\n                 </li>";
    }
    function phoneViewComponent(props) {
        return "<div class='phone-details-container'> \n                   <div class='phone-hero'>\n                        <img class='img-left' src='" + props.picture + "'>\n                        <div class='phone-intro'> \n                            <h1> " + props.name + " </h1>\n                        </div>\n                   </div>\n                   <div class='specs'>\n                        <h3> DISPLAY </h3>\n                            <div class='specs-cat-box'>\n                                <h4> <span> Size : </span> " + props.specs.display_size + " </h4>\n                                <h4> <span> Type : </span> " + props.specs.display_type + " </h4>\n                                <h4> <span> Resolution : </span> " + props.specs.display_resolution + " </h4>\n                            </div>\n                        <h3> PLATFORM </h3>\n                            <div class='specs-cat-box'>\n                                <h4> <span> OS : </span> " + props.specs.os + " </h4>\n                                <h4> <span> Chipset : </span> " + props.specs.chipset + " </h4>\n                                <h4> <span> Chipset : </span> " + props.specs.cpu + " </h4>\n                            </div>\n                        <h3> MEMORY </h3>\n                            <div class='specs-cat-box'>\n                                <h4> <span> Internal : </span> " + props.specs.memory + " </h4>\n                            </div>\n                        <h3> CAMERA </h3>\n                            <div class='specs-cat-box'>\n                                <h4> <span> Primary : </span> " + props.specs.camera_primary + " </h4>\n                                <h4> <span> Secondary : </span> " + props.specs.camera_secondary + " </h4>\n                            </div>\n                   </div>\n                   \n                </div>";
    }
    function notFoundComponent() {
        return "<h3> Not Found </h3>";
    }

    function render(data) {
        if (inputContainer.classList.contains("hide")) inputContainer.classList.remove("hide");
        app.innerHTML = "<ul class='phone-list-container'> \n                                                " + data.map(phoneListComponent).join('') + "\n                                                </ul>";
    }
    getPhoneData();
    function locHashChange(id) {
        if (inputContainer.classList.contains("show")) inputContainer.classList.add("hide");
        if (window.location.hash === "#" + id) {
            filterPhone(id, _phones);
        } else {
            render(_phones);
        }
    }
    window.addEventListener("hashchange", function () {
        locHashChange(window.location.hash.substr(1));
    });
    document.getElementById("filter-input").addEventListener("keyup", function () {
        searchPhone(this.value, _phones);
    });
    document.getElementById("sort").addEventListener("change", function () {
        sortPhone(this, _phones);
    });
})();
//# sourceMappingURL=app.js.map
