export class Utils {
    public static filterArrayByString(mainArr, searchText) {
        if ( searchText === '' ) {
            return mainArr;
        }

        searchText = searchText.toLowerCase();

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText);
        });
    }

    public static searchInObj(itemObj, searchText) {
        for ( const prop in itemObj ) {
            if ( !itemObj.hasOwnProperty(prop) ) {
                continue;
            }

            const value = itemObj[prop];

            if ( typeof value === 'string' ) {
                if ( this.searchInString(value, searchText) ) {
                    return true;
                }
            } else if ( Array.isArray(value) ) {
                if ( this.searchInArray(value, searchText) ) {
                    return true;
                }
            }

            if ( typeof value === 'object' ) {
                if ( this.searchInObj(value, searchText) ) {
                    return true;
                }
            }
        }
    }

    public static searchInArray(arr, searchText) {
        for ( const value of arr ) {
            if ( typeof value === 'string' ) {
                if ( this.searchInString(value, searchText) ) {
                    return true;
                }
            }

            if ( typeof value === 'object' ) {
                if ( this.searchInObj(value, searchText) ) {
                    return true;
                }
            }
        }
    }

    public static searchInString(value, searchText) {
        return value.toLowerCase().includes(searchText);
    }

    public static generateGUID() {
        function S4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }

        return S4() + S4();
    }

    public static toggleInArray(item, array) {
        if ( array.indexOf(item) === -1 ) {
            array.push(item);
        } else {
            array.splice(array.indexOf(item), 1);
        }
    }

    public static handleize(text) {
        return text.toString().toLowerCase()
                   .replace(/\s+/g, '-')           // Replace spaces with -
                   .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                   .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                   .replace(/^-+/, '')             // Trim - from start of text
                   .replace(/-+$/, '');            // Trim - from end of text
    }

    public static calculateDistance(origin: { lat: number, lng: number }, destination: { lat: number, lng: number }) {
        var lat1 = origin.lat;
        var lon1 = origin.lng;
        var lat2 = destination.lat;
        var lon2 = destination.lng;

        var p = 0.017453292519943295;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a));
    }
}
