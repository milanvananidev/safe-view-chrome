export const getDataFromStorage = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['blockList', 'whiteList'])
            .then((reponse) => {
                resolve({
                    data: reponse
                })
            })
            .catch((_) => {
                reject({})
            })
    })
}