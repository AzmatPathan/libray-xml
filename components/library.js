const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
const libraryNS = "http://www.opengis.net/kml/2.2";

async function libraryData() {
    if (xml == undefined) {
        let response = await fetch(
            "https://www.torontopubliclibrary.ca/data/library-data.kml",
            {
                method: "get",
                headers: {
                    "Content-Type": "application/xml"
                }
            }
        );
        //convert XML string to XML DOM document
        data = new JSDOM(await response.text(), { contentType: "application/xml" });
        console.log(data);
        xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
    }
    return xml;
};


async function loadPlacemarks() {
    xml = await libraryData();
    return xml.querySelectorAll("Placemark")
}


async function getLibraryById(id) {
    xml = await libraryData();
    var name  = xml.getElementById(id);
    return name;
};

module.exports = {
    libraryData,
    loadPlacemarks,
    getLibraryById
};