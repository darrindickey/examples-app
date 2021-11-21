import moment from 'moment';
import _ from 'lodash';

export function formatDateTimeFromUnix(unixTime) {
  return moment.unix(unixTime).calendar()
}

export function formatDateFromUnix(unixTime) {
  console.log('unixTime', moment.unix(unixTime).format("MM/DD/YYYY"))
  return moment.unix(unixTime).format("MM/DD/YYYY")
}

export function formatDayFromUnix(unixTime) {
  return moment.unix(unixTime).format("dddd")
}

export function formatFullDateFromUnix(unixTime) {
  console.log('full date', moment.unix(unixTime).format("MMMM Do, YYYY"))
  return moment.unix(unixTime).format("MMMM Do, YYYY")
}

export function formatTimeFromUnix(unixTime) {
  console.log('full date', moment.unix(unixTime).format("h:mm:ss A"))
  return moment.unix(unixTime).format("h:mm:ss A")
}

export function parseGeocodeResponse(locationResults) {
  let termType;
  let searchTermObj = {};
  let locations = locationResults.locations;
  let searchTerm = locationResults.providedLocation.location;
  if (searchTerm.match(/^\d{5}$/)) {
    termType = 'zipcode';
    searchTermObj.termType = termType;
    searchTermObj.searchTerm = searchTerm;
  } else if (searchTerm.match(/^[\w\s]+,\s\w{2}$/)) {
    termType = 'cityState';
    searchTermObj.termType = termType;
    searchTermObj.city = searchTerm.split(', ')[0];
    searchTermObj.state = searchTerm.split(', ')[1];
  } else if (/^[\w\s]+,\s\w{2}\s\d{5}$/) {
    if (!searchTerm.includes(',')) {
      termType = 'city'
      searchTermObj.termType = termType;
      searchTermObj.city = searchTerm;
    } else {
      termType = 'cityStateZip';
      searchTermObj.termType = termType;
      searchTermObj.city = searchTerm.split(', ')[0];
      searchTermObj.state = searchTerm.split(', ')[1].split(' ')[0];
      searchTermObj.zipcode = searchTerm.split(', ')[1].split(' ')[1];
    }
  }

  _.map(locations, (location) => {
    if (termType === 'city' && location.adminArea1 === "US" && location.adminArea5.toLowerCase() === searchTermObj.city.toLowerCase()) {
      searchTermObj.state = location.adminArea3 ? location.adminArea3 : '';
      searchTermObj.lat = location.displayLatLng.lat;
      searchTermObj.lng = location.displayLatLng.lng;
      searchTermObj.city = location.adminArea5;
      searchTermObj.state = location.adminArea3;
    } else if (termType === 'zipcode' && location.postalCode === searchTermObj.zipcode) {
      searchTermObj.state = location.adminArea3 ? location.adminArea3 : '';
      searchTermObj.lat = location.displayLatLng.lat;
      searchTermObj.lng = location.displayLatLng.lng;
      searchTermObj.city = location.adminArea5;
      searchTermObj.state = location.adminArea3;
    } else if (termType === 'cityState' && location.adminArea1 === "US" && location.adminArea5.toLowerCase() === searchTermObj.city.toLowerCase()) {
      searchTermObj.lat = location.displayLatLng.lat;
      searchTermObj.lng = location.displayLatLng.lng;
      searchTermObj.city = location.adminArea5;
      searchTermObj.state = location.adminArea3;
    } else if (termType === 'cityStateZip' && location.adminArea1 === "US" && location.adminArea5.toLowerCase() === searchTermObj.city.toLowerCase() && location.postalCode === searchTermObj.zipcode) {
      searchTermObj.lat = location.displayLatLng.lat;
      searchTermObj.lng = location.displayLatLng.lng;
      searchTermObj.city = location.adminArea5;
      searchTermObj.state = location.adminArea3;
    }
  })
  
  return searchTermObj
}