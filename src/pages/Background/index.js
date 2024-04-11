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
        const currentTime = new Date().getTime()
        chrome.storage.local.set({
            today: currentTime - (currentTime % 86400000)
        })
        chrome.storage.local.set({
            newInstall: true
        })
        chrome.storage.local.set({
            userInfo: {
                uid: null,
                installTime: currentTime,
                lastActive: currentTime,
            }
        })
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
        chrome.storage.local.set({
            activeBrowseInfo: {}
        })
        chrome.storage.local.set({
            todayBrowseInfo: {}
        })
        chrome.storage.local.set({
            dailyBrowseInfo: {}
        })
        chrome.storage.local.set({
            tempUid: null
        })
        resolve({
            status: true
        })
    })
}

function getAllTabsFromBrowser() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ lastFocusedWindow: true, active: true }, (tabList) => {
            resolve(tabList)
        })
    })
}

function getTodaysStats() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('todayBrowseInfo')
            .then((response1) => {
                resolve(response1.todayBrowseInfo)
            })
            .catch((error1) => {
                reject(error1)
            })
    })
}

async function checkAllTabs() {
    let currentDayStart = new Date().getTime()
    currentDayStart = currentDayStart - (currentDayStart % 86400000)
    chrome.storage.local.get('today')
        .then(async (res1) => {
            if (res1.today !== currentDayStart) {
                let newBrowseList = {}
                const TabList = await getAllTabsFromBrowser()
                let currentActiveDomain = null
                if ('url' in TabList[0] && TabList[0].url && !TabList[0].url.includes('chrome://') && !TabList[0].url.includes('chrome-extension://')) {
                    currentActiveDomain = extractDomain(TabList[0].url)
                }
                if (currentActiveDomain) {
                    newBrowseList[currentActiveDomain] = {
                        status: 'active',
                        totalTime: 0,
                        lastOpenTime: new Date().getTime()
                    }
                }
                chrome.storage.local.set({
                    todayBrowseInfo: newBrowseList
                })
            } else {
                const TabList = await getAllTabsFromBrowser()
                let BrowseList = await getTodaysStats()
                let currentActiveDomain = null
                if (TabList && TabList.length && 'url' in TabList[0] && TabList[0].url && !TabList[0].url.includes('chrome://') && !TabList[0].url.includes('chrome-extension://')) {
                    currentActiveDomain = extractDomain(TabList[0].url)
                }
                let alreadyPresent = false
                for (domain in BrowseList) {
                    if (domain === currentActiveDomain) {
                        alreadyPresent = true
                        if (BrowseList[domain].status === 'inactive') {
                            BrowseList[domain].status = 'active'
                            BrowseList[domain].lastOpenTime = new Date().getTime()
                        }
                    }
                    else if ('status' in BrowseList[domain] && BrowseList[domain].status === 'active') {
                        BrowseList[domain].status = 'inactive'
                        BrowseList[domain].totalTime = (BrowseList[domain].totalTime) + (new Date().getTime() - BrowseList[domain].lastOpenTime)
                    }
                }
                if (!alreadyPresent && currentActiveDomain) {
                    BrowseList[currentActiveDomain] = {
                        status: 'active',
                        totalTime: 0,
                        lastOpenTime: new Date().getTime()
                    }
                }
                chrome.storage.local.set({
                    todayBrowseInfo: BrowseList
                })
            }
        })
}

async function closeAllActiveTabsStats() {
    let currentDayStart = new Date().getTime()
    currentDayStart = currentDayStart - (currentDayStart % 86400000)
    chrome.storage.local.get('today')
        .then(async (res1) => {
            if (res1.today !== currentDayStart) {
                let newBrowseList = {}
                chrome.storage.local.set({
                    todayBrowseInfo: newBrowseList
                })
                chrome.storage.local.set({
                    today: currentDayStart
                })
            } else {
                let BrowseList = await getTodaysStats()
                for (domain in BrowseList) {
                    if ('status' in BrowseList[domain] && BrowseList[domain].status === 'active') {
                        BrowseList[domain].status = 'inactive'
                        BrowseList[domain].totalTime = (BrowseList[domain].totalTime) + (new Date().getTime() - BrowseList[domain].lastOpenTime)
                    }
                }
                chrome.storage.local.set({
                    todayBrowseInfo: BrowseList
                })
            }
        })
}

// Chrome Events for Statistics

chrome.tabs.onActivated.addListener((activeInfo) => {
    checkAllTabs()
})
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if ('status' in changeInfo && changeInfo.status === "complete") {
        checkAllTabs()
    }
})
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    checkAllTabs()
})
chrome.windows.onRemoved.addListener((windowId) => {
    checkAllTabs()
})
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === -1) {
        closeAllActiveTabsStats()
    } else {
        checkAllTabs()
    }
})
chrome.idle.onStateChanged.addListener((newState) => {
    if (newState === 'locked') {
        closeAllActiveTabsStats()
    } else if (newState === 'active') {
        checkAllTabs()
    }
})

const newInstall = async () => {
    const checkStatus = await setupNewInstall();
    if (checkStatus && checkStatus.status) {
        chrome.tabs.create({ url: chrome.runtime.getURL("/onboarding.html") });
    }
}

const extractDomain = (url) => {
    let re = /:\/\/(www\.)?(.+?)\//;
    try {
        return url.match(re)[2];
    }
    catch (errN1) {
        return "empty";
    }
}
