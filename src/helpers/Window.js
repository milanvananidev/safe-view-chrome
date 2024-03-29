export const getCurrentActiveTabInfo = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true }, (tablist) => {
            resolve(tablist[0])
        })
    })
}

export const extractDomain = (url) => {
    let re = /:\/\/(www\.)?(.+?)\//;
    try {
        return url.match(re)[2];
    }
    catch (errN1) {
        return "empty";
    }
}