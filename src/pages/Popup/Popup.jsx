import React, { useEffect, useState } from 'react'
import './Popup.css'
import { extractDomain, getCurrentActiveTabInfo } from '../../helpers/Window'

import Logo from '../../assets/logo.png'
import DefaultFavIcon from '../../assets/icons/web.png'
import NotBlock from '../../assets/icons/mark.png'
import { getDataFromStorage } from '../../helpers/Storage'

const Popup = () => {

  const [favIconUrl, setFavIconUrl] = useState(DefaultFavIcon);
  const [pageTitle, setPageTitle] = useState('');
  const [canBlock, setCanBlock] = useState(null);
  const [activePageUrl, setActivePageUrl] = useState('');

  const webInfo = async () => {
    const data = await getCurrentActiveTabInfo();
    setFavIconUrl(data.favIconUrl || DefaultFavIcon);
    setPageTitle(data.title);
  }

  const checkCanBlock = async () => {
    const data = await getCurrentActiveTabInfo();
    const pageUrl = extractDomain(data.url)

    setActivePageUrl(pageUrl)

    if (!('url' in data) || data.url.includes('chrome://') || data.url.includes('chrome-extension://') || pageUrl === 'newtab') {
      setCanBlock(false)
      setPageTitle('Sorry, current webpage can’t be blocked. Try another one.')
      setFavIconUrl(NotBlock)
    } else {
      setCanBlock(true)
    }
  }

  useEffect(() => {
    webInfo();
    checkCanBlock();
  }, []);

  const addSiteToBlock = async () => {
    const storage = await getDataFromStorage();
    let blockListWebsites = storage.data.blockList.websites;

    if (activePageUrl !== '' && activePageUrl !== 'empty') {
      blockListWebsites.push(activePageUrl);
    }

    chrome.storage.local.set({
      blockList: {
        websites: blockListWebsites
      }
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (arrayOfTabs) {
      chrome.tabs.reload(arrayOfTabs[0].id);
    });
  }

  return (
    <div className='container'>
      {canBlock && <img src={Logo} className='logo' draggable={false} /> || null}

      <div className='site-info'>
        <img src={favIconUrl} className='favicon' draggable={false} />
        <h4 className='title poppins-bold'>{pageTitle}</h4>
      </div>

      {canBlock && <button className='button poppins-bold' onClick={addSiteToBlock} >{'Add to blocklist'}</button> || null}
    </div>
  )
}

export default Popup