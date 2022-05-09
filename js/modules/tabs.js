function tabs(
  tabSelector,
  tabsContentSelector,
  tabsParentSlector,
  activeClass
) {
  const tabs = document.querySelectorAll(tabSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSlector);

  const removeTabs = () => {
    tabsContent.forEach((tab) => {
      tab.classList.add('hide');
      tab.classList.remove('fade', 'show');
    });

    tabs.forEach((tab) => {
      tab.classList.remove(activeClass);
    });
  };

  const showTab = (i = 0) => {
    tabs[i].classList.add('tabheader__item_active');
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
  };

  removeTabs();
  showTab();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabSelector.slice(1))) {
      tabs.forEach((tab, i) => {
        if (target === tab) {
          removeTabs();
          showTab(i);
        }
      });
    }
  });
}

export default tabs;
