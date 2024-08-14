import styleText from 'data-text:../style.css';
import type { PlasmoCSConfig } from 'plasmo';
import React from 'react';

import { useStorage } from '~data/storage';
import { Drawer } from '~ui/components/Drawer';

export const getStyle = () => {
    const style = document.createElement('style');
    style.textContent = styleText;
    console.log('getStyle', styleText);
    return style;
};

const SideDrawer = () => {
    const [sideDrawerOpen] = useStorage<boolean>('SIDE_DRAWER_OPEN');
    console.log('rendering side drawer');
    console.log('sideDrawerOpen', sideDrawerOpen);
    return <Drawer isOpen={sideDrawerOpen || false} close={() => null} />;
};

export default SideDrawer;
