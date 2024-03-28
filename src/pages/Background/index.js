chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        // chrome.runtime.setUninstallURL(`https://accounts.blockerx.net/chrome-uninstall?uid=anonymous`);
        newInstall()
    } else if (details.reason === 'update') {
        // chrome.runtime.setUninstallURL(`https://accounts.blockerx.net/chrome-uninstall?uid=anonymous`);
    }
});

const setupNewInstall = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({
            blockList: {
                keywords: [],
                websites: []
            }
        })
        chrome.storage.local.set({
            whiteList: {
                keywords: [],
                websites: []
            }
        })
        resolve({
            status: true
        })
    })
}

const newInstall = async () => {
    const checkStatus = await setupNewInstall();
    if (checkStatus && checkStatus.status) {
        chrome.tabs.create({ url: chrome.runtime.getURL("/onboarding.html") });
    }
}